// In App.js in a new project

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/Home';
import StudentLogin from './src/StudentLogin';
import TeacherLogin from './src/TeacherLogin';
import AdminLogin from './src/AdminLogin';
import Practice from './src/Practice';
import dashboard from './src/Studentdashboard';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StudentLogin" component={StudentLogin} />
        <Stack.Screen name="TeacherLogin" component={TeacherLogin} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="Practice" component={Practice} />
        <Stack.Screen name="Dashboard" component={dashboard} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;