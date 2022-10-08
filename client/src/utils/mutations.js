import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $image: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      image: $image
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ITEM = gql`
  mutation addItem(
      $itemName: String! 
      $itemPrice: Float!
      $itemLocation: String!
      $itemImage: String!
    ) {
    addItem(
      itemName: $itemName 
      itemPrice: $itemPrice 
      itemLocation: $itemLocation 
      itemImage: $itemImage 
    ) {
      _id
      itemName
      itemPrice
      itemLocation
      itemImage
      createdAt
      username
    }
  }
`;
