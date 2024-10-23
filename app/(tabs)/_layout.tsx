import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name={focused ? 'house' : 'house'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
        name="monitor"
        options={{
          title: 'Monitor',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name={focused ? 'hand-holding-heart' : 'hand-holding-heart'} color={color} size={24}/>
          ),
        }}
      />
     
      <Tabs.Screen
        name="log"
        options={{
          title: 'Log Symptoms',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name={focused ? 'clipboard' : 'clipboard'} color={color} size={24}/>
          ),
        }}
        />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Doctor',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name={focused ? 'user-doctor' : 'user-doctor'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
  );
}
