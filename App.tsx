import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BLACK, MINT, WHITE } from './src/styles/GlobalColor';

import HomeScreen from './src/pages/Home';
import GroupScreen from './src/pages/Group';
import WriteScreen from './src/pages/Write';
import ProfileScreen from './src/pages/Profile';
import SettingsScreen from './src/pages/Settings';

import HomeIcon from './src/assets/navbar/Home.svg';
import GroupIcon from './src/assets/navbar/Group.svg';
import WriteIcon from './src/assets/navbar/Write.svg';
import ProfileIcon from './src/assets/navbar/Profile.svg';
import SettingsIcon from './src/assets/navbar/Settings.svg';

const Stack = createNativeStackNavigator();

const GlobalTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: BLACK,
  },
};

export type TabProps = {
  Home: undefined;
  Group: undefined;
  Write: undefined;
  Profile: undefined;
  Settings: undefined;
};

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={GlobalTheme}>
        <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
          })}>
          <Stack.Screen name="HomeTab" component={HomeTab} />
          {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const CustomTab = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View
      style={{
        height: 90,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: BLACK,
        paddingHorizontal: 10,
      }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index == index;
        const onPress = () => {
          if (route.name == 'Home') {
            if (isFocused)
              navigation.reset({
                routes: [{ name: route.name, params: { id: undefined } }],
              });
            else navigation.navigate(route.name, { id: undefined });
          } else if (route.name == 'Group') {
            if (isFocused)
              navigation.reset({
                routes: [{ name: route.name, params: { id: undefined } }],
              });
            else navigation.navigate(route.name, { id: undefined });
          } else if (route.name == 'Write') {
            // if (isFocused)
            //   navigation.reset({
            //     routes: [{ name: route.name, params: { id: undefined } }],
            //   });
            // else navigation.navigate(route.name, { id: undefined });
            navigation.navigate('Home', { screen: 'FeedUpload' });
          } else if (route.name == 'Profile') {
            if (isFocused)
              navigation.reset({
                routes: [{ name: route.name, params: { id: undefined } }],
              });
            else navigation.navigate(route.name, { id: undefined });
          } else if (route.name == 'Settings') {
            if (isFocused)
              navigation.reset({
                routes: [{ name: route.name, params: { id: undefined } }],
              });
            else navigation.navigate(route.name, { id: undefined });
          }
        };
        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{
              width: '20%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {
              {
                0: <HomeIcon color={isFocused ? MINT : WHITE} />,
                1: <GroupIcon color={isFocused ? MINT : WHITE} />,
                2: <WriteIcon color={isFocused ? MINT : WHITE} />,
                3: <ProfileIcon color={isFocused ? MINT : WHITE} />,
                4: <SettingsIcon color={isFocused ? MINT : WHITE} />,
              }[index]
            }

            <Text
              style={{
                color: isFocused ? MINT : WHITE,
                marginVertical: 5,
                fontSize: 12,
              }}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Tab = createBottomTabNavigator<TabProps>();
const HomeTab = (): JSX.Element => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTab {...props} />}
      initialRouteName="Home"
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Tab.Screen name={'Home'} component={HomeScreen} />
      <Tab.Screen name={'Group'} component={GroupScreen} />
      <Tab.Screen name={'Write'} component={WriteScreen} listeners={() => ({ tabPress: (e: any) => { e.preventDefault() }})} />
      <Tab.Screen name={'Profile'} component={ProfileScreen} />
      <Tab.Screen name={'Settings'} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default App;
