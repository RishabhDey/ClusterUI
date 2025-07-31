import { useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Routes from "../constants/routes";

export default function LostPasswordPage(){
  const [phoneNumber, setPhoneNumber] = useState('');
  const sent = "A password reset has been sent to your appropriate email."
  const notSent = "Something has gone wrong. Try again later."
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  const sendEmail = async() => {
    setLoading(true);
    const response = await fetch(Routes.AuthRoutes.forgottenPassword, {
      method: 'POST',
      body: JSON.stringify({phoneNumber}),
      credentials: 'include' 
    })

    if(response.ok) {
      setValid(true);
    }
    const msg = valid ? sent : notSent

    return(
      <Text>{msg}</Text>
    )
  }

  return(
    <SafeAreaView>
      <KeyboardAvoidingView>
        <View>
          <Text>Forgotten Password?</Text>
            <TextInput
              placeholder="Phone Number"
              value = {phoneNumber}
              onChangeText={setPhoneNumber}
              autoCapitalize="none"
            />

          <TouchableOpacity  
            disabled={loading} 
            onPress={() => sendEmail()}>
            <Text>Send</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )

}

const styles = new StyleSheet.create({});
