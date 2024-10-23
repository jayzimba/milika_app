import Header from "@/components/Header";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function DoctorScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <Header />
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ paddingVertical: 20 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 20 }}>
            Do want to registered your personal doctor?
          </Text>

          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 12,
                color: Colors.light.icon,
                fontWeight: "400",
              }}
            >
              Your doctor will receive all the symptoms you log on the app via
              email, this will allow him to give you quick response based on the
              case recorded.
            </Text>
            <Text
              style={{ fontWeight: "bold", marginBottom: 20, marginTop: 10 }}
            >
              To continue you have to update this form records.
            </Text>
          </View>

          <View>
            <View
              style={{
                borderRadius: 10,
                borderWidth: 0.2,
                borderColor: Colors.light.icon,
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  marginBottom: 7,
                }}
              >
                <FontAwesome6 name="user-doctor" size={18} color="black" />
                <Text style={{ fontWeight: "300", fontSize: 12 }}>
                  Doctor Name
                </Text>
              </View>
              <TextInput />
            </View>
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
