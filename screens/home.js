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

const HomeScreen = ({ navigation }) => {
  var subjectsDB = realm.objects("subject");
  const [subjectNamesDB, setSubjectNamesDB] = useState(
    subjectsDB.map((subjectDB) => subjectDB.name)
  );

  const addSubject = (newSubject) => {
    if (!subjectNamesDB.includes(newSubject)) {
      realm.write(() => {
        realm.create("subject", {
          name: newSubject,
        });
      });
      setSubjectNamesDB(subjectsDB.map((subjectDB) => subjectDB.name));
    } else {
      alert("Cannot add duplicate subjects.");
    }
  };

  const route = useRoute();
  useEffect(() => {
    const paramValue = route.params?.newSubjectInput;
    if (paramValue != undefined && paramValue != "") {
      addSubject(paramValue);
    }
    console.log("Parameter changed to:", paramValue);
  }, [route.params?.newSubjectInput]);

  useFocusEffect(
    React.useCallback(() => {
      setSubjectNamesDB(subjectsDB.map((subjectDB) => subjectDB.name));
    }, [])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.homePageButton}
        onPress={() => navigation.navigate("CreateNewSubject")}
      >
        <Text style={styles.homePageButtonText}>Create New Subject</Text>
      </TouchableOpacity>
      <View style={styles.subjectList}>
        <ScrollView style={{ width: "100%" }}>
          {subjectNamesDB.map((title, indexedDB) => (
            <TouchableOpacity
              key={indexedDB}
              style={styles.scrollButton}
              onPress={() => navigation.navigate("Subject", { subject: title })}
            >
              <Text style={styles.homePageButtonText}>{title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
  subjectList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
export default HomeScreen;
