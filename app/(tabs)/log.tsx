import Header from "@/components/Header";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function LogScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <Header />
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ paddingVertical: 20 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 20 }}>
            How is your child performing today?
          </Text>

          <View>
            <Text
              style={{
                fontSize: 12,
                color: Colors.light.icon,
                fontWeight: "400",
              }}
            >
              
              Complete the form below to get predictions and recommendations for
              your child.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 23,
    marginStart: 10,
  },
  appointmentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 7,
    backgroundColor: "white",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    borderRadius: 10,
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 20,
  },
});
