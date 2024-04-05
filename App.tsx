import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PURPLE, WHITE, BLACK } from './src/styles/GlobalColor';

// Main
import AuthScreen from './src/pages/Auth';
import HomeScreen from './src/pages/Home';
// Tab
import GroupScreen from './src/pages/Group/Feed';
import WriteScreen from './src/pages/Group/Write';
import ProfileScreen from './src/pages/Group/Puzzle';

import FeedIcon from './src/assets/navbar/Feed.svg';
import WriteIcon from './src/assets/navbar/Write.svg';
import PuzzleIcon from './src/assets/navbar/Puzzle.svg';

const Stack = createNativeStackNavigator();

const GlobalTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: WHITE,
  },
};

export type RootStackParams = {
  Auth: any;
  Home: any;
  GroupTab: any;
};

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={GlobalTheme}>
        <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
          })}>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="GroupTab" component={GroupTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export type TabProps = {
  Feed: any;
  Write: any;
  Puzzle: any;
};

const CustomTab = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View
      style={{
        height: 90,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: WHITE,
        paddingHorizontal: 10,
      }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          if (route.name === 'Feed') {
            if (isFocused)
              navigation.reset({
                routes: [{ name: route.name, params: { id: undefined } }],
              });
            else navigation.navigate(route.name, { id: undefined });
          } else if (route.name === 'Write') {
            navigation.navigate('Feed', { screen: 'FeedUpload' });
          } else if (route.name === 'Puzzle') {
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
                0: <FeedIcon color={isFocused ? PURPLE : BLACK} />,
                1: <WriteIcon color={isFocused ? PURPLE : BLACK} />,
                2: <PuzzleIcon color={isFocused ? PURPLE : BLACK} />,
              }[index]
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Tab = createBottomTabNavigator<TabProps>();
const GroupTab = (): JSX.Element => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTab {...props} />}
      initialRouteName="Feed"
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Tab.Screen name={'Feed'} component={GroupScreen} />
      <Tab.Screen
        name={'Write'}
        component={WriteScreen}
        listeners={() => ({
          tabPress: (e: any) => {
            e.preventDefault();
          },
        })}
      />
      <Tab.Screen name={'Puzzle'} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default App;
