import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("")


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

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

  const handleSignUp   = () => {

    if (password !== confirmPassword) {
        setError("Passwords do not match, please try again");
        return;
      }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setSuccessMessage("User created successfully!");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        setUsername("")

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        setError("Error signing up: " + error.message);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setUsername("")
      });
  };

  const handleSignIn = () => {

    if (password !== confirmPassword) {
      setError("Passwords do not match, please try again");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        result.user.displayName = username
        console.log(result.user, 'res.user')
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        setUsername("")
        console.log(result.user, 'res.user')
      })
      .catch((error) => {
        setError("Error signing in: " + error.message);
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in with Google:", result.user);
      })
      .catch((error) => {
        setError("Error signing in with Google: " + error.message);
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
   

   <h1 style={styles.title}> Welcome to Trek-it!</h1>

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

              <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                style={styles.input}
                secureTextEntry
              />

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

            <Pressable
              onPress={handleGoogleSignIn}
              style={[styles.button, styles.googleButton]}
            >
              <Text style={styles.buttonText}>Sign in with Google</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#F4E5C2',
    
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#BAD8B6",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonOutline: {
    backgroundColor: "white",
    borderColor: "#BAD8B6",
    borderWidth: 2,
  },
  buttonText: {
    color: "#272343",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  buttonOutlineText: {
    color: "#01352C",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  successText: {
    color: "green",
    marginTop: 10,
    textAlign: "center",
  },
  googleButton: {
    marginTop: 50,
    backgroundColor: "#BAD8B6",
  },
  title: {
    color: "#01352C",
    fontWeight: 700,

  }
});

export default Login;