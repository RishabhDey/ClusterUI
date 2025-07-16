import { router } from "expo-router";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const reconnectAttempts = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;


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

  const withFreshToken = async (callback) => {
    const success = true;
    setLoading(true);
    try {
      return await callback(token);
    } catch (err) {
      console.warn("Error in token-protected call, trying refresh...");

      reconnectAttempts.current += 1;

      if (reconnectAttempts.current > MAX_RECONNECT_ATTEMPTS) {
        console.error("Too many reconnect attempts. Logging out.");
        logout();
        throw new Error("Session expired.");
      }

      await JWTAccess();

      return withFreshToken(callback);
    }finally{
      setLoading = false;
    }
  };


  useEffect(() => {JWTAccess();},[]);


  return (
    <AuthContext.Provider value = {{token, login, logout, loading, JWTAccess, reconnectAttempts, MAX_RECONNECT_ATTEMPTS, withFreshToken}}>
      {children}
    </AuthContext.Provider>

  )


};


