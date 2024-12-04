import React, { useCallback, useRef } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import {
  Ionicons,
  AntDesign,
  FontAwesome5,
  Entypo,
  FontAwesome6,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import Header from "@/components/Header";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

export default function HomeScreen() {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const getColor = (value: number) => {
    if (value < 20) return "yellow";
    else if (value >= 25 && value < 35) return "orange";
    else return "red";
  };

  const barData = [
    { value: 22, label: "M" },
    { value: 32, label: "T" },
    { value: 27, label: "W" },
    { value: 34, label: "T" },
    { value: 27, label: "F" },
    { value: 38, label: "S" },
    { value: 30, label: "S" },
  ].map((item) => ({
    ...item,
    frontColor: getColor(item.value),
  }));

  const reminders = [
    {
      id: 1,
      icon: <FontAwesome6 name="pump-medical" size={24} color="white" />,
      label: "Medicine",
      color: "red",
    },
    {
      id: 2,
      icon: <AntDesign name="rest" size={24} color="white" />,
      label: "Rest",
      color: "purple",
    },
    {
      id: 3,
      icon: <MaterialIcons name="local-drink" size={24} color="white" />,
      label: "Hydrate",
      color: "green",
    },
    {
      id: 4,
      icon: <MaterialIcons name="sports-gymnastics" size={24} color="white" />,
      label: "Exercise",
      color: "orange",
    },
    {
      id: 5,
      icon: <Entypo name="water" size={24} color="white" />,
      label: "Hydrate",
      color: "blue",
    },
    {
      id: 6,
      icon: <Fontisto name="doctor" size={24} color="white" />,
      label: "Doctor",
      color: "brown",
    },
  ];

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 10,
        backgroundColor: "white",
        flex: 1,
        paddingVertical: 10,
      }}
    >
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Gradient Section */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["red", "orange", "yellow"]}
          style={styles.gradientSection}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Last Readings
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ marginTop: 15, gap: 5 }}>
              <Text style={{ color: Colors.light.white }}>Fever: 37.5°C</Text>
              <Text style={{ color: Colors.light.white }}>Cough: Yes</Text>
              <Text style={{ color: Colors.light.white }}>
                Shortness of Breath: No
              </Text>
            </View>

            <View>
              <TouchableOpacity style={styles.addButton}>
                <FontAwesome5 name="plus" size={20} color="purple" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Reminders Section */}
        <View style={{ marginBottom: 30, paddingEnd: 20 }}>
          <Text
            style={{ marginStart: 20, fontWeight: "bold", marginBottom: 10 }}
          >
            <AntDesign name="bells" size={16} color="black" /> Reminders
          </Text>

          <ScrollView
            horizontal
            style={{ marginVertical: 10, marginStart: 20 }}
            showsHorizontalScrollIndicator={false}
          >
            {reminders.map((reminder) => (
              <View key={reminder.id} style={{ alignItems: "center", gap: 5 }}>
                <TouchableOpacity
                  style={[
                    styles.reminderCard,
                    { backgroundColor: reminder.color },
                  ]}
                >
                  {reminder.icon}
                </TouchableOpacity>
                <Text
                  style={{
                    color: Colors.light.text,
                    fontSize: 12,
                    fontWeight: "300",
                  }}
                >
                  {reminder.label}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Next Appointment Section */}
        <View>
          <Text
            style={{ marginStart: 20, fontWeight: "bold", marginBottom: 20 }}
          >
            Next Appointment
          </Text>
          <View style={styles.appointmentCard}>
            <View style={{ gap: 10 }}>
              <Text style={{ color: Colors.light.icon }}>
                Date: March 15, 2022
              </Text>
              <Text style={{ color: Colors.light.icon }}>Time: 09:00 AM</Text>
            </View>
            <Text style={{ color: "black" }}>Doctor: Dr. John Doe</Text>
          </View>
        </View>

        {/* Bar Chart Section */}
        <View style={{ flex: 1 }}>
          <View style={{ marginVertical: 10, marginStart: 20 }}>
            <Text style={{ fontWeight: "bold" }}>Daily Severity Report</Text>
          </View>
          <BarChart
            horizontal
            barWidth={18}
            barBorderRadius={5}
            frontColor="lightgray"
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
            maxValue={50}
            stepValue={10}
            showValuesAsTopLabel
            stepHeight={65}
            barBorderWidth={0}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    gap: 8,
    marginStart: 10,
    marginTop: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "purple",
  },
  subText: {
    fontSize: 12,
    color: "#687076",
  },
  gradientSection: {
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: Colors.light.primary,
    margin: 10,
    borderRadius: 20,
    marginVertical: 20,
    elevation: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButton: {
    borderRadius: 100,
    padding: 20,
    borderWidth: 0.6,
    borderColor: "white",
    backgroundColor: "white",
    elevation: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  reminderCard: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 10,
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
