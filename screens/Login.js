import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input, Button } from 'react-native-elements';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase'

const Login = ({ navigation }) => {
    const [email, setemail] = useState("");
    const [passowrd, setpassword] = useState("");
    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.navigate("Home");
            }
        });

        return unsuscribe;
    }, [navigation]);

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, passowrd)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user.photoURL);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZYYNf7fZBA3qmBeYMAj1-QiJqjb3d61A4pzXJxgVr8_rW5sQLb8ZM4-uvb7Thn6gPHfk&usqp=CAU" }}
                style={{ width: 300, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input placeholder='Email' value={email} onChangeText={(e) => setemail(e)} autofocus type="email" />
                <Input placeholder='Password' value={passowrd} onChangeText={(e) => { setpassword(e) }} secureTextEntry type="password" />
                <Button containerStyle={styles.button} onPress={signIn} title="Login" />
                <Button containerStyle={[styles.button, { marginTop: 10 }]} type="outline" onPress={() => navigation.navigate("Register")} title='Register' />
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 300,
        marginTop: 10,
        borderRadius: 8
    }
})