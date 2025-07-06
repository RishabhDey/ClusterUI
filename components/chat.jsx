import { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserBubble from "./UserBubble";



const chatView = (roomId) => {

  const [messages, setMessages] = useState([]);
  const [userStatus, setUserStatus] = useState({}); // { userId: status }
  const [chatInput, setChatInput] = useState('');
  const [postInput, setPostInput] = useState('');
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const ws = useRef(null);

  useEffect(() => {
    async function initJWT() {
        try{
            const refreshResponse = await fetch("/refresh", {credentials: "include"});
            if(!refreshResponse.ok) {
                throw new Error("Failed");
            }
            const data = await refreshResponse.json()
            const token = data.accessToken;
            initChat(roomId, token)
        } catch (error) {
            console.error("JWT Token Refresh Failed", error);
            window.location.href = "/";
        }
    }
    initJWT();

    return () => {
      if(ws.socket){
        ws.socket.close();
      }
    }
  }, []);

  const initChat = (roomId, token) => {
    //CHANGE LATER
    ws.socket = new WebSocket(`ws://${window.location.host}/ws/chat/${roomId}?token=${token}`);

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
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

  };

  //FINISH LATER
  function handleMessage(msg) {
  
  }






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
