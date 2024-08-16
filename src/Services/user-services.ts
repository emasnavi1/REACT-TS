import createHttpService from "./http-service";

// note that the response received from the backend has more than
// just "id" and "Name" as properties of a User, but in typeScript
// you can be more selective and only construct an inteface that only
// captures the properties you are intersted in.
export interface User {
    id: number;
    name: string;
    email: string;
  }

export default createHttpService("/users");