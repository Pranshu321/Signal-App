import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase';

const AddChat = ({ navigation }) => {
    const auth = getAuth();
    const [input, setinput] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new Chat',
            headerBackTitle: "Chats",
        })
    }, [navigation]);

    const createChat = async () => {
        await db.collection("chats").add({
            ChatName: input
        }).then(()=>{
            Alert.alert(`${input} Chat Added`)
            navigation.goBack();
        }).catch((err)=>{
            alert(err);
        })
    }
    return (
        <View style={styles.container}>
            <Input value={input} onChangeText={(e) => setinput(e)} placeholder='Enter a Chat Name'
                leftIcon={
                    <Icon name='wechat' type="antdesign" size={24} color={"black"} />
                }
            />
            <Button onPress={createChat} title={"Create a new Chat"} />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      padding: 30,
      height: '100%'
    },
})