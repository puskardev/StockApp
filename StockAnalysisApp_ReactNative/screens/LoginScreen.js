import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, ScrollView, Alert } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import fire from "../src/firebase/config";

export default function LoginScreen({ navigation }) {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const [SigninFailed, setSigninFailed] = useState(false);

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
                setSigninFailed(true);
                //console.error(error);
              });
        }
    };

    return (
        <ImageBackground source={require('../assets/AppBackground.png')} style={styles.backgroundContainer}>
            <ScrollView>
                <View style={styles.container}>
                    <FontAwesomeIcon icon={ faChartLine } color={'white'} size={80} />
                    <Text style={styles.Login}>Log In</Text>
                    <TextInput placeholder="Email" style={styles.text} onChangeText={(Email) => setEmail(Email)} />
                    <TextInput secureTextEntry={true} placeholder="Password" style={styles.text} onChangeText={(Password) => setPassword(Password)} />
                    <Text style={SigninFailed ? { color: '#c81b1b' } : { opacity: 0 }}>Your username or password is invalid.</Text>
                    <View style={styles.border}>
                        <TouchableOpacity style={styles.SignupTouch} onPress={pressHandlerHomePage}>
                            <Text style={{ color: "black" }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 40 }}>
                        <Text style={styles.Signup}>Don't have an Account?</Text>
                        <TouchableOpacity style={{ marginTop: 1 }} onPress={ () => navigation.navigate("SignupScreen") } >
                            <Text style={{ color: "grey", fontSize: 16 }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
  }

  const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: "#2B3B5C"
    },
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 120
    },
    Login: {
        fontWeight: "bold",
        color: "white",
        fontSize: 35,
        marginBottom: 10,
        marginTop: 10
    },
    text: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 15,
        height: "10%",
        width: "70%",
        margin: 12,
        backgroundColor: "#FBFBFF",
        borderRadius: 5
    },
    SignupTouch: {
        alignSelf: 'center',
        width: "70%",
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
        fontSize: 16,
        alignItems: "center",
        color: 'white'
    },
  });