import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


  useEffect(() => {
    const savedToken = localStorage.getItem("googleToken");
    const savedUser = localStorage.getItem("googleUser");

    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("googleToken", newToken);
    } else {
      localStorage.removeItem("googleToken");
    }
  };

  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("googleUser", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("googleUser");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("googleToken");
    localStorage.removeItem("googleUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: updateUser,
        token,
        setToken: updateToken,
        logout, // Add logout to context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
