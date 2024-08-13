import axios, { AxiosError, CanceledError, isCancel } from "axios";
import { useEffect, useState } from "react";
import { List, ListItem } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";

// note that the response received from the backend has more than
// just "id" and "Name" as properties of a User, but in typeScript
// you can be more selective and only construct an inteface that only
// captures the properties you are intersted in.
interface User {
  id: number;
  name: string;
  email: string;
}

export default function fetchData() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  //  one can use async and await for fething data, however mosh prefers the below (better) approach
  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       try {
  //         const response = await axios.get<User[]>(
  //           "https://jsonplaceholder.typicode.com/usersa"
  //         );
  //         setUsers(response.data);
  //       } catch (err) {
  //         setError((err as AxiosError).message);
  //       }
  //     };
  //     fetchUsers();
  //   }, []);

  // The following is another way of doing what is done in the above using async method, easier and simpler (Mosh suggests this)
  // you added the controller later.
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((response) => {
        setUsers(response.data);
      })
      // here you are checking if the error is of type CanceledError, if so, you just log the error and will not show
      // anything on the JSX as viewable elements. please note, whenyou run react in debug mode, te page is loaded twice,
      // and such successive load causes the first fitch to be executed and then immediatly cancelled. this causes you to
      // recieve a response from the backend and at the same time have a cancelled error. Seeing both a successful response
      //and an error in your code can happen if the error occurs after the response has already been successfully processed.
      // Here are some possible scenarios where this could occur: Delayed Error After Response Handling:
      // If the Axios request successfully completes and the setUsers(response.data) is executed, but something else in the
      // code(outside the.then block) later causes an error, you could end up seeing both the response and the error.
      // For instance, if you make another request or trigger some logic that leads to an error after handling the
      // successful response, both the data and the error could appear. hre you are just checking if the error is resulted of
      // cancellation, thenyou don't setError so it won;t get rendered.
      .catch((error) => {
        if (error instanceof CanceledError) console.log(error);
        else {
          setError(error.message);
        }
      })
      .finally(() => setTimeout(() => setLoading(false), 2000));

    return () => controller.abort(); // This is a cleanup function of your useEfect. It gets executed after you navigate away from the page.
    // in this specific case it aborts the fetch from the backend.
  }, []);

  return (
    <div>
      {isLoading && <div className="spinner-border"></div>}
      {!isLoading && (
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <FaUserCircle
                className="user-icon"
                size={20}
                style={{ marginRight: "16px" }}
              />
              {user.name}
              <br />
              {user.email}
            </ListItem>
          ))}
        </List>
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}
