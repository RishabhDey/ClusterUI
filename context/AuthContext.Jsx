import { router } from "expo-router";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);


  const JWTAccess = async () => {
    try{
      const refreshResponse = await fetch("/refresh", {credentials: "include"});
      
      if(!refreshResponse.ok) {
                throw new Error("Failed");
      }
      const data = await refreshResponse.json();
      setToken(data.accessToken);
    } catch (e) {
      console.error("JWT Token Refresh Failed", e);
      //change later. 
      setToken(null);
      router.replace("/login")
    }finally{
      setLoading(false);
    }
  }

  const login = async (username, password) => {
    try{
      const res = await fetch( '/login',
        {
          method: "POST",
          credentials: "include",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        }
      )
      if(!res.ok) throw new Error("Login Failed.")
    }catch(e){
      console.log("Login Failed: ", e)
    }

    await JWTAccess();
  };

   const logout = async () => {
    try {
      await fetch("/logout", { method: "POST", credentials: "include" });
    } catch {}
    setToken(null);
    router.replace("/login");
  };


  useEffect(() => {JWTAccess();},[]);


  return (
    <AuthContext.Provider value = {{token, login, logout, loading, JWTAccess}}>
      {children}
    </AuthContext.Provider>

  )


};


