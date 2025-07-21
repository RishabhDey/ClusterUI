import Routes from '..constants/Routes';
import { router } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { StorageContext } from '../context/StorageContext';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const {setRefreshToken, getRefreshToken} = useContext(StorageContext)
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const isMobile = (Platform.OS !== "web");

  const reconnectAttempts = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;



  


  const JWTAccess = async () => {
    const refreshToken = isMobile ? await getRefreshToken() : null;

    try{
      const refreshResponse = await fetch(Routes.AuthRoutes.accessToken, 
        {method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(isMobile && { 'X-Client-Type': 'mobile' })
            },
            ...(isMobile
              ? { body: JSON.stringify({ refreshToken }) }
              : { credentials: 'include' }) // include cookie
          });

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





  //LOGIN will save to cookies if web, else save to SecureStorage. 
  const login = async (username, password) => {
    try{
      const res = await fetch( Routes.AuthRoutes.login,
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' ,
            ...(isMobile ? {'Client': 'mobile'} : {'Client': 'Web'})
          },
          body: JSON.stringify({ username, password }),
          ...(isMobile ? {} : {credentials: "include",})
        }
      );


      if(!res.ok) throw new Error("Login Failed.")

      if(isMobile){
        const data = await res.json();
        setRefreshToken(data);
      }
       


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


