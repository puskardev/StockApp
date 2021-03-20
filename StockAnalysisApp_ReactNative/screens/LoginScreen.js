import React from "react";
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity } from "react-native";

export default function LoginScreen({ navigation }) {

    const pressHandlerHomePage = () => {
        navigation.navigate('HomePage');
    }

    return (
    <ImageBackground source={require('../assets/AppBackground.png')} style={styles.container}>
        <Text style={styles.Login}>Log In</Text>
        <TextInput placeholder="Email" style={styles.text} />
        <TextInput secureTextEntry={true} placeholder="Password" style={styles.text}/>
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
        marginBottom: 10
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