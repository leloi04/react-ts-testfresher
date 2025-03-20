import { fetchAccountAPI } from "services/api";
import { createContext, useContext, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

interface IAppContext {
     isAuthenticated: boolean,
     setIsAuthenticated: (v: boolean) => void,
     user: IUser | null,
     setUser: (v: IUser | null) => void,
     isLoading: boolean,
     setIsLoading: (v: boolean) => void,
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProp = {
    children: React.ReactNode
}

export const AppProvider = (props: TProp) => { 
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetchAccountAPI();
      if(res.data) {
        setUser(res.data.user)
        setIsAuthenticated(true)
      }
      setIsLoading(false) 
    }

    fetchAccount();
  }, [])

    return (
      <>
        {isLoading == false ?
        <CurrentAppContext.Provider value={{isAuthenticated, user, setIsAuthenticated, setUser, isLoading, setIsLoading}}>
            {props.children}
        </CurrentAppContext.Provider>
        :<div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
        <ScaleLoader />
      </div>
        }
      </>
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