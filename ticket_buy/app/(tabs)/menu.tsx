import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';

// Importe o seu serviço e os tipos
import { ProductService } from '../src/api/service';
import { Product } from '../src/types';

// Importe o card que você criou para exibir cada produto
import ProductCard from '../src/component/ProductCard';
import { Colors } from '../src/constants/Colors';

export default function MenuScreen() {
  // 1. Estados para armazenar os dados, o status de carregamento e possíveis erros
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os produtos
  const fetchProducts = () => {
    setLoading(true);
    setError(null);

    // 3. Chamada ao serviço que busca os dados do backend
    ProductService.getProducts()
      .then(data => {
        // Se a chamada for bem-sucedida, armazena os dados no estado
        setProducts(data);
      })
      .catch((err) => {
        // Se ocorrer um erro, armazena a mensagem de erro no estado
        setError(err.message);
      })
      .finally(() => {
        // Independentemente do resultado, para de carregar
        setLoading(false);
      });
  };

  // 2. useEffect é um hook que executa a função uma vez, quando a tela é montada
  useEffect(() => {
    fetchProducts();
  }, []);

  // 4. Renderização condicional: mostra um indicador de carregamento enquanto busca os dados
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Se houver um erro, mostra uma mensagem e um botão para tentar novamente
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar Novamente" onPress={fetchProducts} color={Colors.primary} />
      </View>
    );
  }

  // Se tudo deu certo, mostra a lista de produtos
  return (
    <View style={styles.container}>
      {/* 5. Mapeamento e renderização dos dados */}
      <FlatList
        data={products} // A lista de dados vem do nosso estado 'products'
        numColumns={2}
        contentContainerStyle={styles.grid}
        // Para cada 'item' na lista de dados, renderiza um componente ProductCard
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.lightGray },
  grid: { padding: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginBottom: 16 },
});