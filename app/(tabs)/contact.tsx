import { Image, StyleSheet, Platform, View, Text, SafeAreaView } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ContactScreen() {
  return (
    <SafeAreaView style={{paddingHorizontal: 10}}>
      
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText:{
    fontWeight:'bold',
    fontSize: 23,
    marginStart: 10
  }
});
