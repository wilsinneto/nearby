import { Text, useWindowDimensions } from "react-native"
import { useRef } from "react";
import BottomSheet, { BottomSheetFlashList } from "@gorhom/bottom-sheet";

import { Place, PlaceProps } from "@/components/place";
import { s } from "./style";
import { router } from "expo-router";

type Props = {
  data: PlaceProps[]
}

export function Places({ data }: Props) {
  const dimensions = useWindowDimensions()
  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = {
    min: 278,
    max: dimensions.height - 128
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={s.indicator}
      style={s.container}
      enableOverDrag={false}
    >
      <BottomSheetFlashList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Place
            data={item}
            onPress={() => router.navigate(`/market/${item.id}`)}
          />
        )}
        contentContainerStyle={s.content}
        ListHeaderComponent={() => (
          <Text style={s.title}>Explore locais perto de você</Text>
        )}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={200}
      />
    </BottomSheet>
  )
}