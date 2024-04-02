import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Image
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from 'firebase/firestore'



const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("")

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home")
      }
    })
      

    return () => unsubscribe();
  }, []);

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const handleAuth = () => {
    if (isSignIn) {
      handleSignIn();
    } else {
      handleSignUp();
    }
  };

  const handleSignUp   = async () => {

    if (password !== confirmPassword) {
      setError("Passwords do not match, please try again");
      return;
    }

    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // console.log(userCredential.user.uid, 'here')
        // console.log(userCredential, 'userCred')
        
         const docRef = await setDoc(doc(db, "users", userCredential.user.uid), {
             email: userCredential.user.email,
             displayName: username,
             photoURL: ''
         })
    
         setEmail("");
         setPassword("");
         setConfirmPassword("");
         setUsername("");
         setError("");
       }

     catch(error) {
       setError("Error signing up or adding document: " + error.message);
     };
 }
  


  const handleSignIn = () => {

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setEmail("");
        setPassword("");
        setError("");
        setUsername("")
        // console.log(result.user, 'res.user')
      })
      .catch((error) => {
        setError("Error signing in: " + error.message);
      });
  };



  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully!");
      })
      .catch((error) => {
        setError("Error signing out: " + error.message);
      });
  };


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
   
   <Image source={require('../logo.png')} style={styles.logo} />

      <View style={styles.buttonContainer}>
      {user ? (
      <Pressable
        onPress={handleSignOut}
        style={[styles.button, styles.signOutButton]}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
        
      </Pressable>
    ) : (
      <>
        <View style={styles.inputContainer}>
          {!isSignIn && (
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={styles.input}
            />
          )}

              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />

              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                secureTextEntry
              />

              {!isSignIn && (
                <TextInput
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                  style={styles.input}
                  secureTextEntry
                />
              )}

            </View>

            <Pressable onPress={handleAuth} style={styles.button}>
              <Text style={styles.buttonText}>
                {isSignIn ? "Login" : "Register"}
              </Text>
            </Pressable>

            <Pressable
              onPress={toggleSignIn}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>
                {isSignIn ? "Switch to Register" : "Switch to Login"}
              </Text>
            </Pressable>

        
          </>
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F6EC'
  },
  inputContainer: {
    width: '100%',
    marginBottom:20,
    marginTop: 0
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: '#556C2F', // Set border color for input
    borderWidth: 2, // Set border width for input
    
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#C49F5A',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10, // Adjust spacing between buttons
    borderColor: '#C49F5A', // Border color for login button
    borderWidth: 2, // Border width for login button
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
    fontFamily: 'Poppins', // Set font family to Poppins
    
  },
  buttonOutline: {
    backgroundColor: '#556C2F', // Background color for register button
    borderColor: '#556C2F', // Border color for register button
  },
  buttonOutlineText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
    fontFamily: 'Poppins', // Set font family to Poppins
  },
  logo: {
    width: 400,
    height: 150,
    marginBottom: 15,
  },
});

export default Login;