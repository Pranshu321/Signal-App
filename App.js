import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import AddChat from './screens/AddChat';
import ChatsScreen from './screens/ChatsScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  const globalScreens= {
    headerStyle: {backgroundColor: "#356EEB"},
    headerTitleStyle: {color: "white"},
    headerTintColor: "white",
  }
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Login' screenOptions={globalScreens}>
      <Stack.Screen 
      name='Login' 
      component={Login} 
      options={
        {
          headerTitleAlign: "center"
        }
      }
      />
      <Stack.Screen 
      name='Register' 
      component={Register} 
      options={
        {
          headerTitleAlign: "center"
        }
      }
      />
      <Stack.Screen 
      name='Home' 
      component={Home} 
      options={
        {
          headerTitleAlign: "center"
        }
      }
      />
      <Stack.Screen 
      name='AddChat' 
      component={AddChat} 
      options={
        {
          headerTitleAlign: "center"
        }
      }
      />
      <Stack.Screen 
        name='Chat'
        component={ChatsScreen}
        options={
          {
            headerTitleAlign: "center"
          }
        }
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
