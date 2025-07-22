import Comments from "@components/CommentsRenderBox";
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';



const ClusterRenderBox = (
  { post_id,
    author,
    cluster,
    promotedClique,
    songTitle,
    songAuthor,
    description,
    totalLikes,
  }
) => {
  const [commentsVisible, setCommentsVisible] = useState(false);

  //FINISH LATER
  const onLike = (token) => {

  };

  const CommentView = () => {
    return (
      <Comments post_id = {post_id} visible = {commentsVisible} onClose = {setCommentsVisible}/>
    )
  };

  //FINISH LATER
  const onPlay = () => {

  }


  return (
    <View>
      <View>
        <Text>{author} | {cluster} | {promotedClique}</Text>
      </View>
      {/*Outer Content Box */}
      <View>
        {/*Community Rating or Likes */}
        <View>
          <Text>Likes: {totalLikes}</Text>
        </View>

        {/*Inner Main Box */}
        <View>
          {/*Placeholder for Vinyl Play Button*/}
          <TouchableOpacity onPress = {onPlay()}>
            <View style={styles.circle} />
            </TouchableOpacity>
          
          <View>
            <Text>{description}</Text>
          </View>
        </View>
        {/* Song info */}
        <Text style={styles.songTitle}>{songTitle}</Text>
        <Text style={styles.songAuthor}>{songAuthor}</Text>
        <View>
          <TouchableOpacity onPress={onLike()}>
            <Text>Like</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={CommentView()}>
            <Text>Comments</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  circle: {
    borderRadius: 50
  }
});


export default clusterRenderBox;
