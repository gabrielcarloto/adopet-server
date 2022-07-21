import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    createdAt: String!
    username: String!
    name: String!
    picture: String
    pets: [Pet]
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    image: String!
    location: String!
    breed: String!
    age: String!
    size: String!
    behaviour: String!
    owner: User!
  }

  type Query {
    pets: [Pet]
    pet(id: ID): Pet
  }

  input addPetInput {
    name: String
    image: String
    location: String
    breed: String
    age: String
    size: String
    behaviour: String
    ownerId: ID
  }

  input addUserInput {
    username: String
    name: String
    password: String
  }

  type Mutation {
    addPet(petData: addPetInput): Pet!
    addUser(userData: addUserInput): User!
  }
`;

export default typeDefs;
