import { createContext, useContext, useState } from "react";

interface IAppContext {
     isAuthenticated: boolean,
     setIsAuthenticated: (v: boolean) => void,
     user: IUser | null,
     setUser: (v: IUser) => void,
     isLoading: boolean,
     setIsLoading: (v: boolean) => void,
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProp = {
    children: React.ReactNode
}

export const AppProvider = (props: TProp) => { 
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null)

    return (
    <CurrentAppContext.Provider value={{isAuthenticated, user, setIsAuthenticated, setUser, isLoading, setIsLoading}}>
        {props.children}
    </CurrentAppContext.Provider>
)
}

export const useCurrentApp = () => {
    const currentAppContext = useContext(CurrentAppContext);
  
    if (!currentAppContext) {
      throw new Error(
        "useCurrentApp has to be used within <CurrentAppContext.Provider>"
      );
    }
  
    return currentAppContext;
  };