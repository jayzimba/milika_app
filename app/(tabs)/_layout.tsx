import { Tabs } from "expo-router";
import React from "react";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name={focused ? "house" : "house"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: "Log Symptoms",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name={focused ? "clipboard" : "clipboard"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="reminders"
        options={{
          title: "Reminders",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? "bell" : "bell-o"}
              color={color}
              size={24}
            />
          ),
        }}
      /> */}

      <Tabs.Screen
        name="Doctor"
        options={{
          title: "Doctor",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name={focused ? "user-doctor" : "user-doctor"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
