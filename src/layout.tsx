import { Outlet } from "react-router-dom"
import AppHeader from "./components/layout/app.header";
import { useCurrentApp } from "./components/context/app.context";
import { useEffect } from "react";
import { fetchAccountAPI } from "./services/api";
import { ScaleLoader } from "react-spinners";

const Layout = () => {
  const {isLoading, setIsLoading, setIsAuthenticated, setUser} = useCurrentApp();

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
    {isLoading === false
      ?<div>
        <AppHeader />
        <Outlet />
      </div>
      :<div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
        <ScaleLoader />
      </div>
      }
    </>
  )
}

export default Layout;