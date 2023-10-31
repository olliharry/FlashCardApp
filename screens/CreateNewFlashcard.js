import React, { useEffect, useState } from "react";
import realm from "../realmConfig";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CreateNewFlashcardScreen = ({ navigation }) => {
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");

  const route = useRoute();

  var currentSubjectDB;
  useEffect(() => {
    currentSubjectDB = realm
      .objects("subject")
      .filtered(`name == "${route.params?.subject}"`);
  }, [route.params?.subject]);

  const validFlashcard = (frontText, backText) => {
    if (frontText != "" && backText != "") {
      return true;
    } else {
      return false;
    }
  };

  const onCreateFlashcardPress = () => {
    currentSubjectDB = realm
      .objects("subject")
      .filtered(`name == "${route.params?.subject}"`);
    if (validFlashcard(frontText, backText)) {
      realm.write(() => {
        currentSubjectDB[0].cardFront.push(frontText);
        currentSubjectDB[0].cardBack.push(backText);
      });
      console.log(currentSubjectDB[0]);
      setBackText("");
      setFrontText("");
      alert("Flashcard Created");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Text for card front"
        onChangeText={(text) => setFrontText(text)}
        style={styles.frontTextBox}
        maxLength={15}
        value={frontText}
      />
      <TextInput
        placeholder="Text for card back"
        onChangeText={(text) => setBackText(text)}
        style={styles.backTextBox}
        maxLength={50}
        multiline={true}
        value={backText}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onCreateFlashcardPress();
        }}
      >
        <Text style={styles.buttonText}>Create Flashcard</Text>
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
  button: {
    width: "45%",
    height: 75,
    backgroundColor: "#be1558",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#fbcbc9",
    fontStyle: "italic",
    fontWeight: "700",
  },
  frontTextBox: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "50%",
    textAlign: "center",
    marginBottom: 20,
  },
  backTextBox: {
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "80%",
    textAlign: "center",
    marginBottom: 20,
  },
});
export default CreateNewFlashcardScreen;
