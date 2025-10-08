// Local: app/components/MainApp.tsx

import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useProdutos } from '../hooks/ProductHook';
import { StylesMain as Styles } from './StyleMain';

export const MainApp = () => {
  const { produtos, loading, error } = useProdutos();

  // Log para ver o estado atual em cada renderização
  console.log('--- NOVO RENDER ---');
  console.log('Carregando:', loading);
  console.log('Erro:', error ? error.message : null);
  console.log('Produtos:', produtos);
  console.log('--------------------');

  if (loading) {
    console.log("Renderizando: Carregamento");
    return (
      <View style={[Styles.container, Styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  if (error) {
    console.log("Renderizando: Erro");
    return (
      <View style={[Styles.container, Styles.center]}>
        <Text style={Styles.errorText}>Ocorreu um erro ao buscar os produtos.</Text>
        <Text style={Styles.errorText}>{error.message}</Text>
      </View>
    );
  }

  console.log("Renderizando: Sucesso (FlatList)");
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Lista de Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={Styles.productItem}>
            <Text style={Styles.productName}>{item.nome}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={Styles.emptyContainer}>
            <Text style={Styles.emptyText}>Nenhum produto encontrado.</Text>
          </View>
        )}
      />
    </View>
  );
};