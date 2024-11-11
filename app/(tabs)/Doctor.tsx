import Header from "@/components/Header";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";

export default function DoctorScreen() {
  const [doctorName, setDoctorName] = useState("");
  const [doctorNumber, setDoctorNumber] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <Header />
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ paddingVertical: 20 }}>

          <Text style={{ fontWeight: "bold", marginBottom: 20 }}>
            Do you want to onboard a personal doctor?
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

          {/* input section goes here */}
          <View>

            {/* doctor's name inout */}
            <View
              style={{
                borderRadius: 10,
                borderWidth: 0.2,
                borderColor: Colors.light.icon,
                padding: 10,
                marginBottom: 20,
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
                <Text
                  style={{ fontWeight: "300", fontSize: 12, color: "purple" }}
                >
                  Doctor Name
                </Text>
              </View>
              <TextInput
                value={doctorName}
                onChangeText={setDoctorName}
                selectionColor={"purple"}
                style={{
                  marginStart: 15,
                  fontSize: 16,
                }}
              />
            </View>

            {/* doctor's phone number inout */}
            <View
              style={{
                borderRadius: 10,
                borderWidth: 0.2,
                borderColor: Colors.light.icon,
                padding: 10,
                marginBottom: 20,
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
                <FontAwesome6 name="phone" size={18} color="black" />
                <Text
                  style={{ fontWeight: "300", fontSize: 12, color: "purple" }}
                >
                  Phone number
                </Text>
              </View>
              <TextInput
                value={doctorNumber}
                onChangeText={setDoctorNumber}
                selectionColor={"purple"}
                keyboardType="phone-pad"
                style={{
                  marginStart: 15,
                  fontSize: 16,
                }}
              />
            </View>

            {/* doctor's email input */}
            <View
              style={{
                borderRadius: 10,
                borderWidth: 0.2,
                borderColor: Colors.light.icon,
                padding: 10,
                marginBottom: 20,
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
                <Fontisto name="email" size={18} color="black" />
                <Text
                  style={{ fontWeight: "300", fontSize: 12, color: "purple" }}
                >
                  Doctor Email
                </Text>
              </View>
              <TextInput
                value={email}
                onChangeText={setEmail}
                selectionColor={"purple"}
                keyboardType="default"
                style={{
                  marginStart: 15,
                  fontSize: 16,
                }}
              />
            </View>

            {/* doctor's hospital input */}
            <View
              style={{
                borderRadius: 10,
                borderWidth: 0.2,
                borderColor: Colors.light.icon,
                padding: 10,
                marginBottom: 10,
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
                <FontAwesome5 name="hospital" size={18} color="black" />
                <Text
                  style={{ fontWeight: "300", fontSize: 12, color: "purple" }}
                >
                  Hospital Name
                </Text>
              </View>
              <TextInput
                value={hospitalName}
                onChangeText={setHospitalName}
                selectionColor={"purple"}
                keyboardType="default"
                style={{
                  marginStart: 15,
                  fontSize: 16,
                }}
              />
            </View>

          </View>

          {/* inputs end here */}

          <TouchableOpacity
            style={{
              borderRadius: 10,
              borderWidth: 0.2,
              backgroundColor: "purple",
              padding: 15,
              marginVertical: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setLoading((e) => !e)}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              OnBoard Doctor
            </Text>
          </TouchableOpacity>

          {loading && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size={"large"} color={"purple"} />
              <Text
                style={{
                  color: Colors.light.icon,
                  marginTop: 10,
                  fontSize: 12,
                }}
              >
                Loading
              </Text>
            </View>
          )}
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
