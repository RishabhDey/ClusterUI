import { router } from 'expo-router';
import { useContext, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage(){
  const {login, loading} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View>
          <Text>Login</Text>
          <TextInput
            placeholder="username"
            value = {username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="password"
            value = {password}
            onChangeText = {setPassword}
            secureTextEntry
          />
          {(!loading) && 
            <TouchableOpacity onPress={() => login(username, password)}>
              <Text>Login</Text>
            </TouchableOpacity>
          }
          {/* TODOOO */}
          <TouchableOpacity onPress = {() => router.push('/lostpassword')}>Forgot Password?</TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>

  )

}


const styles = new StyleSheet.create({});
