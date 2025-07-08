import ClusterRenderBox from "@/components/ClusterRenderBox";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

  export default function ClusterFYP(){
    const {token, logout, loading, JWTAccess,
      reconnectAttempts, MAX_RECONNECT_ATTEMPTS
    } = useContext(AuthContext)

    const [clusters, setClusters] = useState([]);
    const [loadingClusters, setLoadingClusters] = useState(false);

    


    const [valid, setValid] = useState(true); //end of data.

    const { height: screenHeight } = Dimensions.get('window');
    const insets = useSafeAreaInsets();
    const itemHeight = screenHeight - insets.top - insets.bottom;

    const fetchClusters = async (id) => {
      try{
        if (loadingClusters || !valid) return;
        if (!token) return;


        setLoadingClusters(true);
        //CHANGE LATER
        const res = await fetch("https://cluster.com/api/clusters", {
          method: "GET",
          headers: {
            "Authorization": token,
            "PrevClusterID": id
          }
        })

        if(!res.ok) {
          reconnectAttempts.current++

          if(reconnectAttempts > MAX_RECONNECT_ATTEMPTS){
          logout();
          }
          await JWTAccess();
          fetchClusters(id);
        }

        reconnectAttempts.current = 0;

        const data = await res.json();

        if (data.length === 0) {
          setValid(false);
        } else {
          setClusters((prev) => [...prev, ...data]);
        }
      }catch (error) {
        console.error("Error fetching clusters:", error);
      }finally{
        setLoadingClusters(false);
      }
    }

    const loadMore = () => {
      if (loadingClusters || !valid) return;
      const lastId = clusters.length ? clusters[clusters.length - 1].id : null;
      fetchClusters(lastId);
    }

    useEffect(() => {
      if (token == null){
        JWTAccess();
      }
      fetchClusters(null);
      return; 
    }, [token, loading])

    const renderFooter = () => {
      if (!loading) return null
      return <ActivityIndicator/>
    }

    return(
      <SafeAreaView>
        <View>
          <FlatList
            data={clusters}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ClusterRenderBox
                post_id={item.id}
                author={item.author}
                cluster={item.cluster}
                promotedClique={item.promotedClique}
                songTitle={item.songTitle}
                songAuthor={item.songAuthor}
                description={item.description}
                totalLikes={item.totalLikes}
              />
            )}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={itemHeight}
            snapToAlignment="start"
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        </View>
      </SafeAreaView>
      
    )
  };
