import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_ITEM } from '../utils/mutations';
import { QUERY_ITEMS, QUERY_USER } from '../utils/queries';


function ItemForm(props) {
  const [formState, setFormState] = useState();
  const [formImage, setFormImage] = useState();
  const [preview, setPreview] = useState()

  const [addItem, { error }] = useMutation(ADD_ITEM,{
    update(cache, { data: { addItem }}){
      try {
        const { me } = cache.readQuery({ query: QUERY_USER });
        cache.writeQuery({
          query: QUERY_USER,
          data: { me: { ...me, items: [...me.items, addItem] } },
        });
        console.log("complete")
      } catch (e){
        console.warn("First Item insertion by user!");
      }

      //Update Item array's cache
      const { items } = cache.readQuery({ query: QUERY_ITEMS });
      console.log(items)
      cache.writeQuery({
        query: QUERY_ITEMS,
        data: { items: [addItem, ...items]}
      });
    }
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try{
      await addItem({
        variables: {
          itemName: formState.name,
          itemPrice: formState.price,
          itemLocation: formState.location,
          itemImage: formImage.name,
          
        }
      })      
    } catch (e) {
      console.error(error)
    }
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

  const singleFileChangedHandler = ( e ) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      setFormImage(undefined)
      return
    }
    // I've kept this example simple by using the first image instead of multiple
    setFormImage(e.target.files[0])
    console.log(e.target.files[0])
  };

  return (
    <div className="container my-1">
      <Link to="/home">← Go to Home</Link>

      <h2>Give a Second Chance!</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="name">Item Name:</label>
          <input
            placeholder="Item Name"
            name="name"
            type="text"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="price">Price:</label>
          <input
            placeholder="0.99"
            name="price"
            type="number"
            step='0.01'
            id="price"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="location">Location:</label>
          <input
            placeholder="City"
            name="location"
            type="location"
            id="location"
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

export default ItemForm;
