import React, { useState, Component } from "react";
import { StyleSheet, Text, View, Modal, Pressable, ScrollView, TextInput, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import fire from "../src/firebase/config";

export default function SignupScreen({ navigation }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Password2, setPass] = useState("");
  const [Name, setName] = useState("");
  const [userCreatedModalVisible, setUserCreatedModalVisible] = useState(false);

  Sign = () => {
    if (Password === Password2 && Email != "") {
      fire
        .auth()
        .createUserWithEmailAndPassword(Email, Password)
        .then(() => {
          console.log("User signed up");
          setUserCreatedModalVisible(!userCreatedModalVisible)
        })
        .catch((error) => {
          if (error.code === "auth/operation-not-allowed") {
            console.log("Enable anonymous in your firebase console.");
          }

          console.error(error);
        });
    } else {
      console.log("passwords dont match");
    }
  };

  return (
    <ImageBackground source={require("../assets/AppBackground.png")} style={styles.container1}>
      <ScrollView>
        <Modal animationType="slide" transparent={true} visible={userCreatedModalVisible} onRequestClose={() => {setUserCreatedModalVisible(!userCreatedModalVisible); }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <View style={{ margin: 20, backgroundColor: '#2f3b52', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
              <Text style={{ marginBottom: 15, fontWeight: 'bold', color: 'white', fontSize: 18 }}>Account Created!</Text>
              <Pressable style={{ backgroundColor: 'white', borderRadius: 20, padding: 10, elevation: 2 }} onPress={() => setUserCreatedModalVisible(!userCreatedModalVisible)} onPress={() => navigation.navigate("LoginScreen")}>
                <Text style={{ color: '#232d41', fontWeight: 'bold' }}>Go back to Login Page</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        
        <View style={styles.container}>
          <Text style={styles.Sign}>Sign Up</Text>
          <View style={styles.Textin}>
            <TextInput placeholder="First Name" style={styles.Box2} onChangeText={(Name) => setName(Name)} />
          </View>
          <View style={styles.Textin}>
            <TextInput placeholder="Last Name" style={styles.Box2} onChangeText={(Name) => setName(Name)} />
          </View>
          <View style={styles.Textin}>
            <TextInput placeholder="Email" style={styles.Box2} onChangeText={(Email) => setEmail(Email)} />
          </View>
          <View style={styles.Textin}>
            <TextInput placeholder="Enter Password" style={styles.Box2} secureTextEntry={true} onChangeText={(Password) => setPassword(Password)} />
          </View>
          <View style={styles.Textin}>
            <TextInput placeholder="Repeat your password" style={styles.Box2} secureTextEntry={true} onChangeText={(Password2) => setPass(Password2)} />
          </View>

          <Text style={styles.agree}>
            By signing up, you agree to our Terms, Data Policy and Cookies Policy.
          </Text>

          <View style={styles.ButtonBorder}>
            <TouchableOpacity style={styles.ButtonInside} onPress={Sign}>
              <Text style={{ fontSize: 15 }}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.Signup}>Already have an Account?</Text>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={{ marginTop: 1 }} onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={{ color: "grey" }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  Signup: {
    fontSize: 15,
    alignItems: "center",
    marginTop: 30,
    color: 'white'
  },
  Sign: {
    fontWeight: "bold",
    color: "white",
    fontSize: 40,
    marginBottom: 40,
    marginTop: 40,
  },
  Box2: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    width: "100%",
    height: "100%",
    backgroundColor: "#FBFBFF",
    borderRadius: 5,
  },
  ButtonBorder: {
    alignItems: "center",
    marginTop: 10,
    width: "50%",
    marginBottom: 20,
  },
  ButtonInside: {
    width: "100%",
    padding: 10,
    paddingLeft: "20%",
    paddingRight: "20%",
    alignItems: "center",
    backgroundColor: "#ABABAB",
    borderRadius: 8,
    marginTop: 25,
  },
  agree: {
    width: "50%",
    textAlign: "center",
    color: "grey",
    marginTop: 20,
  },
  Textin: {
    width: "75%",
    backgroundColor: "yellow",
    height: "5%",
    borderRadius: 5,
    marginBottom: 30,
  },
});
