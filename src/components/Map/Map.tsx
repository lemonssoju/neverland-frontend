import MapView, { LatLng, Marker } from 'react-native-maps';
import { AlbumLocationProps, AlbumPlaceItem } from '../Group/Album/AlbumItem';

interface MapProps {
  navigation: any;
  places: AlbumLocationProps[];
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
      {places.map((marker: AlbumLocationProps, index: number) => {
        const latitude = parseFloat(marker.y);
        const longitude = parseFloat(marker.x);
        return (
          <Marker
            key={index}
            coordinate={{
              latitude,
              longitude,
            }}>
            <AlbumPlaceItem
              navigation={navigation}
              image={'https://ifh.cc/g/9zkq09.jpg'}
              albumIdx={marker.albumIdx}
            />
          </Marker>
        );
      })}
    </MapView>
  );
};

export default Map;
