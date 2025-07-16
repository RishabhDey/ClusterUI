import { useContext, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Routes } from "../constants/routes";
import { AuthContext } from "../context/AuthContext.Jsx";
import UserBubble from "./UserBubble";


const chatView = (roomId) => {
  const {token, loading, JWTAccess, withFreshToken} = useContext(AuthContext)

  const [messages, setMessages] = useState([]);
  const [userStatus, setUserStatus] = useState({}); 
  const [chatInput, setChatInput] = useState('');
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [messageLoading, setMessageLoading] = useState(true);
  const ws = useRef(null);



  const initChat  = async (token) => {

    if(ws.current){
      ws.current.close();
      ws.current = null;
    }

    ws.socket = new WebSocket(`${Routes.ChatCliqueRoutes.WS}/${roomId}?token=${token}`);

    ws.socket.onopen = () => {
      console.log("WebSocket is connected");
    };

    ws.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log("Message Recieved", msg)
      if (Array.isArray(msg)) {
        msg.forEach(handleMessage);
      } else {
        handleMessage(msg);
      }
    };

    ws.socket.onerror = (err) => {
      window.location.href = "/";
      throw new Error();
    };

    ws.socket.onclose = async (event) => {
      console.log("WebSocket connection closed: ", event);
      throw new Error();
    };
  }


  //FINISH LATER
  function handleMessage(msg) {
  
  }

  useEffect(() => {

    if (token == null){
      JWTAccess();
    }
    if(!loading){
      withFreshToken(initChat);
    }
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendChatMessage = () => {
    const text = chatInput.trim();
    if (!text || !ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    ws.current.send(JSON.stringify({
      typ: 'sendChat',
      sendChatMessage: text,
    }));

    setChatInput('');
  };

  //FINISH LATER
  const requestOlderMessages = () => {

  }

  const handleScroll = ({ nativeEvent }) => {
    if (nativeEvent.contentOffset.y < 50) {
      requestOlderMessages();
    }
  };

  const renderHeader = () => {
      if (!(loading && messageLoading)) return null
      return <ActivityIndicator/>
    }




  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              UserBubble(
                author = item.name,
                time = item.time,
                messages = item.message,
                profileImage = item.profileImage,
                isPost = item.isPost,
                postDescription = item.postDescription
              )
            )
            }
            inverted={true} 
            onScroll={handleScroll}
            scrollEventThrottle={16}
            />


          <View>
            <TextInput
              placeholder="Type a Message... "
              value = {chatInput}
              onChangeText={setChatInput}
              onSubmitEditing={sendChatMessage}
              returnKeyType = 'send'
              ListHeaderComponenet = {renderHeader  }  
            />
            <TouchableOpacity onPress={sendChatMessage}>
              <Text>Send</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text>Users</Text>
              <FlatList
                data={Object.entries(userStatus)}
                keyExtractor={([userId]) => userId}
                renderItem={({ item }) => {
                  const [userId, status] = item;
                  return (
                    <View>
                      <Text>{userId}</Text>
                      <Text>{status}</Text>
                    </View>
                  );
                }}
                contentContainerStyle={{ paddingBottom: 10 }}
              />
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({})


export default ChatView; 
