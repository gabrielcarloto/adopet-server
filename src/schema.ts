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

  type Username {
    username: String!
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
    pets: [Pet]!
    pet(id: ID): Pet!
    user(id: ID): User
  }

  input addPetInput {
    name: String
    image: String
    location: String
    breed: String
    age: String
    size: String
    behaviour: String
  }

  input registerUserInput {
    name: String
    username: String
    password: String
  }

  type Mutation {
    addPet(petData: addPetInput): Pet!
    registerUser(userData: registerUserInput): Username!
    login(username: String, password: String): Username!
    refresh: Username
    logout(username: String): Boolean
  }
`;

export default typeDefs;
