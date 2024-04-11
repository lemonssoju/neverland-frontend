import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PURPLE, WHITE, BLACK, LIGHTGRAY } from './src/styles/GlobalColor';

// Main
import AuthStack from './src/pages/AuthStack';
import HomeStack from './src/pages/HomeStack';
// Tab
import FeedStack from './src/pages/Group/FeedStack';
import WriteStack from './src/pages/Group/WriteStack';
import PuzzleStack from './src/pages/Group/PuzzleStack';

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
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="Home" component={HomeStack} />
          <Stack.Screen name="GroupTab" component={GroupTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export type TabProps = {
  Feed: { id: number | undefined };
  Write: any;
  Puzzle: { id: number | undefined };
};

const CustomTab = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View
      style={{
        height: 75,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: WHITE,
        paddingHorizontal: 10,
        borderTopWidth: 0.5,
        borderTopColor: LIGHTGRAY,
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
              height: '100%',
              alignItems: 'center',
              marginTop: 40,
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
      <Tab.Screen name={'Feed'} component={FeedStack} />
      <Tab.Screen
        name={'Write'}
        component={WriteStack}
        listeners={() => ({
          tabPress: (e: any) => {
            e.preventDefault();
          },
        })}
      />
      <Tab.Screen name={'Puzzle'} component={PuzzleStack} />
    </Tab.Navigator>
  );
};

export default App;
