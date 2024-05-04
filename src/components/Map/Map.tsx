import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { PuzzlePlaceItem } from '../Group/PuzzleItem';

const Map = () => {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 33.450701,
        longitude: 126.570667,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      <Marker coordinate={{ latitude: 33.450701, longitude: 126.570667 }}>
        <PuzzlePlaceItem />
      </Marker>
    </MapView>
  );
};

export default Map;
