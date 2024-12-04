import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useRouter } from "expo-router";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [healthCondition, setHealthCondition] = useState("");
  const [children, setChildren] = useState([]);
  const router = useRouter();

  // Initialize database
  const initializeDatabase = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("childApp.db");

      console.log("Database instance:", db);

      // Create table if it doesn't exist
      await db.execAsync(`
                          CREATE TABLE IF NOT EXISTS children (
                            id INTEGER PRIMARY KEY AUTOINCREMENT, 
                            fullName TEXT NOT NULL, 
                            dob TEXT NOT NULL, 
                            age INTEGER NOT NULL, 
                            healthCondition TEXT NOT NULL
                          );

                          CREATE TABLE IF NOT EXISTS vitals (
                            id INTEGER PRIMARY KEY AUTOINCREMENT, 
                            fever FLOAT NOT NULL, 
                            cough TEXT NOT NULL, 
                            shortness_of_breath TEXT NOT NULL, 
                            date_recorded DATE DEFAULT (CURRENT_DATE)
                          );
                        `);

      // Check if any records exist
      const existingChildren = await db.getAllAsync("SELECT * FROM children");
      if (existingChildren.length > 0) {
        // If records exist, navigate to `(tabs)`
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      console.error("Database initialization error:", error);
    }
  };

  // Calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age -= 1;
    }
    return age;
  };

  // Handle form submission
  const handleSignup = async () => {
    if (!fullName || !dob || !healthCondition) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    try {
      const age = calculateAge(dob);
      const db = await SQLite.openDatabaseAsync("childApp.db");

      // Insert data into the database
      await db.runAsync(
        "INSERT INTO children (fullName, dob, age, healthCondition) VALUES (?, ?, ?, ?);",
        [fullName, dob, age, healthCondition]
      );

      Alert.alert("Success", "Child onboarded successfully!");
      setFullName("");
      setDob("");
      setHealthCondition("");

      // Fetch updated records and navigate
      const updatedChildren = await db.getAllAsync("SELECT * FROM children");
      setChildren(updatedChildren);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error onboarding child:", error);
      Alert.alert("Error", "Failed to onboard the child.");
    }
  };

  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Onboard Your Child</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth (YYYY-MM-DD)"
        value={dob}
        onChangeText={setDob}
      />
      <TextInput
        style={styles.input}
        placeholder="Health Condition"
        value={healthCondition}
        onChangeText={setHealthCondition}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <FlatList
        data={children}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.row}>
            {item.fullName} - {item.age} years old ({item.healthCondition})
          </Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
