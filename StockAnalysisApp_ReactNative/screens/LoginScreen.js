import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, ScrollView, Image } from "react-native";
import fire from "../src/firebase/config";

export default function LoginScreen({ navigation }) {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const [SigninFailed, setSigninFailed] = useState(false);

    // handles in firebase whenever the user clicks the "Login" button
    const pressHandlerHomePage = () => {
        {
            fire
              .auth()
              // uses the email and password that the user put into the text fields to sign in with
              .signInWithEmailAndPassword(Email, Password)
              .then(() => {
                // if the email and password are valid, then the app will display the homepage (user has successfully logged in)
                navigation.navigate("HomePage");
                console.log("User signed in");
              })
              .catch((error) => {
                if (error.code === "auth/operation-not-allowed") {
                  console.log("Enable anonymous in your firebase console.");
                }
                setSigninFailed(true);
              });
        }
    };

    return (
        <ImageBackground source={require('../assets/AppBackground.png')} style={styles.backgroundContainer}>
            <ScrollView>             
                <View style={styles.container}>
                    {/* */}
                    <Image style={styles.MoonLogo} resizeMode='contain' source={ require("../assets/MoonLogo.png") } />
                    <TextInput placeholder="Email" style={styles.text} onChangeText={(Email) => setEmail(Email)} />
                    <TextInput secureTextEntry={true} placeholder="Password" style={styles.text} onChangeText={(Password) => setPassword(Password)} />
                    <Text style={SigninFailed ? { color: '#c81b1b' } : { opacity: 0 }}>Your username or password is invalid.</Text>
                    <View style={styles.border}>
                        <TouchableOpacity style={styles.SignupTouch} onPress={pressHandlerHomePage}>
                            <Text style={{ color: "black" }}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 22 }}>
                        <Text style={styles.Signup}>Don't have an Account?</Text>
                        <TouchableOpacity style={{ marginTop: 1 }} onPress={ () => navigation.navigate("SignupScreen") } >
                            <Text style={{ color: "grey", fontSize: 16 }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>

        /* 
        <ImageBackground source={require('../assets/AppBackground.png')} style={styles.backgroundContainer}>
            <ScrollView>             
                <View style={styles.container}>
                    <Image style={styles.MoonLogo} resizeMode='contain' source={ require("../assets/MoonLogo.png") } />
                    <TextInput placeholder="Email" style={styles.text} onChangeText={(Email) => setEmail(Email)} />
                    <TextInput secureTextEntry={true} placeholder="Password" style={styles.text} onChangeText={(Password) => setPassword(Password)} />
                    <Text style={SigninFailed ? { color: '#c81b1b' } : { opacity: 0 }}>Your username or password is invalid.</Text>
                    <View style={styles.border}>
                        <TouchableOpacity style={styles.SignupTouch} onPress={pressHandlerHomePage}>
                            <Text style={{ color: "black" }}>Log In</Text>
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
        */
    );
  }

  const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1
    },
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 150,
        marginLeft: 30,
        marginRight: 30,
    },
    MoonLogo: { 
        height: 80,
        marginBottom: 20
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
        height: "12%",
        width: "90%",
        margin: 12,
        backgroundColor: "#FBFBFF",
        borderRadius: 5
    },
    SignupTouch: {
        alignSelf: 'center',
        width: "80%",
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