import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  user: [],
  getUser: () => {},

});

function UserContextProvider({ children }) {
  const [user, setUser] = useState([]);

  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = admin?.token;

  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/get-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setUser(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;