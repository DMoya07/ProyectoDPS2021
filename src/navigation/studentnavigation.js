import React from 'react';
import home from '../screens/studenthome';
import docs from '../screens/studentdocuments';
import students from '../screens/studentprofile';
import pensum from '../screens/studentpensum';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
export default function Navigation() {
  return (
    <Tab.Navigator>
    <Tab.Screen
        name="template1"
        component={home}
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="#09009B" />
          ),
        }}
      />
    <Tab.Screen
        name="students"
        component={students}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={24} color="#09009B" />
          ),
        }}
      />
          <Tab.Screen
        name="docs"
        component={docs}
        options={{
          title: 'Documentos',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="file-directory" size={24} color="#09009B" />
          ),
        }}
      />
      <Tab.Screen
        name="pensum"
        component={pensum}
        options={{
          visible: false,
          title: 'Pensum',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={24} color="#09009B" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
