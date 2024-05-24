import { View } from 'react-native';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { PuzzlePlaceItem } from '../Group/PuzzleItem';
import { Key } from 'react';

interface MapProps {
  navigation: any;
  places: any;
}

const Map = ({ navigation, places }: MapProps) => {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 35.6,
        longitude: 127.6,
        latitudeDelta: 4,
        longitudeDelta: 4,
      }}
      zoomEnabled={true}>
      {places.map(
        (marker: { coor: LatLng; image: string }, index: number) => (
          <Marker key={index} coordinate={marker.coor}>
            <PuzzlePlaceItem navigation={navigation} image={marker.image} />
          </Marker>
        ),
      )}
    </MapView>
  );
};

export default Map;
