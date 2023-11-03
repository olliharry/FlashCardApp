import React, { useState, useEffect } from "react";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import FlipCard from "react-native-flip-card";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import realm from "../realmConfig";

const LearnScreen = ({ navigation }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const route = useRoute();
  const currentSubjectDB = realm
    .objects("subject")
    .filtered(`name == "${route.params?.subject}"`);

  const onChangeCardPress = (direction) => {
    if (direction==1) {
      if ((cardIndex+1) > currentSubjectDB[0].cardFront.length-1){
        alert("No more cards!");
        return;
      }
      setCardIndex(cardIndex+1);
    } else {
      if((cardIndex-1) < 0 ){
        alert('No previous card!');
        return;
      }
      setCardIndex(cardIndex-1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 200 }}>
        <FlipCard style={{ width: 300 }} flipHorizontal={true} friction={5}>
          <View style={[styles.card, styles.front]}>
            <Text style={styles.frontText}>
              {currentSubjectDB[0].cardFront[cardIndex]}
            </Text>
          </View>
          <View style={[styles.card, styles.back]}>
            <Text style={styles.backText}>
              {currentSubjectDB[0].cardBack[cardIndex]}
            </Text>
          </View>
        </FlipCard>
      </View>
      <View style={styles.prevNextContainer}>
        <TouchableOpacity
          style={styles.navigateCardButton}
          onPress={() => {onChangeCardPress(0)}}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigateCardButton}
          onPress={() => {onChangeCardPress(1)}}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
  navigateCardButton: {
    width: "25%",
    height: 50,
    backgroundColor: "#be1558",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 20,
  },
  saveButtonText: {
    fontSize: 20,
    color: "#fbcbc9",
    fontStyle: "italic",
    fontWeight: "700",
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  back: {
    backgroundColor: "#332514",
  },
  front: {
    backgroundColor: "#e75874",
  },
  backText: {
    fontSize: 15,
    color: "#fbcbc9",
    fontStyle: "italic",
    fontWeight: "500",
  },
  frontText: {
    fontSize: 25,
    color: "#fbcbc9",
    fontStyle: "italic",
    fontWeight: "700",
  },
  buttonText: {
    fontSize: 20,
    color: "#fbcbc9",
    fontStyle: "italic",
    fontWeight: "700",
  },
  prevNextContainer: {
    flexDirection: "row",
  },
});

export default LearnScreen;
