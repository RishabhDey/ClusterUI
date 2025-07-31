import { UserBubble } from "@components/UserBubble";
import Routes from "@constants/routes";
import { useState } from "react";

import { ActivityIndicator, KeyboardAvoidingView, Modal, TextInput, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Comments({ visible, onClose, post_id, init_comment_id}){
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);
  const {loading, withFreshToken} = useContext(AuthContext)
  const [loadingMore, setLoadingMore] = useState(false);

  const initComments = async() => {
    const res = await fetch(`${Routes.CommentRoutes.getComments}?post_id=${post_id}&prev_comment_id=${init_comment_id}`);
    const data = await res.json();
    setComments(data.comments);
  };


  useEffect(() => {
    initComments();
  }, [post_id]);

  const fetchMoreComments = async(prev_comment_id) => {
    if (loadingMore || comments.length === 0) return;
    setLoadingMore(true);
    const lastComment = comments[comments.length - 1];

    const res = await fetch(`${Routes.CommentRoutes.getComments}?post_id=${post_id}&prev_comment_id=${lastComment.id}`);
    const data = await res.json();
    setComments([...comments, ...data.comments]);
    setLoadingMore(false);
  };

  const sendComment = async(token) => {
    if (loading) return;

    const res = await fetch(Routes.CommentRoutes.onComment, {
      method: "POST",
      headers: {
        "Authorization": token,
        "Cluster_id": post_id
      },
      body: JSON.stringify({post_id, text: commentInput}), 
    });

    if(!res.ok) throw new Error("Comment failed to send.");

    const newComment = await res.json();
    setComments([newComment, ...comments]);

    setCommentInput('');
     
  };


  //HANDLE LATER
  const getReplies = async(id) => {
    return;
  }



  const renderItem = ({ item }) => (
    <View>
      <UserBubble
        author={item.author}
        time={item.time}
        message={item.message}
        profileImage={item.profileImage}
      />
      {item.hasReplies && <TouchableOpacity onPress={getReplies(item.id)}>View Reply</TouchableOpacity>}
      
    </View>
  );

  const renderFooter = () => {
    return loadingMore ? <ActivityIndicator /> : null;
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
      <SafeAreaView>
        <View>
          <Text>Comments</Text>
          <TouchableOpacity onPress = {onClose}>Close</TouchableOpacity>
        </View>



        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            onEndReached={fetchMoreComments}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            inverted 
          />
          <View>
            <TextInput
              placeholder="Type a Message... "
              value = {commentInput}
              onChangeText={setCommentInput}
              onSubmitEditing={withFreshToken(sendComment)}
              returnKeyType = 'send'
              ListHeaderComponenet = {renderHeader}  
            />
            <TouchableOpacity onPress={withFreshToken(sendComment)}>
              <Text>Send</Text>
            </TouchableOpacity>
          </View>


        </KeyboardAvoidingView>
    
      </SafeAreaView>
    </Modal>
    )
};

