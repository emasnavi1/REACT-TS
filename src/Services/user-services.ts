import apiClient from "./api-client";

// note that the response received from the backend has more than
// just "id" and "Name" as properties of a User, but in typeScript
// you can be more selective and only construct an inteface that only
// captures the properties you are intersted in.
export interface User {
    id: number;
    name: string;
    email: string;
  }

class UserService{

    getAllUsers() {
        const controller = new AbortController();
        const request = apiClient.get<User[]>("/users", {
        signal: controller.signal,
      })
        return{request, cancel: () => controller.abort()}
    }


    deleteUser(user : User) {
        return apiClient.delete("/users/" + user.id);
    }
}
export default new UserService();