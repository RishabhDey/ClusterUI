import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { createContext } from "react";
import { Platform } from "react-native";

const StorageContext = createContext();


export const StorageProvider = ({ children }) => {


  const isMobile = (Platform.OS !== "web");

  const makeRoomKey = (roomId) => `lastViewed:${roomId}`;

  //GRAB FROM ASYNC IF MOBILE, ELSE NULL(GET FROM COOKIES, CRED INCLUDE)

  const setLastViewedMessage = async (roomId, messageId) => {
    try {
      isMobile ? await AsyncStorage.setItem(makeRoomKey(roomId), messageId) 
      : null;
    } catch (error) {
      console.error("Failed to set last viewed message", error);
    }
  };

  const getLastViewedMessage = async (roomId) => {
    try {
      if(isMobile){
        return await AsyncStorage.getItem(makeRoomKey(roomId))
      }else{
        return null;
      }
    } catch (error) {
      console.error("Failed to get last viewed message", error);
      return null;
    }
  };

  //ONLY FOR NATIVE APPS
  const getRefreshToken = async () => {
    return isMobile ? await SecureStore.getItemAsync('refresh_token') : null; 
  };

  const setRefreshToken = async (data) => {
    return isMobile ? await SecureStore.setItemAsync('refreshToken', data): null;
  };

  return(
    <StorageContext.Provider value = {{setLastViewedMessage, 
                                        getLastViewedMessage, 
                                        getRefreshToken, 
                                        setRefreshToken}}>{children}</StorageContext.Provider>
  )
}
