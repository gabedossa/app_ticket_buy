// app/(tabs)/admin.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
  View
} from 'react-native';
import Header from '../src/component/Header/Header';
import { ProductService } from '../src/service/ProductService';

// Tipos
type ProductCategory = 'lanches' | 'bebidas' | 'sobremesas';

interface Product {
  [x: string]: any;
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  isAvailable: boolean;
}

const AdminScreen = () => {
  const router = useRouter();
  
  // Estados para produtos
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Estados para formulário
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProductCategory>('lanches');
  const [image, setImage] = useState('');
  
  // Estados para filtros
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'todos'>('todos');
  const [searchQuery, setSearchQuery] = useState('');


  // Carregar produtos
   useEffect(() => {
      loadProducts();
    }, []);
    

  const loadProducts = async () => {
    try {
      setLoading(true);
        setLoading(true);
        const productsData = await ProductService.getProducts();
        const productsWithDesc = productsData.map((p: any) => ({
          ...p,
          descricao:
            p.descricao ||
            `Delicioso ${
              p.nome || "produto"
            } feito com os melhores ingredientes.`,
        }));
        setProducts(productsWithDesc);
  
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
    const matchesSearch = product.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: (ProductCategory | 'todos')[] = ['todos', 'lanches', 'bebidas', 'sobremesas'];

  // Funções do CRUD
  const handleAddProduct = () => {
    if (!name || !price || !description) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      description,
      price: parseFloat(price),
      image: image || 'https://via.placeholder.com/300x200?text=Produto',
      category,
      isAvailable: true
    };

    setProducts(prev => [...prev, newProduct]);
    resetForm();
    setShowProductModal(false);
    Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setDescription(product.description);
    setCategory(product.category);
    setImage(product.image);
    setShowProductModal(true);
  };

  const handleUpdateProduct = () => {
    if (!editingProduct || !name || !price || !description) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    setProducts(prev =>
      prev.map(product =>
        product.id === editingProduct.id
          ? {
              ...product,
              name,
              description,
              price: parseFloat(price),
              category,
              image: image || product.image
            }
          : product
      )
    );

    resetForm();
    setShowProductModal(false);
    Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
  };

  const handleDeleteProduct = (productId: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setProducts(prev => prev.filter(product => product.id !== productId));
            Alert.alert('Sucesso', 'Produto excluído com sucesso!');
          }
        }
      ]
    );
  };

  const toggleAvailability = (productId: string) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, isAvailable: !product.isAvailable }
          : product
      )
    );
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setCategory('lanches');
    setImage('');
    setEditingProduct(null);
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <View style={[styles.card, !product.isAvailable && styles.disabledCard]}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={styles.productName} numberOfLines={1}>{product.nome}</Text>
          <View style={[
            styles.availabilityBadge,
            product.isAvailable ? styles.available : styles.unavailable
          ]}>
            <Text style={styles.availabilityText}>
              {product.isAvailable ? 'Disponível' : 'Indisponível'}
            </Text>
          </View>
        </View>

        <Text style={styles.productDescription} numberOfLines={2}>
          {product.descricao}
        </Text>

        <View style={styles.productDetails}>
          <Text style={styles.productPrice}>R$ {product.preco.toFixed(2)}</Text>
          <Text style={styles.productCategory}>{product.categoria}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.editButton]}
            onPress={() => handleEditProduct(product)}
          >
            <Ionicons name="pencil" size={16} color="#fff" />
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteProduct(product.id)}
          >
            <Ionicons name="trash" size={16} color="#fff" />
            <Text style={styles.actionText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === cat && styles.categoryTextActive
            ]}>
              {cat === 'todos' ? 'Todos' : cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de Produtos */}
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={item => item.idProduto}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.productsList}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="fast-food-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>
              {searchQuery 
                ? 'Nenhum produto encontrado'
                : selectedCategory === 'todos' 
                  ? 'Nenhum produto cadastrado'
                  : `Nenhum produto em ${selectedCategory}`
              }
            </Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => setShowProductModal(true)}
            >
              <Text style={styles.emptyButtonText}>Adicionar Produto</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal para Adicionar/Editar Produto */}
      <Modal
        visible={showProductModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setShowProductModal(false);
          resetForm();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingProduct ? 'Editar Produto' : 'Novo Produto'}
            </Text>
            <TouchableOpacity 
              onPress={() => {
                setShowProductModal(false);
                resetForm();
              }}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            <Text style={styles.label}>Nome do Produto *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Ex: Hambúrguer Especial"
            />

            <Text style={styles.label}>Preço *</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="Ex: 24.90"
              keyboardType="decimal-pad"
            />

            <Text style={styles.label}>Descrição *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Descreva o produto..."
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>Categoria *</Text>
            <View style={styles.categoryOptions}>
              {(['lanches', 'bebidas', 'sobremesas'] as ProductCategory[]).map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryOption,
                    category === cat && styles.categoryOptionActive
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[
                    styles.categoryOptionText,
                    category === cat && styles.categoryOptionTextActive
                  ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>URL da Imagem</Text>
            <TextInput
              style={styles.input}
              value={image}
              onChangeText={setImage}
              placeholder="https://exemplo.com/imagem.jpg"
            />

            {image ? (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            ) : null}

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => {
                  setShowProductModal(false);
                  resetForm();
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={editingProduct ? handleUpdateProduct : handleAddProduct}
              >
                <Text style={styles.saveButtonText}>
                  {editingProduct ? 'Atualizar' : 'Salvar'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#c23b01ff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  backButtonText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryButton: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  categoryButtonActive: {
    backgroundColor: "#961e00ff",
    marginBottom:32,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  categoryTextActive: {
    color: '#fff',
  },
  productsList: {
    padding: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  disabledCard: {
    opacity: 0.6,
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  available: {
    backgroundColor: '#dcfce7',
  },
  unavailable: {
    backgroundColor: '#fee2e2',
  },
  availabilityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#166534',
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  productCategory: {
    fontSize: 12,
    color: '#888',
    textTransform: 'capitalize',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    gap: 4,
  },
  editButton: {
    backgroundColor: '#3b82f6',
  },
  toggleButton: {
    backgroundColor: '#f59e0b',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  actionText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginVertical: 16,
  },
  emptyButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  form: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  categoryOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  categoryOptionActive: {
    backgroundColor: '#2563eb',
  },
  categoryOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  categoryOptionTextActive: {
    color: '#fff',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  saveButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default AdminScreen;