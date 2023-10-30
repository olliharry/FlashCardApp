import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Screen2 = ({ navigation }) => {
  const [subjectInput, setSubjectInput] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => setSubjectInput(text)}
        placeholder="Subject Name"
        maxLength={15}
        fontSize={20}
      />
      <TouchableOpacity style={styles.saveButton}>
        <Text
          style={styles.saveButtonText}
          onPress={() => navigation.navigate("Home", { newSubjectInput: subjectInput })}
        >
          Create Subject
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbcbc9",
  },
  saveButton: {
    width: "50%",
    height: 100,
    backgroundColor: "#be1558",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 25,
  },
  saveButtonText: {
    fontSize: 20,
    color: "#fbcbc9",
    fontStyle: "italic",
    fontWeight: "700",
  },
});

export default Screen2;
