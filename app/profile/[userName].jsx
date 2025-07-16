import HorizontalScrollSection from '@/components/HorizontalScrollSection';
import { AuthContext } from '@/context/AuthContext';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Routes } from '../../constants/routes';



export default function PublicProfileScreen() {
  const {loading, JWTAccess, withFreshToken } = useContext(AuthContext);
  const [editableUser, setEditableUser] = useState(null);
  const [valid, setValid] = useState(true);

  const [sectionSettings, setSectionSettings] = useState({
                                  likedSongs: { visible: true, order: 0 },
                                  joinedCliques: { visible: true, order: 1 },
                                  favoriteClusters: { visible: true, order: 2 },
                                  Achievements: { visible: true, order: 3 },
                                });

  const [bio, setBio] = useState("");

  const userName  = useLocalSearchParams();


  //KEYS NEED TO BE VIABLE FOR USE AS TITLES!
  const [user, setUser] = useState({
    type: "cluster",
    name: "John Doe",
    profileImage: "www.google.com",
    beats: 120,
    followers: 500,
    following: 500,
    bio: "AMAZING",
    likedSongs: ['SONG 1', 'SONG 2'],
    joinedCliques: ['Clique1'],
    favoriteClusters: ['Cluster1'],
    Achievements: ['Achievement'],
    Banner: 'www.banner.com'
  });

  
  const init = async (token) => {
    if(loading || !valid) return;

    if(userName === "me"){

      const self_res = await fetch(Routes.ProfileRoutes.meSearch, {
      method: "GET",
      headers: {
        "Authorization": token
      }
      })

      const self_data = await self_res.json();

      if(!self_res.ok || self_data.length === 0) {
          throw new Error();
      }

      setUser(self_data);
      setEditableUser(self_data)


    }else{
      const user_url = Routes.ProfileRoutes.profileSearch + userName;
      const res = await fetch(user_url, {
        method: "GET"
      })

      if(!res.ok) {
          throw new Error();
      }

      const data = await res.json();

      if (data.length === 0) {
          setValid(false);
      }

      setUser(data);

      const self_res = await fetch(Routes.ProfileRoutes.meSearch, {
        method: "GET",
        headers: {
          "Authorization": token
        }
      })

      const self_data = await self_res.json();

      if(!self_res.ok || self_data.length === 0) {
          throw new Error();
      }
      if(editableUser.name === user.name) setEditableUser(user);

    }
  };



  useEffect(() => {
    if (token == null){
        JWTAccess();
      }
    withFreshToken(init);
    return;
  },[]);

  const changeBio = async (token) => {
    if(!editableUser) return;

    const res = await fetch(Routes.ProfileRoutes.changeBio, {
      method: "POST",
      headers: {
        "Authorization": token
      },
      body: JSON.stringify({bio}), 
    })
    if(!res.ok) throw new Error("Login Failed.")
  };

  const changeDisplay = async (token) => {
    if(!editableUser) return;

    const res = await fetch(Routes.ProfileRoutes.changeDisplay, {
      method: "POST",
      headers: {
        "Authorization": token
      },
      body: JSON.stringify({sectionSettings}), 
    })
    if(!res.ok) throw new Error("Login Failed.")

  };



  //FINISH LATER
  const setOrder = () => {
    if(!editableUser) return;
  };


  //FINISH LATER
  const setVisibility = () => {
    if(!editableUser) return;
  };

  //FINISH LATER
  const Follow = (token) => { };

  //FINISH LATER
  const Join = (token) => { };

  const renderButtons = () => (
    <View>
      
      {(!editableUser) && (user.type.toLowerCase() === 'user' || user.type.toLowerCase() === 'clique') && (
        <TouchableOpacity onPress={Follow}>
          <Text>Follow</Text>
        </TouchableOpacity>
      )}
      {(!editableUser) && (user.type.toLowerCase() === 'clique') && (
        <TouchableOpacity onPress={Join}>
          <Text>Join</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderProfileBox = () => { };

  const renderHorizontalSection = () => {
    return Object.entries(user).map(([key, value]) => {
      if (Array.isArray(value)) {

        const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        return (
          <HorizontalScrollSection title={title} data={value} func={renderProfileBox} />

        );
      }

    });
  };

  const getProfileImageStyle = () => {
    switch (user.type.toLowerCase()) {
      case 'user':
        return styles.profileUser;
      case 'clique':
        return styles.profileClique;
      case 'cluster':
        return styles.profileCluster;
    }

  };

  const getImageStyle = () => {
    return user.type.toLowerCase() === 'cluster' ? styles.counterRotate : {};
  };




  return (
    <SafeAreaView>
      <View>
        {/* Header with Main Profile Elements */}
        <View>
          <View style={[styles.profileContainer, getProfileImageStyle()]}>
            <Image
              source={{ uri: user.profileImage }}
              style={[getImageStyle()]}
            />
          </View>
          <Text>{user.name}</Text>
          <Text>{user.beats} Beats | {user.followers} Followers | {user.following} Following</Text>
          {renderButtons()}
        </View>
        <ScrollView>

          {/* User Bio */}
          <View>
            <Text>Biography</Text>
            {editableUser ? (
            <View>
              <TextInput
                multiline
                value={editableUser.bio}
                onChangeText={setBio}
                style={styles.textInput}
              />
              <TouchableOpacity onPress={changeBio}>'
                <Text>Change</Text>
              </TouchableOpacity>
              
            </View>

          ) : (
            <Text>{user.bio}</Text>
          )}
          </View>

          {/*Render all needed Horizontal Sections gained.*/}
          {editableUser && <TouchableOpacity onPress={changeDisplay}>'
            <Text>Update</Text>
            </TouchableOpacity>
          }
          {renderHorizontalSection()}


        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffff",
    paddingTop: 40,
  },
  profileContainer: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileUser: {
    borderRadius: 0
  },
  profileClique: {
    borderRadius: 50
  },
  profileCluster: {
    borderRadius: 0,
    transform: [{ rotate: '45deg' }],
  },

  profileImageBase: {
    width: 100,
    height: 100,
    borderRadius: 0,
  },

  counterRotate: {
    transform: [{ rotate: '-45deg' }],
  },
});
