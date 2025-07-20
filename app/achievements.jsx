import { Routes } from "..constants/Routes";
import { useContext, useEffect, useState } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AchievementsStaticPage () {
  const [achievements, loading, setAchievements] = useState([]);
  const {withFreshToken} = useContext(AuthContext);
  const {id, setId} = useState(null);
  const [loadingAchievements, setLoadingAchievements] = useState(false);
  const [valid, setValid] = useState(true);


  const fetchAchievements  = async (token) => {
    if(loading || loadingAchievements || !valid) return; 

    const res = await fetch(Routes.StaticRoutes.achievements, {
        method: "GET",
        headers: {
          "Authorization": token,
          "PrevClusterID": id || ""
        }
      })

      if(!res.ok) {
        throw new Error();
      }

      const data = await res.json();

      if (data.length === 0) {
        setValid(false); 
      } else {
        setAchievements((prev) => [...prev, ...data]);
        setId(data[data.length - 1].achievement_id);
      }
  };

  useEffect(() => {
    withFreshToken(fetchAchievements);
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Text>Achievement ID: {item.achievement_id}</Text>
      <Image src={item.achievement_image}/>
      <Text>{item.title || "No title"}</Text>
    </View>
  );

  const ListFooter = () =>
    (loadingAchievements || loading) ? (
      <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
    ) : null;


  return (
    <SafeAreaView>
      <View>
        <Text>Achievements</Text>
        <FlatList
          data={achievements}
          keyExtractor={(item) => item.achievement_id.toString()}
          renderItem={renderItem}
          onEndReached={() => {
            if (valid && !loading) {
              fetchAchievements();
            }
          }}
          onEndReachedThreshold={0.2} 
          ListFooterComponent={ListFooter}
        />
      </View>
    </SafeAreaView>
  )
};
