import React, { useEffect, useState } from "react";
import realm from "../realmConfig";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SubjectScreen = ({ navigation }) => {
  const route = useRoute();
  const [currentSubject, setCurrentSubject] = useState('');
  useEffect(() => {
    setCurrentSubject(route.params?.subject);
    
  }, [route.params?.subject]);

  const onDeletePress = () => {
    const subjectToDelete = realm.objects('subject').filtered(`name == "${currentSubject}"`);
    realm.write(() => {
        realm.delete(subjectToDelete);
      });
    navigation.navigate("Home");
  }

  return (
    <View styles={styles.container}>
      <Text>{currentSubject}</Text>
      <TouchableOpacity style={styles.homePageButton}
      onPress={() => {onDeletePress()}}>
        <Text style={styles.homePageButtonText}>Delete Subject</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbcbc9",
    alignItems: "center",
    justifyContent: "center",
  },
  homePageButton: {
    width: "50%",
    height: 100,
    backgroundColor: "#332514",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 25,
  },
  scrollButton: {
    width: "100%",
    height: 100,
    backgroundColor: "#be1558",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 35,
  },
  homePageButtonText: {
    fontSize: 20,
    color: "#fbcbc9",
    fontStyle: "italic",
    fontWeight: "700",
  },
  
});
export default SubjectScreen;
