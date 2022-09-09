import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { getAuth} from 'firebase/auth';
import CustomListItem from '../components/CustomListItem';
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import {AntDesign , SimpleLineIcons} from '@expo/vector-icons'
import { db } from '../firebase';
const Home = ({ navigation }) => {
  const auth = getAuth();
  const [Chats , setChats] = useState([]);
  useEffect(()=>{
    const unsubscribe = db.collection('chats').onSnapshot(snapshot=>{
      setChats(snapshot.docs.map(doc=>({
        id: doc.id,
        data: doc.data()
      })))
    })

    return unsubscribe;
  },[])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={()=>{
            auth.signOut().then(()=>{
              navigation.replace("Login");
            }).catch((err)=>{
              console.log("error");
            })
          }} >
            <Avatar
              rounded
              source={{ uri: auth?.currentUser?.photoURL }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: ()=>(
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 80,
          marginRight: 20,
        }}>
        <TouchableOpacity activeOpacity={0.5}>
         <AntDesign name='camerao' size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
         <SimpleLineIcons onPress={()=>{
          navigation.navigate("AddChat")
         }} name='pencil' size={24} style={{marginLeft: 20}} color="black" />
        </TouchableOpacity>
        </View>
      )
    });
  }, [navigation]);

  const enterchat = (id,chatname)=>{
     navigation.navigate("Chat" , {
      id,
      chatname
     });
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
       {
         Chats.map(({id , data: {ChatName}})=> (
           <CustomListItem id={id} key={id} chatname={ChatName} enterchat={enterchat} />
         ))
       }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
     height: "100%",
  }
})