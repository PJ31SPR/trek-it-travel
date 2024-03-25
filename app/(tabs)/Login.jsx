import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
   
    const handleSignUp = () => {
       
        createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
        
          setEmail("");
          setPassword("");
          setError("");
    
        //   setTimeout(() => {
        //     setSuccessMessage("");
        //   }, 3000);
        })
        .catch((error) => {
          setError("Error signing up: " + error.message);
        });
    

    }

    
    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.inputContainer}>
            <TextInput placeholder='Email'
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input} />

            <TextInput placeholder='Password'
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry />
        </View>

        <View style={styles.buttonContainer}>
            <Pressable
                onPress={() => {}} //  login functionality 
                style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            <Pressable onPress={handleSignUp}
                style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Register</Text>
            </Pressable>
        </View>
    </KeyboardAvoidingView>
);
    }


const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
inputContainer: {
    width: '80%'
},
input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
},
buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
},
button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
},
buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
},
buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
},
buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
},
});

export default Login;