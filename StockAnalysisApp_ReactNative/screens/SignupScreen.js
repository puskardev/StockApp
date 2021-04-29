import React, { useState, Component } from "react";
import { StyleSheet, Text, View, Modal, Pressable, ScrollView, TextInput, ImageBackground, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import fire from "../src/firebase/config";

import { Checkbox } from 'react-native-paper';

// front end code for displaying signup screen
// Uses firebase to create new users
export default function SignupScreen({ navigation }) {

  // variables for user information
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Password2, setPass] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");

  // variables for validations
  const [PasswordsDontMatch, setPasswordsDontMatch] = useState(false);
  const [EmailEmpty, setEmailEmpty] = useState(false);
  const [CheckboxNotMarked, setCheckboxNotMarked] = useState(false);
  const [OtherError, setOtherError] = useState(false);

  const [userCreatedModalVisible, setUserCreatedModalVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [termsModalVisisble, setTermsModalVisible] = useState(false);

  // handles when user signs up
  Sign = () => {
    setPasswordsDontMatch(false);
    setEmailEmpty(false);
    setCheckboxNotMarked(false);
    setOtherError(false);
    if (Password != "" && Password === Password2 && Email != "" && checked === true ) {
      fire
        .auth()
        .createUserWithEmailAndPassword(Email, Password)
        .then(() => {
          console.log("User signed up");
          setUserCreatedModalVisible(!userCreatedModalVisible);
        })
        .catch((error) => {
          if (error.code === "auth/operation-not-allowed") {
            console.log("Enable anonymous in your firebase console.");
          }
        });
    } else if (Password != Password2) {
      setPasswordsDontMatch(true);
    } else if (Email === "") {
      setEmailEmpty(true);
    } else if (checked === false) {
      setCheckboxNotMarked(true);
    } else {
      setOtherError(true);
    }
  };

  return (
    <ImageBackground source={require("../assets/AppBackground.png")} style={styles.container1}>
      <ScrollView>

        <Modal animationType="slide" transparent={true} visible={userCreatedModalVisible} onRequestClose={() => {setUserCreatedModalVisible(!userCreatedModalVisible); }}>
          <View style={styles.ModalContainer}>
            <View style={styles.ModalBackground}>
              <Text style={{ marginBottom: 15, fontWeight: 'bold', color: 'white', fontSize: 18 }}>Account Created!</Text>
              <Pressable style={{ backgroundColor: 'white', borderRadius: 20, padding: 10, elevation: 2 }} onPress={() => setUserCreatedModalVisible(!userCreatedModalVisible)} onPress={() => navigation.navigate("LoginScreen")}>
                <Text style={{ color: '#232d41', fontWeight: 'bold' }}>Go back to Login Page</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={termsModalVisisble} onRequestClose={() => {setTermsModalVisible(!termsModalVisisble); }}>
          <View style={styles.ModalContainer}>
            <View style={styles.ModalBackground}>
              <Text style={{ marginBottom: 15, color: 'white', fontWeight: 'bold', fontSize: 25, alignSelf: 'center' }}>Disclosures</Text>
              <Text style={{ marginBottom: 15, color: 'white', fontSize: 17 }}>
                All investments involve risks, including the loss of principal. 
                The past performance of a security or financial product does not guarantee future results or returns. 
                Users should consider their investment objectives and risks carefully before investing in securities.
                The price of a given security may increase or decrease based on market conditions and users may lose money, including their original investment. 
                Moon is meant for informational purposes only and is not intended to serve as a recommendation to a user to buy, hold or sell any security or any other asset.
              </Text>
              <Pressable style={{ backgroundColor: 'white', borderRadius: 20, padding: 10, elevation: 2 }} onPress={() => setTermsModalVisible(!termsModalVisisble)}>
                <Text style={{ color: '#232d41', fontWeight: 'bold' }}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        
        <View style={styles.container}>
          <Text style={styles.Sign}>Sign Up</Text>
          <View style={styles.Textin}>
            <TextInput placeholder="First Name" style={styles.Box2} onChangeText={(FirstName) => setFirstName(FirstName)} />
          </View>
          <View style={styles.Textin}>
            <TextInput placeholder="Last Name" style={styles.Box2} onChangeText={(LastName) => setLastName(LastName)} />
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

          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20  }}>
            <Text style={PasswordsDontMatch ? { color: '#c81b1b', position: 'absolute' } : { opacity: 0, position: 'absolute' } }>Your passwords do not match.</Text>
            <Text style={EmailEmpty ? { color: '#c81b1b', position: 'absolute' } : { opacity: 0, position: 'absolute' }}>Please enter a valid email.</Text>
            <Text style={CheckboxNotMarked ? { color: '#c81b1b', position: 'absolute', width: '180%', fontSize: 13, left: -170 } : { opacity: 0, position: 'absolute' }}>Please click the checkbox in order to create an account.</Text>
            <Text style={OtherError ? { color: '#c81b1b', position: 'absolute' } : { opacity: 0, position: 'absolute' }}>Please fill all input fields correctly.</Text>
          </View>

          <View style={styles.AgreementContainer}>
            <View style={styles.CheckboxOutline}>
              <Checkbox color='white' uncheckedColor='white' status={checked ? 'checked' : 'unchecked'} onPress={() => {setChecked(!checked);}} />
            </View>
            <View>
              <Text style={{ color: 'grey' }}>By clicking this checkbox, you agree that </Text>
              <Text style={{ color: 'grey' }}>you have acknowledged and understood </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'grey' }}>our </Text>
                <Text style={{ color: 'white', textDecorationLine: 'underline' }} onPress={() => setTermsModalVisible(!termsModalVisisble)}>disclosures</Text>
                <Text style={{ color: 'grey' }}>.</Text>
              </View>
            </View>
          </View>

          <View style={styles.ButtonBorder}>
            <TouchableOpacity style={styles.ButtonInside} onPress={Sign}>
              <Text style={{ fontSize: 15 }}>Create Account</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.Signup}>Already have an Account?</Text>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={{ marginTop: 1 }} onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={{ color: "grey", fontSize: 16 }}>Sign In</Text>
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
    fontSize: 16,
    alignItems: "center",
    marginTop: 10,
    color: 'white'
  },
  Sign: {
    fontWeight: "bold",
    color: "white",
    fontSize: 40,
    marginBottom: 40,
    ...Platform.select({
      ios: {
        marginTop: 20,
      }
    }),
  },
  Box2: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    width: "100%",
    height: "120%",
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
    width: "95%",
    padding: 10,
    paddingLeft: "20%",
    paddingRight: "20%",
    alignItems: "center",
    backgroundColor: "#ABABAB",
    borderRadius: 8,
    marginTop: 25,
  },
  AgreementContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: 8
  },
  CheckboxOutline: {
    ...Platform.select({
      ios: {
        borderWidth: 1, 
        borderColor: 'gray', 
      }
    }),
    marginRight: 15
  },
  Textin: {
    width: "75%",
    backgroundColor: "yellow",
    height: "5%",
    borderRadius: 5,
    marginBottom: 30,
  },
  ModalContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 20
  },
  ModalBackground: {
    margin: 20, 
    backgroundColor: '#2f3b52', 
    borderRadius: 20, 
    padding: 35, 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: {width: 0, height: 2}, 
    shadowOpacity: 0.25, 
    shadowRadius: 4, 
    elevation: 5
  }
});
