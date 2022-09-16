import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png'

import { Background } from '../../components/Background'
import { DuoCard, DuoCardProps } from '../../components/DuoCard'
import { Heading } from '../../components/Heading'

import { GameParams } from '../../@types/navigation'
import { THEME } from '../../theme'

import { styles } from './styles'

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const navigation = useNavigation()
  const route = useRoute()
  const game = route.params as GameParams

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://192.168.1.9:3333/games/${game.id}/ads`)
      const data = await res.json()

      setDuos(data)
    })()
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container} >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerURL }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading 
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList
          horizontal
          data={duos}
          style={styles.containerList}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard data={item} onConnect={() => {}} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  )
}