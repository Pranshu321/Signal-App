import { StyleSheet, Text, View } from 'react-native'
import React , {useEffect , useState}from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase'

const CustomListItem = ({id , chatname , enterchat}) => {
    const [chatmessage , setchatmessage] = useState([]);

    useEffect(()=>{
        const unsubscribe = db.collection('chats').doc(id).collection('messages').orderBy('timestamp' , 'desc').onSnapshot(snapshot=>{
            setchatmessage(snapshot.docs.map(doc=>doc.data()));
        });
        return unsubscribe;
      })
    return (
        <ListItem key={id} bottomDivider onPress={()=>enterchat(id , chatname)}>
            <Avatar
                rounded
                source={{uri:  chatmessage?.[0]?.photoURL || "https://media.istockphoto.com/vectors/happy-young-woman-watching-into-rounded-frame-isolated-on-white-3d-vector-id1296058958?k=20&m=1296058958&s=612x612&w=0&h=AsZaq2ZGD4rIyr7vCuc7NXuAz7954D8wYW93siKAHA4=" }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatname}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                 {chatmessage?.[0]?.displayName} : {chatmessage?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
}

export default CustomListItem

const styles = StyleSheet.create({})