import { StyleSheet, Text, View } from 'react-native';


//Cluster has a lot of scrollable elements for the profiles. 
const HorizontalScrollSection = ({ title, data, func }) => {
    return (
        <View>
            <Text>{title}</Text>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        {func(item)}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({});


export default HorizontalScrollSection;
