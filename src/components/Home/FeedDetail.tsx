import { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

const FeedDetail = () => {
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      console.log('stopped');
    }
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>피드 디테일</Text>
        <TouchableOpacity style={{borderWidth: 1, padding: 10}} onPress={() => setPlaying(!playing)}>
          <Text>{playing ? '중지':'재생'}</Text>
        </TouchableOpacity>
        <YoutubePlayer
          height={300}
          play={playing}
          // videoId={"26wscV8QZ3I"}
          playList={'PL7DA3D097D6FDBC02'}
          onChangeState={onStateChange}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeedDetail;
