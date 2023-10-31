import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from "expo-status-bar";
import Home from './screens/home'
import CreateNewSubject from './screens/CreateNewSubject'
import Subject from './screens/subject';
import CreateNewFlashcard from './screens/CreateNewFlashcard';
import Learn from './screens/learn';
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FlipCard from "react-native-flip-card";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateNewSubject" component={CreateNewSubject} />
        <Stack.Screen name="Subject" component={Subject} />
        <Stack.Screen name="CreateNewFlashcard" component={CreateNewFlashcard} />
        <Stack.Screen name="Learn" component={Learn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


