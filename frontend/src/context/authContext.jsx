 import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

const userContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token=localStorage.getItem('token')
        if(token){
        const response = await axios.get("http://localhost:5000/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}` // Pass token if needed
          },
        });
        if (response.data.success) {
          setUser(response.data.user);
        }
      } else{
          setUser(null)
      }
    }
       catch (error) {
        if (error.response && error.response.status === 401) {
           setUser(null) // Navigate only if the user is not authenticated
        }
      } finally {
        setLoading(false)
      }
    };

    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    // navigate("/login");
  };

  return (
    <userContext.Provider value={{ user, login, logout,loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);
export default AuthProvider;
