import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Divider,
} from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import userServices, { User } from "../Services/user-services";
import useUsers from "../hooks/useUsers";

export default function userApp() {
  const { users, error, isLoading, setUsers, setError } = useUsers();

  const deleteUser = (user: User) => {
    userServices
      .delete<User>(user)
      .then(() => {
        setUsers(users.filter((item) => item.id !== user.id));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      {isLoading && <div className="spinner-border"></div>}
      {!isLoading && (
        <List sx={{ width: "100%", maxWidth: 400 }}>
          {users.map((user) => (
            <div key={user.id}>
              <ListItem
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  bgcolor: "background.black",
                }}
              >
                <ListItemAvatar>
                  <FaUserCircle size={24} />
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={user.email}
                  primaryTypographyProps={{
                    sx: { fontWeight: "bold", color: "#333" },
                  }}
                />

                <IconButton
                  aria-label="delete"
                  onClick={() => deleteUser(user)}
                >
                  <MdDelete />
                </IconButton>
              </ListItem>
              <Divider variant="fullWidth" component="li" />
            </div>
          ))}
        </List>
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}
