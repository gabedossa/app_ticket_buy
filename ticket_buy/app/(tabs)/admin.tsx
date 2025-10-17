// app/(tabs)/admin.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../src/component/Header/Header';
import { Colors } from '../../src/constants/Colors';

import { productService } from '@/src/service/api';
import { Product, ProductCategory } from '../../src/types';
import { normalizeProduct } from '../../src/util/ProductUtils';

const AdminScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProductCategory>('lanche');
  const [image, setImage] = useState('');

  // Filter and search state
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | 'todos'>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: (ProductCategory | 'todos')[] = [
    'todos',
    'lanche',
    'bebida',
    'sobremesa',
  ];

  const loadProducts = useCallback(async () => {
    try {
      // Usando o serviço correto
      const productsData = await productService.getProducts();
      // Usando o normalizador para garantir o formato correto dos dados
      const normalizedProducts = productsData.map(normalizeProduct).filter((p) => p.id != null);
      setProducts(normalizedProducts);
    } catch (error: any) {
      console.error('❌ Erro ao carregar produtos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos: ' + error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const onRefresh = () => {
    setRefreshing(true);
    loadProducts();
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'todos' || product.tipo === selectedCategory;
    const query = searchQuery.toLowerCase();
    if (!query) return matchesCategory;
    const matchesSearch = product.name.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const resetForm = () => {
    setEditingProduct(null);
    setName('');
    setPrice('');
    setDescription('');
    setCategory('lanche');
    setImage('');
  };

  const handleOpenModalForEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(String(product.price));
    setDescription(product.description);
    setCategory(product.tipo);
    setImage(product.images?.[0] || '');
    setShowProductModal(true);
  };

  const handleOpenModalForCreate = () => {
    resetForm();
    setShowProductModal(true);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !price.trim() || !description.trim()) {
      Alert.alert('Campos Obrigatórios', 'Por favor, preencha nome, preço e descrição.');
      return;
    }
    const parsedPrice = parseFloat(price.replace(',', '.'));
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Preço Inválido', 'O preço deve ser um número maior que zero.');
      return;
    }

    // Adaptado para o formato do DTO (ProductCreateDTO)
    const productData = {
      nome: name.trim(),
      descricao: description.trim(),
      preco: parsedPrice,
      tipo: category,
      imagem: image.trim() || 'https://via.placeholder.com/300x200?text=Produto',
      disponivel: editingProduct ? editingProduct.disponivel : true,
    };

    const action = editingProduct ? 'atualizar' : 'criar';
    try {
      if (editingProduct && editingProduct.id) {
        // Usando o serviço correto
        await productService.updateProduct(editingProduct.id, productData);
      } else {
        // Usando o serviço correto. Note que o DTO e a entidade Product são compatíveis.
        await productService.createProduct(productData as any);
      }
      Alert.alert('Sucesso!', `Produto ${action} com sucesso.`);
      setShowProductModal(false);
      await loadProducts();
    } catch (error: any) {
      Alert.alert(`Erro ao ${action}`, error.message || 'Ocorreu um erro desconhecido.');
    }
  };

  const handleDeleteProduct = (productId: string | number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              // Usando o serviço correto
              await productService.deleteProduct(productId);
              setProducts((current) => current.filter((p) => p.id !== productId));
              Alert.alert('Sucesso!', 'Produto excluído com sucesso.');
            } catch (error: any) {
              Alert.alert('Erro na Exclusão', error.message || 'Não foi possível excluir o produto.');
            }
          },
        },
      ]
    );
  };
  
  // O restante do arquivo (função toggleAvailability, renderização, e estilos)
  // permanece o mesmo, desde que usem `productService` em vez de `ProductService`.
  // Por exemplo:
  const toggleAvailability = async (product: Product) => {
    const newAvailability = !product.disponivel;
    try {
      if (!product.id) return;
      await productService.toggleProductAvailability(product.id, newAvailability);
      setProducts(current => current.map(p => p.id === product.id ? { ...p, disponivel: newAvailability } : p));
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível alterar a disponibilidade.');
    }
  };


  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  // O JSX para renderização (return (...)) permanece o mesmo.
  // Cole-o aqui. O importante é que as funções acima usem `productService` (minúsculo).
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.controlsContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#64748b" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.addProductButton}
          onPress={handleOpenModalForCreate}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addProductButtonText}>Novo Produto</Text>
        </TouchableOpacity>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.productsList}
        renderItem={({ item: product }) => (
          <View style={[styles.card, !product.disponivel && styles.disabledCard]}>
            <Image source={{ uri: product.images?.[0] || 'https://via.placeholder.com/150' }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <View>
                <View style={styles.productHeader}>
                  <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                  <View style={[styles.availabilityBadge, product.disponivel ? styles.available : styles.unavailable]}>
                    <Text style={styles.availabilityText}>{product.disponivel ? 'Disponível' : 'Oculto'}</Text>
                  </View>
                </View>
                <Text style={styles.productDescription} numberOfLines={2}>{product.description}</Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.productPrice}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.iconButton} onPress={() => handleOpenModalForEdit(product)}>
                    <Ionicons name="pencil" size={20} color="#3b82f6" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton} onPress={() => toggleAvailability(product)}>
                    <Ionicons name={product.disponivel ? 'eye-off' : 'eye'} size={20} color="#f59e0b" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton} onPress={() => handleDeleteProduct(product.id)}>
                    <Ionicons name="trash" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="fast-food-outline" size={64} color="#cbd5e1" />
            <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
          </View>
        )}
      />

      <Modal
        visible={showProductModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowProductModal(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</Text>
            <TouchableOpacity onPress={() => setShowProductModal(false)}>
              <Ionicons name="close" size={28} color="#64748b" />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.formContainer}>
            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Digite o nome do produto" />
            <Text style={styles.label}>Preço</Text>
            <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="decimal-pad" placeholder="0.00" />
            <Text style={styles.label}>Descrição</Text>
            <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} multiline numberOfLines={4} placeholder="Descreva o produto" />
            <Text style={styles.label}>Categoria</Text>
            <View style={styles.categoryOptions}>
              {(['lanche', 'bebida', 'sobremesa'] as ProductCategory[]).map((cat) => (
                <TouchableOpacity key={cat} style={[styles.categoryOption, category === cat && styles.categoryOptionActive]} onPress={() => setCategory(cat)}>
                  <Text style={[styles.categoryOptionText, category === cat && styles.categoryOptionTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.label}>URL da Imagem</Text>
            <TextInput style={styles.input} value={image} onChangeText={setImage} placeholder="https://exemplo.com/imagem.jpg" />
            {image ? <Image source={{ uri: image }} style={styles.imagePreview} /> : null}
            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setShowProductModal(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSubmit}>
                <Text style={[styles.buttonText, { color: '#fff' }]}>{editingProduct ? 'Salvar Alterações' : 'Criar Produto'}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

// Cole todos os seus estilos aqui
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    controlsContainer: { flexDirection: 'row', padding: 12, alignItems: 'center', gap: 10, backgroundColor: '#fff' },
    searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: 8, paddingHorizontal: 10 },
    searchIcon: { marginRight: 8 },
    searchInput: { height: 44, flex: 1, fontSize: 16 },
    addProductButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.secondary, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, gap: 6 },
    addProductButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
    categoriesContainer: { paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
    categoryButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#e2e8f0', marginRight: 8 },
    categoryButtonActive: { backgroundColor: Colors.secondary },
    categoryText: { fontSize: 14, fontWeight: '500', color: '#334155', textTransform: 'capitalize' },
    categoryTextActive: { color: '#fff' },
    productsList: { paddingHorizontal: 12, paddingTop: 12 },
    card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, flexDirection: 'row', overflow: 'hidden', borderWidth: 1, borderColor: '#e2e8f0' },
    disabledCard: { opacity: 0.7 },
    productImage: { width: 100, height: '100%', backgroundColor: '#f8fafc' },
    productInfo: { flex: 1, padding: 12, justifyContent: 'space-between' },
    productHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
    productName: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', flex: 1 },
    availabilityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, marginLeft: 8 },
    available: { backgroundColor: '#dcfce7', color: '#166534' },
    unavailable: { backgroundColor: '#fee2e2', color: '#991b1b' },
    availabilityText: { fontSize: 11, fontWeight: '600' },
    productDescription: { fontSize: 13, color: '#475569', marginBottom: 8 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    productPrice: { fontSize: 16, fontWeight: 'bold', color: Colors.secondary },
    actions: { flexDirection: 'row', gap: 8 },
    iconButton: { padding: 6 },
    emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 80 },
    emptyText: { fontSize: 16, color: '#64748b', marginTop: 16 },
    modalView: { flex: 1, backgroundColor: '#f8fafc' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
    formContainer: { padding: 16, paddingBottom: 40 },
    label: { fontSize: 16, fontWeight: '500', color: '#374151', marginBottom: 8, marginTop: 12 },
    input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fff' },
    textArea: { minHeight: 100, textAlignVertical: 'top' },
    categoryOptions: { flexDirection: 'row', gap: 8 },
    categoryOption: { flex: 1, padding: 12, borderRadius: 8, backgroundColor: Colors.lightGray, alignItems: 'center' },
    categoryOptionActive: { backgroundColor: Colors.secondary },
    categoryOptionText: { fontSize: 14, fontWeight: '500', color: '#334155', textTransform: 'capitalize' },
    categoryOptionTextActive: { color: '#fff' },
    imagePreview: { width: '100%', height: 180, borderRadius: 8, marginTop: 16, backgroundColor: '#e2e8f0' },
    modalActions: { flexDirection: 'row', gap: 12, marginTop: 24 },
    button: { flex: 1, padding: 14, borderRadius: 8, alignItems: 'center' },
    buttonText: { fontSize: 16, fontWeight: '600' },
    cancelButton: { backgroundColor: '#e2e8f0' },
    saveButton: { backgroundColor: '#1d4ed8' },
});

export default AdminScreen;