import { StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Input, Button, Text } from 'react-native-elements';
import {auth} from '../firebase';
import { updateProfile, createUserWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native';

const Register = ({ navigation }) => {
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [imageurl, setimageurl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
        });
    }, [navigation])

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: imageurl || "https://media.istockphoto.com/photos/portrait-of-smiling-bearded-businessman-3d-illustration-of-cartoon-picture-id1222755058?k=20&m=1222755058&s=612x612&w=0&h=kEFw2Zm2H5EvP5ukr3Vs32VAoRunMvYY1ytYtLR8zds="
                }).then(() => {
                    console.log("Profile Updated");
                }).catch((err) => {
                    console.log(err);
                });
                navigation.navigate("Login");
                Alert.alert("Successfully Registered");
               
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert(errorMessage);
                // ..
            });
    }

    return (
        <View style={styles.Container}>
            <Text h3 style={{ marginBottom: 50 }}>Create a Signal Account</Text>
            <View style={styles.inputContainer}>
                <Input placeholder='Full Name' value={name} onChangeText={(e) => {
                    setname(e);
                }} autoFocus type='text' />

                <Input placeholder='Email' value={email} onChangeText={(e) => {
                    setemail(e);
                }} type='email' />

                <Input placeholder='Password' value={password} onChangeText={(e) => {
                    setpassword(e);
                }} secureTextEntry type='text' />

                <Input placeholder='Profile Image url  {optional}' value={imageurl} onChangeText={(e) => {
                    setimageurl(e);
                }} type='text'
                    onSubmitEditing={register}
                />
            </View>
            <Button containerStyle={styles.button} title="Register" onPress={register} raised />
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    Container: {
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
    },
});