import { View } from 'react-native';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { PuzzlePlaceItem } from '../Group/PuzzleItem';

const Map = ({ navigation }: any) => {
  const places: LatLng[] = [
    {
      latitude: 33.4,
      longitude: 126.57,
    },
    {
      latitude: 33.48,
      longitude: 126.5787,
    },
    {
      latitude: 33.42,
      longitude: 126.55,
    },
    {
      latitude: 33.5,
      longitude: 126.56,
    },
  ];
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 33.450701,
        longitude: 126.570667,
        latitudeDelta: 3.5,
        longitudeDelta: 3.5
      }}
      zoomEnabled={true}>
      {places.map((marker, index) => (
        <Marker key={index} coordinate={marker}>
          <PuzzlePlaceItem navigation={navigation} />
        </Marker>
      ))}
    </MapView>
  );
};

export default Map;
