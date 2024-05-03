import { View } from 'react-native';
import MapView from 'react-native-maps';

const Map = () => {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 33.450701,
        longitude: 126.570667,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};

export default Map;
