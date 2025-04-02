import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
interface UserData {
  name: string;
  email: string;
  id: string;
}
type AppContext = {
  userData: UserData | undefined;
  setUserData: (userData: UserData | undefined) => void;
};

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userData, setUserData] = useState<UserData>();
  // console.log(userData);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const user: UserData = jwtDecode(token);
      setUserData(user);
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
