import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/pages/Home';
import Group from './src/pages/Group';
import Write from './src/pages/Write';
import Profile from './src/pages/Profile';
import Settings from './src/pages/Settings';

export type TabProps = {
  Home: undefined;
  Group: undefined;
  Write: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabProps>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Group' component={Group} />
        <Tab.Screen name='Write' component={Write} />
        <Tab.Screen name='Profile' component={Profile} />
        <Tab.Screen name='Settings' component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
