import { AuthContext } from "@/context/AuthContext";

import { useContext, useState } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function ClusterFYP(){
  const {token, login, logout, loading, JWTAccess} = useContext(AuthContext)
  const [clusters, setClusters] = useState([]);
  const [loadingClusters, setLoadingClusters] = useState(true);


  const [valid, setValid] = useState(true); //end of data.

  const { height: screenHeight } = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const itemHeight = screenHeight - insets.top - insets.bottom;

  const fetchClusters = () => {

  }

  const loadMore = () => {

  }

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
            clusterRenderBox()
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
