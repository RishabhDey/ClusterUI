import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const onPostPress = () => { };

const UserBubble = (
  {
    author,
    time,
    message,
    profileImage,
    isPost = false,
    postDescription = null,
    
  }
) => {
  const postText = isPost ? author + ' promoted the Clique!' : '';

  return (
    <View>
      <Image source={profileImage} />
      {/* Inner Content Box */}
      <View>
        {/* Header */}
        <View>
          <Text>{author}</Text>
          <Text>{time}</Text>
        </View>

        {!isPost && message && <Text>message</Text>}

        {isPost && (
          <TouchableOpacity onPress={onPostPress}>

            <View style={styles.circle} />
            <Text>{postText}</Text>
            <Text>{postDescription}</Text>
            <Text>Read More... </Text>
          </TouchableOpacity>

        )}
      </View>
    </View>
  );

};

const styles = StyleSheet.create({

  circle: {
    borderRadius: 50
  }

});

export default UserBubble;
