import React from 'react';
import home from '../screens/studenthome';
import docs from '../screens/studentdocuments';
import students from '../screens/studentprofile';
import universities from '../screens/studentuniversities';
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
        
        options={{ title: 'Inicio'      
        ,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color="#09009B" />
          ),
           }}
      />
      <Tab.Screen
        name="students"
        component={students}
        options={{ title: 'Estudiantes'
        ,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={24} color="#09009B" />
          ),
         }}
      />
      <Tab.Screen
        name="universities"
        component={universities}
        options={{ title: 'Universidades' 
        
        ,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="university" size={24} color="#09009B" />
          ),

        }}
      />

            <Tab.Screen
        name="docs"
        component={docs}
        options={{ title: 'Documentos'      
        ,
          tabBarIcon: ({ color, size }) => (
             <Octicons name="file-directory" size={24} color="#09009B" />
          ),
           }}
      />
    </Tab.Navigator>
  );
}
