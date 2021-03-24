import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import fire from "../src/firebase/config";
import { FontAwesome } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const pressHandlerHomePage = () => {
        {
            fire
              .auth()
              .signInWithEmailAndPassword(Email, Password)
              .then(() => {
                navigation.navigate("HomePage");
                console.log("User signed in");
              })
              .catch((error) => {
                if (error.code === "auth/operation-not-allowed") {
                  console.log("Enable anonymous in your firebase console.");
                }
      
                console.error(error);
              });
        }
    };

    return (
        <ImageBackground source={require('../assets/AppBackground.png')} style={styles.container}>
            <FontAwesomeIcon icon={ faChartLine } color={'white'} size={80} />
            <Text style={styles.Login}>Log In</Text>
            <TextInput placeholder="Email" style={styles.text} onChangeText={(Email) => setEmail(Email)} />
            <TextInput secureTextEntry={true} placeholder="Password" style={styles.text} onChangeText={(Password) => setPassword(Password)} />
            <View style={styles.border}>
                <TouchableOpacity style={styles.SignupTouch} onPress={pressHandlerHomePage}>
                    <Text style={{ color: "black" }}>Sign In</Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", marginTop: 25 }}>
                <Text style={styles.Signup}>Don't have an Account?</Text>
                <TouchableOpacity style={{ marginTop: 1 }}>
                    <Text style={{ color: "grey" }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2B3B5C",
        marginBottom: 30
    },
    text: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 15,
        height: "5%",
        width: "75%",
        margin: 12,
        backgroundColor: "#FBFBFF",
        borderRadius: 5
    },
    Login: {
        fontWeight: "bold",
        color: "white",
        fontSize: 35,
        marginBottom: 10,
        marginTop: 10
    },
    button: {
        padding: 10,
        alignContent: "center",
    },
    SignupTouch: {
        width: "100%",
        padding: 10,
        paddingLeft: "20%",
        paddingRight: "20%",
        alignItems: "center",
        backgroundColor: "#ABABAB",
        borderRadius: 8,
        marginTop: 15,
    },
    border: {
        width: "50%",
    },
    Signup: {
        fontSize: 15,
        alignItems: "center",
        color: 'white'
    },
  });