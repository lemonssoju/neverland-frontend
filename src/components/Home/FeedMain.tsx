import { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import styled from 'styled-components/native';
import { BLACK, MINT, WHITE } from '../../styles/GlobalColor';

import FeedList from './FeedList';
import SearchIcon from '../../assets/common/Search.svg';

const FeedMain = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);

  // const [routes] = useState([
  //   { key: 0, title: '전체' },
  //   { key: 1, title: '90s' },
  //   { key: 2, title: '00s' },
  //   { key: 3, title: '10s' }
  // ]);

  const [routes] = useState([
    { key: 'all', title: '전체' },
    { key: '90s', title: '90s' },
    { key: '00s', title: '00s' },
    { key: '10s', title: '10s' }
  ]);

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'all':
        return <FeedList />;
      case '90s':
        return <FeedList />;
      case '00s':
        return <FeedList />;
      case '10s':
        return <FeedList />;
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header>
        <Text style={{color: WHITE, fontSize: 24, fontWeight: '700'}}>neverland</Text>
        <TouchableOpacity>
          <SearchIcon />
        </TouchableOpacity>
      </Header>
      {/* <TopMenuBar>
        {routes.map((item) => {
          return (
            <TopMenuItem key={item.key} onPress={() => setIndex(item.key) } pressed={item.key === index}>
              <Text style={{color: item.key === index ? MINT : WHITE, fontSize: 14, fontWeight: '700'}}>{item.title}</Text>
            </TopMenuItem>
          )
        })}
      </TopMenuBar>
      <View style={{height: 1, backgroundColor: WHITE, width: '100%', position: 'absolute', top: 132.5}} /> */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorContainerStyle={{
              borderBottomColor: WHITE,
              borderBottomWidth: 0.5
            }}
            indicatorStyle={{
              backgroundColor: MINT,
              height: 2
            }}
            style={{
              backgroundColor: BLACK,
            }}
            labelStyle={{
              color: WHITE,
              fontWeight: '700'
            }}
            activeColor={MINT}
          />
        )}
      />
      
    </SafeAreaView>
  )
}

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`

const TopMenuBar = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5px 0px;
  z-index: 1;
`

const TopMenuItem = styled.TouchableOpacity<{ pressed: boolean }>`
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  height: 40px;
  border-bottom-width: ${props => props.pressed ? 2 : 0}px;
  border-color: ${MINT};
`

export default FeedMain;