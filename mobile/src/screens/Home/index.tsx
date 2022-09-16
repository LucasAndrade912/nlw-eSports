import React, { useEffect, useState } from 'react'
import { Image, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import logoImg from '../../assets/logo-nlw-esports.png'

import { Heading } from '../../components/Heading'
import { GameCard, GameCardProps } from '../../components/GameCard'
import { Background } from '../../components/Background'

import { styles } from './styles'

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])

  const navigation = useNavigation()

  function handleOpenGame({ id, title, bannerURL }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerURL })
  }

  useEffect(() => {
    (async () => {
      const res = await fetch('http://192.168.1.9:3333/games')
      const data = await res.json()

      setGames(data)
    })()
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title="Encontre sey duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          horizontal
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  )
}