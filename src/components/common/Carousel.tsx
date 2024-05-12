import { useState } from 'react';
import { View, Dimensions } from 'react-native';
import CarouselModule, { Pagination } from 'react-native-snap-carousel';
import { PURPLE } from '../../styles/GlobalColor';

interface CarouselProps {
  data: any[];
  renderItem: any;
}

const { width } = Dimensions.get('window');

export const HorizontalCarousel = ({ data, renderItem }: CarouselProps) => {
  const [page, setPage] = useState<number>(0);
  return (
    <>
      <CarouselModule
        data={data}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index: number) => setPage(index)}
        keyExtractor={(item, index) => index.toString()}
        containerCustomStyle={{ paddingBottom: 10 }}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={page}
        containerStyle={{ marginTop: 10 }}
        dotStyle={{
          width: 8,
          height: 8,
          backgroundColor: PURPLE,
        }}
        inactiveDotStyle={{
          width: 6,
          height: 6,
          opacity: 0.2,
        }}
      />
    </>
  );
};

export const VerticalCarousel = ({ data, renderItem }: CarouselProps) => {
  const [page, setPage] = useState<number>(0);
  return (
    <>
      <CarouselModule
        data={data}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index: number) => setPage(index)}
        keyExtractor={(item, index) => index.toString()}
        containerCustomStyle={{ paddingBottom: 10 }}
      />
    </>
  );
};
