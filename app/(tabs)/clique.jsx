
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Routes from '../constants/Routes';
import { StorageContext } from "../context/StorageContext";

export default function CliquePage(){
  const {getLastViewedMessage} = useContext(StorageContext);
  const {loading, JWTAccess, withFreshToken} = useContext(AuthContext)
  const [cliques, setCliques] = useState([]);
  const [loadingCliques, setLoadingCliques] = useState(false);
  const [valid, setValid] = useState(true);
  const navigation = useNavigation();


  const fetchCliques = async (id, token) => {

    if(loadingCliques || !valid) return;
    if (!token) return;

    setLoadingCliques(true);
    
    const res = await fetch(Routes.CliqueRoutes.getClique, {
      method: "GET",
      headers: {
        "Authorization": token,
        "PrevCliqueID" : id
      }
    })

    if(!res.ok) {
      throw new Error();
    }

    const data = await res.json();

    if (data.length === 0) {
        setValid(false);
      } else {
        setCliques((prev) => [...prev, ...data]);
    }

    setLoadingClusters(false);

  };

  const loadMore = () => {
    if(loadingCliques || !valid) return;

    const lastId = cliques.length ? cliques[cliques.length - 1].id : null;
    fetchCliques(lastId);
  };

  useEffect(() => {
    if(token == null){
      JWTAccess();
    }
    withFreshToken(fetchCliques(id = null))
  }, []);

  const renderFooter = () => {

    if (!loading && !loadingCliques) return null

    return <ActivityIndicator/>
  }

  const renderItem = async ({ item }) => {
    const msg = await getLastViewedMessage(item.roomId);
    const highlight = msg === item.lastmsg; // ADD THIS LATER INTO STYLES
    
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("chat", { roomid: item.roomId })}
      >
        <View>
          <View>
            <Image source={{ uri: item.imageUrl }} />
            <Text>{item.name}</Text>
          </View>
            <Text>{item.lastmsg}</Text>
        </View>
      </TouchableOpacity>
    );

  };


  return(
    <SafeAreaView>
      <View>
        <Text>Clique</Text>
      </View>

      <FlatList
        data ={cliques}
        keyExtractor = {(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator = {false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  )

};

const styles = new StyleSheet.create({});
