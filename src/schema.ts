import { gql } from 'apollo-server';

const typeDefs = gql`
  # type User {
  #   createdAt: String
  #   id: ID
  #   username: String
  #   password: String
  #   name: String
  #   Pets: [Pet]
  # }

  type Pet {
    createdAt: String
    id: ID
    name: String
    image: String
    location: String
    breed: String
    age: String
    size: String
    behaviour: String
    # owner: User
  }

  type Query {
    pets: [Pet]
    pet(id: ID): Pet
  }

  type Mutation {
    addPet(
      name: String
      image: String
      location: String
      breed: String
      age: String
      size: String
      behaviour: String
    ): Pet!
  }
`;

export default typeDefs;
