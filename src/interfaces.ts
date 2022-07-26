export interface AddPetMutationArgs {
  petData: {
    name: string;
    image: string;
    location: string;
    breed: string;
    age: string;
    size: string;
    behaviour: string;
  };
}

export interface AddUserMutationArgs {
  userData: {
    username: string;
    password: string;
    name: string;
  };
}

export interface LoginMutationArgs {
  username: string;
  password: string;
}

export interface Context {
  username: string | null;
  refreshToken: string | null;
  res: any;
}
