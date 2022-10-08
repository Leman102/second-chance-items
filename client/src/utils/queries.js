import { gql } from '@apollo/client';

export const QUERY_ITEMS = gql`
  query items($username: String) {
    items(username: $username) {
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

export const QUERY_ITEM = gql`
  query item($id: ID!) {
    item(_id: $id) {
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

export const QUERY_PROFILE_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      item{
        _id
        itemName
        itemPrice
        itemLocation
        itemImage
        createdAt
    }
    }
  }
`;

// export const QUERY_USER = gql`
//   { me {
//       username
//       email
//       image
//   }}
// `;

export const QUERY_USER = gql`
  { me {
      username
      email
      image
      item{
        _id
        itemName
        itemPrice
        itemLocation
        itemImage
        createdAt
    }
  }}
`;

export const QUERY_ALL_USERS = gql`
  { users {
      username
      email
      image
      _id
  }}
`;

