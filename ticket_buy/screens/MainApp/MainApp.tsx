// Localização: screens/MainApp/MainApp.tsx

import { CardItem } from '@/components/itemCard/CardItem';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useProdutos } from '../hooks/ProductHook';

export const MainApp = () => {
  const { produtos, loading, error } = useProdutos();

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Ocorreu um erro ao buscar os produtos.</Text>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList style={styles.container}
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardItem 
            name={item.nome} 
            price={item.preco}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.center}>
            <Text>Nenhum produto encontrado.</Text>
          </View>
        )}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',

  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
  },
});