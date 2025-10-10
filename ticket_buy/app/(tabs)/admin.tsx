import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { colors, globalStyles } from '../src/component/Style';

const mockOrders = [
  { id: '12345', timestamp: new Date().toISOString(), total: 20.90, status: 'em preparo' },
  { id: '67890', timestamp: new Date().toISOString(), total: 15.00, status: 'pronto' },
];

const AdminScreen = () => {
  // Estado para o formulário de novo produto
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('lanches');
  const [image, setImage] = useState('');

  // Estado para os pedidos (usando mock)
  const [orders, setOrders] = useState(mockOrders);
  
  // Função para adicionar um novo produto (simulada)
  const handleAddProduct = async () => {
    if (!name || !price || !description) {
      Alert.alert('Erro', 'Por favor, preencha nome, preço e descrição.');
      return;
    }
    const newProductData = {
      name,
      price: parseFloat(price),
      description,
      category,
      image: image || `https://placehold.co/150x150?text=${name.replace(' ', '+')}`
    };
    
    console.log('Adicionando novo produto:', newProductData);
    Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
    
    // Limpa o formulário
    setName('');
    setPrice('');
    setDescription('');
    setCategory('lanches');
    setImage('');
  };

  // Função para alterar o status de um pedido
  const changeOrderStatus = (orderId: string) => {
    const statuses = ['em preparo', 'pronto', 'entregue'];
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
          const currentIndex = statuses.indexOf(order.status);
          const nextStatus = statuses[(currentIndex + 1) % statuses.length];
          return { ...order, status: nextStatus };
        }
        return order;
      })
    );
  };

  // Retorna o estilo correto com base no status do pedido
  const getStatusStyle = (status: string) => {
    if (status === 'em preparo') return styles.statusEmPreparo;
    if (status === 'pronto') return styles.statusPronto;
    if (status === 'entregue') return styles.statusEntregue;
    return {};
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={globalStyles.sectionTitle}>Gerenciar Produtos</Text>
      <View style={globalStyles.adminForm}>
        <TextInput
          placeholder="Nome do produto"
          value={name}
          onChangeText={setName}
          style={globalStyles.textInput}
        />
        <TextInput
          placeholder="Preço"
          value={price}
          onChangeText={setPrice}
          style={globalStyles.textInput}
          keyboardType="decimal-pad"
        />
        <TextInput
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
          style={[globalStyles.textInput, globalStyles.textArea]}
          multiline
        />
        <TextInput
          placeholder="Categoria (lanches, bebidas, etc)"
          value={category}
          onChangeText={setCategory}
          style={globalStyles.textInput}
        />
        <TextInput
          placeholder="URL da imagem (opcional)"
          value={image}
          onChangeText={setImage}
          style={globalStyles.textInput}
        />
        <TouchableOpacity
          style={[globalStyles.btn, globalStyles.btnPrimary]}
          onPress={handleAddProduct}
        >
          <Text style={globalStyles.btnText}>Adicionar Produto</Text>
        </TouchableOpacity>
      </View>

      <Text style={globalStyles.sectionTitle}>Pedidos Recebidos</Text>
      <View style={styles.ordersList}>
        {orders.length === 0 ? (
          <Text style={globalStyles.emptyText}>Nenhum pedido recebido.</Text>
        ) : (
          orders.map(order => (
            <View key={order.id} style={styles.orderItem}>
              <Text style={styles.orderTitle}>
                Pedido #{order.id} - {new Date(order.timestamp).toLocaleTimeString('pt-BR')}
              </Text>
              <Text style={styles.orderText}>Total: R$ {order.total.toFixed(2)}</Text>
              <View style={styles.orderStatusContainer}>
                <View style={[styles.orderStatus, getStatusStyle(order.status)]}>
                   <Text style={styles.orderStatusText}>{order.status}</Text>
                </View>
                <TouchableOpacity
                  style={styles.statusBtn}
                  onPress={() => changeOrderStatus(order.id)}
                >
                  <Text style={styles.statusBtnText}>Mudar Status</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20, // Garante espaço no final da rolagem
  },
  ordersList: {
    marginTop: 16,
  },
  orderItem: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: colors.white,
    marginHorizontal: 16,
  },
  orderTitle: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderText: {
      fontSize: 14,
      color: colors.darkGray,
  },
  orderStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  orderStatus: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  orderStatusText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  statusEmPreparo: { backgroundColor: '#f39c12' },
  statusPronto: { backgroundColor: '#2ecc71' },
  statusEntregue: { backgroundColor: '#3498db' },
  statusBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.mediumGray,
    borderRadius: 8,
  },
  statusBtnText: {
    fontSize: 13,
    fontWeight: '500',
  },
});

export default AdminScreen;
