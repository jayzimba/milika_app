import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
  Entypo,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import Header from "@/components/Header";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Picker } from "@react-native-picker/picker";
import { useMemo } from "react";
import * as SQLite from "expo-sqlite";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const [cough, setCough] = useState("0");
  const [fever, setFever] = useState("0");
  const [breath, setBreathingDifficulty] = useState("0");
  const [loading, setLoading] = useState(false);
  const [ChildData, setChildData] = useState([]);
  const [child, setChild] = useState({});
  // Memoize snap points
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  // Reference for BottomSheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Initialize database
  const initializeDatabase = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("childApp.db");

      // Check if any records exist
      const fetchedRecords = await db.getAllAsync("SELECT * FROM children");
      if (fetchedRecords.length > 0) {
        setChildData(fetchedRecords);
        setChild(fetchedRecords[0]);
      }
    } catch (error) {
      console.error("Database initialization error:", error);
    }
  };

  useEffect(() => {
    initializeDatabase();
  }, [ChildData]);

  // Show BottomSheet
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // Hide BottomSheet
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
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

  const RecordVitals = () => {
    setLoading(true);
    // Simulate API call to save vitals
    setTimeout(() => {
      setLoading(false);
      handleCloseModalPress();
      Alert.alert(`Vitals recorded successfully!`);
    }, 2000);
  };
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
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Gradient Section */}
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["red", "orange", "yellow"]}
            style={styles.gradientSection}
          >
            <Text style={styles.gradientText}>{child.fullName}'s Vitals</Text>
            <View style={styles.gradientContent}>
              <View style={styles.readings}>
                <Text style={{ color: Colors.light.white }}>
                  Fever: {fever}°C
                </Text>
                <Text style={{ color: Colors.light.white }}>
                  Cough: {cough == "0" ? "No" : "Yes"}
                </Text>
                <Text style={{ color: Colors.light.white }}>
                  Shortness of Breath: {breath == "0" ? "No" : "Yes"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handlePresentModalPress}
                style={styles.addButton}
              >
                <FontAwesome5 name="plus" size={20} color="purple" />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Reminders Section */}
          <View style={styles.remindersSection}>
            <Text style={styles.sectionTitle}>
              <AntDesign name="bells" size={16} color="black" /> Reminders
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.reminderList}
            >
              {reminders.map((reminder) => (
                <View key={reminder.id} style={styles.reminderItem}>
                  <TouchableOpacity
                    style={[
                      styles.reminderCard,
                      { backgroundColor: reminder.color },
                    ]}
                  >
                    {reminder.icon}
                  </TouchableOpacity>
                  <Text style={styles.reminderLabel}>{reminder.label}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Next Appointment Section */}
          <View>
            <Text style={styles.sectionTitle}>Next Appointment</Text>
            <View style={styles.appointmentCard}>
              <View>
                <Text style={{ color: Colors.light.icon }}>
                  Date: March 15, 2022
                </Text>
                <Text style={{ color: Colors.light.icon }}>Time: 09:00 AM</Text>
              </View>
              <Text style={{ color: "black" }}>Doctor: Dr. John Doe</Text>
            </View>
          </View>

          {/* Bar Chart Section */}
          <View>
            <Text style={styles.sectionTitle}>Daily Severity Report</Text>
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

        {/* BottomSheet */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          index={0}
          backgroundStyle={styles.bottomSheetBackground}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.sheetContent}>Add Vitals readings</Text>
              <TouchableOpacity onPress={handleCloseModalPress}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>

            <View style={{ gap: 5, marginTop: 25 }}>
              <View>
                <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                  Temperature (°C)
                </Text>
                <TextInput
                  placeholder="37.5"
                  keyboardType="numeric"
                  onChangeText={(fever) => setFever(fever)}
                  style={{
                    padding: 10,
                    borderWidth: 0.5,
                    borderColor: "gray",
                    borderRadius: 5,
                    marginBottom: 20,
                    color: "grey",
                  }}
                />
              </View>
              <View>
                <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                  Any Cough
                </Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={cough}
                    onValueChange={(value) => setCough(value)}
                    style={styles.picker}
                    itemStyle={{
                      color: "black",
                      fontSize: 14,
                    }}
                  >
                    <Picker.Item label="No" value="0" />
                    <Picker.Item label="Yes" value="1" />
                  </Picker>
                  {/* Dropdown arrow for iOS */}
                  {Platform.OS === "ios" && (
                    <Ionicons
                      name="chevron-down"
                      size={20}
                      color="#000"
                      style={styles.dropdownIcon}
                    />
                  )}
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                  Shortness of Breath
                </Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={breath}
                    onValueChange={(value) => setBreathingDifficulty(value)}
                    style={styles.picker}
                    itemStyle={{
                      color: "black",
                      fontSize: 14,
                    }}
                  >
                    <Picker.Item label="No" value="0" />
                    <Picker.Item label="Yes" value="1" />
                  </Picker>
                  {/* Dropdown arrow for iOS */}
                  {Platform.OS === "ios" && (
                    <Ionicons
                      name="chevron-down"
                      size={20}
                      color="#000"
                      style={styles.dropdownIcon}
                    />
                  )}
                </View>
              </View>
            </View>

            <View style={{ marginTop: 50, alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "purple",
                  paddingVertical: 20,
                  width: "90%",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={RecordVitals}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Record Vitals
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "white",
    flex: 1,
    paddingVertical: 10,
  },
  gradientSection: {
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
  gradientText: { color: "white", fontWeight: "bold" },
  gradientContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  readings: { marginTop: 15, gap: 5 },
  addButton: {
    borderRadius: 90,
    padding: 10,
    width: 50,
    height: 50,
    backgroundColor: "white",
    elevation: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: "center",
    alignItems: "center",
  },
  remindersSection: { marginBottom: 30, paddingEnd: 20 },
  sectionTitle: { marginStart: 20, fontWeight: "bold", marginBottom: 10 },
  reminderList: { marginVertical: 10, marginStart: 20 },
  reminderItem: { alignItems: "center", gap: 5 },
  reminderCard: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  reminderLabel: {
    color: Colors.light.text,
    fontSize: 12,
    fontWeight: "300",
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
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bottomSheetBackground: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 }, // Shadow at the top of the BottomSheet
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  sheetContent: {
    fontSize: 16,
    fontWeight: "bold",
    color: "purple",
  },
  closeButton: {
    color: "blue",
    fontSize: 14,
  },
  pickerContainer: {
    position: "relative",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    flexDirection: "row", // To position the dropdown arrow properly
    alignItems: "center", // Vertically align Picker in the container
    paddingHorizontal: 10, // Add some padding for spacing
  },
  picker: {
    flex: 1, // Allow Picker to take up available space
    color: "black",
    fontSize: 14,
  },
  dropdownIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
});
