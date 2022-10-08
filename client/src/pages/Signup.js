import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [formImage, setFormImage] = useState();
  const [preview, setPreview] = useState()

  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username,
        image: formImage.name
      },
    });
    
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(event.target.value)
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!formImage) {
        setPreview(undefined)
        return
    }
    const objectUrl = URL.createObjectURL(formImage)
    console.log (objectUrl)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl) 
  }, [formImage])

  const singleFileChangedHandler = ( event ) => {
    event.preventDefault();
    if (!event.target.files || event.target.files.length === 0) {
      setFormImage(undefined)
      return
    }
    // I've kept this example simple by using the first image instead of multiple
    setFormImage(event.target.files[0])
    console.log(event.target.files[0])
  };

  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="username">username:</label>
          <input
            placeholder="username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="image">Image</label>
          <input type='file' 
            onChange={singleFileChangedHandler} 
          />
            {formImage &&  <img src={preview} alt=""/> }
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
