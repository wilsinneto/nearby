import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Modal, View } from "react-native";

import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { api } from "@/services/api";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupons } from "@/components/market/coupons";
import { Button } from "@/components/button";

type DataProps = PropsDetails & {
  cover: string
}

export default function Market() {
  const [data, setData] = useState<DataProps>()
  const [coupon, setCoupon] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)

  const params = useLocalSearchParams<{ id: string }>()

  function handleOpenCamera() {
    try {
      setIsVisibleCameraModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`)

      console.log("data", data)
      setData(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível carregar os dados", [
        {
          text: "OK",
          onPress: () => router.back()
        }
      ])
    }
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id])

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <Redirect href="/home" />
  }

  return(
    <View style={{ flex: 1 }}>
      <Cover uri={data.cover} />

      <Details data={data} />

      {coupon && <Coupons code={coupon} />}

      <View style={{padding: 32}}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Button onPress={() => setIsVisibleCameraModal(false)}>
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}