import { gql } from 'apollo-server';

const typeRefs = gql`
  # type User {
  #   createdAt: String
  #   id: ID
  #   username: String
  #   password: String
  #   name: String
  #   Pets: [Pet]
  # }

  type PetDescription {
    breed: String
    age: String
    size: String
    behaviour: String
  }

  type Pet {
    createdAt: String
    id: ID
    name: String
    image: String
    location: String
    description: PetDescription
    # owner: User
  }

  type Query {
    pets: [Pet]
    pet(id: ID): Pet
  }
`;

export default typeRefs;
