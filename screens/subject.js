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
  const [currentSubject, setCurrentSubject] = useState("");
  useEffect(() => {
    setCurrentSubject(route.params?.subject);
  }, [route.params?.subject]);

  const onDeletePress = () => {
    const subjectToDelete = realm
      .objects("subject")
      .filtered(`name == "${currentSubject}"`);
    realm.write(() => {
      realm.delete(subjectToDelete);
    });
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subjectText}>{currentSubject}</Text>
      <TouchableOpacity
        style={styles.subjectPageButton}
        onPress={() => navigation.navigate("CreateNewFlashcard", { subject: currentSubject })}
      >
        <Text style={styles.buttonText}>Create Flashcards</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.subjectPageButton}
        onPress={() => navigation.navigate("Learn", { subject: currentSubject })}
      >
        <Text style={styles.buttonText}>Learn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.subjectPageButton}
      >
        <Text style={styles.buttonText}>Test</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.subjectPageButton}
        onPress={() => {
          onDeletePress();
        }}
      >
        <Text style={styles.buttonText}>Delete Subject</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#332514",
    alignItems: "center",
    justifyContent: "center",
  },
  subjectPageButton: {
    width: "50%",
    height: 100,
    backgroundColor: "#be1558",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 10,
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
  buttonText: {
    fontSize: 20,
    color: "#fbcbc9",
    fontStyle: "italic",
    fontWeight: "700",
  },
  subjectText:{
    fontSize: 30,
    color: "#fbcbc9",
    fontStyle: "italic",
    fontWeight: "700",
  }
});
export default SubjectScreen;
