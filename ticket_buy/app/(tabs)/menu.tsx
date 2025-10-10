// Menu.tsx (React Native)
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // --- NOVO: Importe a biblioteca do QR Code ---
import Svg, { G, Rect } from 'react-native-svg';
import { ProductService } from '../src/service/ProductService';

// ... (Tipagem do Produto e CartItem permanecem iguais)
type Product = { idProduto: number; home?: string; nome?: string; preco: number; tipo: string; imagens?: string[]; descricao?: string; };
type CartItem = Product & { quantity: number };


// --- COMPONENTE DA TELA DO CARRINHO (Atualizado) ---
const CartScreen = ({ cart, onUpdateQuantity, cartTotal, onCheckout }: { cart: CartItem[], onUpdateQuantity: (id: number, amount: number) => void, cartTotal: number, onCheckout: () => void }) => {
  // ... (O conteúdo deste componente permanece o mesmo, apenas o botão de checkout foi atualizado)
  const renderCartItem = ({ item }: { item: CartItem }) => ( <View style={styles.cartItemContainer}><Image source={{ uri: item.imagens?.[0] }} style={styles.cartItemImage} /><View style={styles.cartItemDetails}><Text style={styles.cartItemName} numberOfLines={1}>{item.nome}</Text><Text style={styles.cartItemPrice}>R$ {item.preco.toFixed(2)}</Text></View><View style={styles.quantityControl}><TouchableOpacity onPress={() => onUpdateQuantity(item.idProduto, -1)} style={styles.quantityButton}><Text style={styles.quantityButtonText}>-</Text></TouchableOpacity><Text style={styles.quantityText}>{item.quantity}</Text><TouchableOpacity onPress={() => onUpdateQuantity(item.idProduto, 1)} style={styles.quantityButton}><Text style={styles.quantityButtonText}>+</Text></TouchableOpacity></View></View> );
  return ( <View style={styles.fullScreen}>{cart.length === 0 ? ( <View style={styles.centerContent}><Text style={styles.emptyCartText}>Seu carrinho está vazio.</Text></View> ) : ( <> <FlatList data={cart} renderItem={renderCartItem} keyExtractor={(item) => item.idProduto.toString()} contentContainerStyle={{ padding: 16 }} /> <View style={styles.cartFooter}><View style={styles.totalContainer}><Text style={styles.totalText}>Total:</Text><Text style={styles.totalPrice}>R$ {cartTotal.toFixed(2)}</Text></View><TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}><Text style={styles.checkoutButtonText}>Finalizar Pedido</Text></TouchableOpacity></View> </> )} </View> );
};

// --- NOVO COMPONENTE: MODAL DE CHECKOUT/QR CODE ---
const CheckoutModal = ({ visible, onClose, total }: { visible: boolean, onClose: () => void, total: number }) => {
  if (!visible) return null;

  const qrCodeValue = `pedido_total=${total.toFixed(2)}&timestamp=${Date.now()}`;

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Pedido Enviado!</Text>
          <Text style={styles.modalDescription}>Escaneie o QR Code para pagar:</Text>
          <View style={styles.qrCodeContainer}>
            <QRCode value={qrCodeValue} size={200} />
          </View>
          <Text style={styles.totalPriceLg}>Valor: R$ {total.toFixed(2)}</Text>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


// --- COMPONENTE PRINCIPAL (Atualizado) ---
const Menu = () => {
  const [screen, setScreen] = useState('menu');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false); // --- NOVO ESTADO ---

  // ... (função loadProducts permanece a mesma)
  useEffect(() => { loadProducts(); }, []);
  const loadProducts = async () => { try { setLoading(true); const productsData = await ProductService.getProducts(); const productsWithDesc = productsData.map((p: any) => ({ ...p, descricao: p.descricao || `Delicioso ${p.nome || 'produto'} feito com os melhores ingredientes.` })); setProducts(productsWithDesc); } catch (error) { console.error('Erro:', error); } finally { setLoading(false); } };

  const cartItemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.quantity * item.preco, 0), [cart]);
  
  const updateCartQuantity = (productId: number, amount: number, productDetails: Product | null = null) => { setCart(prev => { const existingItem = prev.find(item => item.idProduto === productId); if (existingItem) { const newQuantity = existingItem.quantity + amount; if (newQuantity <= 0) { return prev.filter(item => item.idProduto !== productId); } return prev.map(item => item.idProduto === productId ? { ...item, quantity: newQuantity } : item); } if (amount > 0 && productDetails) { return [...prev, { ...productDetails, quantity: 1 }]; } return prev; }); };
  const addToCart = (product: Product | null) => { if (!product) return; updateCartQuantity(product.idProduto, 1, product); setSelectedProduct(null); };

  // --- NOVAS FUNÇÕES PARA CONTROLAR O MODAL DE CHECKOUT ---
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowCheckoutModal(true);
  };
  
  const handleCloseCheckout = () => {
    setShowCheckoutModal(false);
    setCart([]); // Limpa o carrinho
    setScreen('menu'); // Volta para o menu
  };

  const filteredProducts = categoryFilter === 'all' ? products : products.filter(product => product.tipo === categoryFilter);
  const categories = ['all', ...new Set(products.map(product => product.tipo))];
  const renderProduct = ({ item }: { item: Product }) => ( <TouchableOpacity style={styles.productCard} onPress={() => setSelectedProduct(item)}><Image source={{ uri: item.imagens?.[0] || `https://placehold.co/300x300?text=${item.nome?.charAt(0)}` }} style={styles.productImage} /><View style={styles.productInfo}><Text style={styles.productName} numberOfLines={1}>{item.home || item.nome}</Text><Text style={styles.productPrice}>R$ {item.preco.toFixed(2)}</Text></View></TouchableOpacity> );

  if (loading) { return ( <View style={[styles.container, styles.centerContent]}><ActivityIndicator size="large" color="#4a90e2" /><Text style={styles.loadingText}>Carregando produtos...</Text></View> ); }

  return (
    <SafeAreaView style={styles.container}>
      {/* ... (Header permanece o mesmo) ... */}
      <View style={styles.header}><View style={styles.headerTitleContainer}>{screen === 'cart' ? ( <TouchableOpacity onPress={() => setScreen('menu')} style={styles.backButton}><Text style={styles.headerTitle}>{"< Cardápio"}</Text></TouchableOpacity> ) : ( <> <Svg height="24" width="24"><G transform="rotate(-20 12 12)"><Rect x="9.5" y="2" width="5" height="20" fill="white" rx="1.5" /><Rect x="9.5" y="7" width="5" height="2.5" fill="#4a90e2" /><Rect x="9.5" y="12" width="5" height="2.5" fill="#4a90e2" /></G></Svg><Text style={styles.headerTitle}>Ticketeria</Text></> )}</View><TouchableOpacity onPress={() => setScreen('cart')} style={styles.cartButton}><Text style={styles.serverStatus}>{cartItemCount > 0 ? `${cartItemCount} item(s)` : `Carrinho`}</Text></TouchableOpacity></View>

      {screen === 'menu' ? (
        <>
          <View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>{categories.map(category => ( <TouchableOpacity key={category} style={[styles.categoryBtn, categoryFilter === category && styles.categoryBtnActive]} onPress={() => setCategoryFilter(category)}><Text style={[styles.categoryBtnText, categoryFilter === category && styles.categoryBtnTextActive]}>{category === 'all' ? 'Todos' : category}</Text></TouchableOpacity> ))}</ScrollView></View>
          <FlatList data={filteredProducts} renderItem={renderProduct} keyExtractor={(item) => item.idProduto.toString()} numColumns={2} contentContainerStyle={styles.productsGrid} columnWrapperStyle={{ gap: 12 }} ListEmptyComponent={() => (<View style={styles.centerContent}><Text>Nenhum produto encontrado.</Text></View>)} />
        </>
      ) : (
        <CartScreen cart={cart} onUpdateQuantity={updateCartQuantity} cartTotal={cartTotal} onCheckout={handleCheckout} />
      )}

      {/* ... (Modal de produto permanece o mesmo) ... */}
      <Modal visible={!!selectedProduct} transparent={true} animationType="fade" onRequestClose={() => setSelectedProduct(null)}><View style={styles.modalOverlay}><View style={styles.modalContent}><Image source={{ uri: selectedProduct?.imagens?.[0] || `https://placehold.co/600x400?text=${selectedProduct?.nome?.charAt(0)}` }} style={styles.modalImage} /><Text style={styles.modalTitle}>{selectedProduct?.nome}</Text><Text style={styles.modalDescription}>{selectedProduct?.descricao}</Text><View style={styles.modalFooter}><Text style={styles.modalPrice}>R$ {selectedProduct?.preco.toFixed(2)}</Text><TouchableOpacity style={styles.modalButton} onPress={() => addToCart(selectedProduct)}><Text style={styles.modalButtonText}>Adicionar</Text></TouchableOpacity></View><TouchableOpacity style={styles.closeButton} onPress={() => setSelectedProduct(null)}><Text style={styles.closeButtonText}>×</Text></TouchableOpacity></View></View></Modal>

      {/* --- NOVO: Renderiza o Modal de Checkout --- */}
      <CheckoutModal 
        visible={showCheckoutModal}
        onClose={handleCloseCheckout}
        total={cartTotal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... (Todos os estilos anteriores permanecem os mesmos)
  container: { flex: 1, backgroundColor: '#f0f2f5' }, fullScreen: { flex: 1 }, centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' }, header: { backgroundColor: '#4a90e2', paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, headerTitleContainer: { flexDirection: 'row', alignItems: 'center' }, headerTitle: { fontSize: 20, fontWeight: '600', color: 'white', marginLeft: 8 }, backButton: { marginLeft: -8 }, cartButton: { padding: 4 }, serverStatus: { fontSize: 14, color: 'white', opacity: 0.9, fontWeight: '500' }, categories: { paddingVertical: 12, paddingHorizontal: 16 }, categoryBtn: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#e0e0e0', borderRadius: 20, marginRight: 10 }, categoryBtnActive: { backgroundColor: '#357abd' }, categoryBtnText: { color: '#333', fontWeight: '500' }, categoryBtnTextActive: { color: 'white' }, productsGrid: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 }, productCard: { flex: 1, backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41 }, productImage: { width: '100%', height: 120 }, productInfo: { padding: 12, alignItems: 'center' }, productName: { fontSize: 16, fontWeight: '600', color: '#333' }, productPrice: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', marginTop: 4 }, loadingText: { marginTop: 16, color: '#666', fontSize: 16 }, modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 }, modalContent: { backgroundColor: 'white', borderRadius: 16, width: '100%', padding: 24, elevation: 5, alignItems: 'center' }, modalImage: { width: '100%', height: 180, borderRadius: 12, marginBottom: 16 }, modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 8, textAlign: 'center' }, modalDescription: { fontSize: 16, color: '#666', lineHeight: 24, marginBottom: 20, textAlign: 'center' }, modalFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, width: '100%' }, modalPrice: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50' }, modalButton: { paddingVertical: 12, paddingHorizontal: 24, backgroundColor: '#4a90e2', borderRadius: 8 }, modalButtonText: { color: 'white', fontSize: 16, fontWeight: '600' }, closeButton: { position: 'absolute', top: 10, right: 15 }, closeButtonText: { fontSize: 28, color: '#999' },
  cartItemContainer: { flexDirection: 'row', backgroundColor: 'white', padding: 12, marginBottom: 1, alignItems: 'center' }, cartItemImage: { width: 60, height: 60, borderRadius: 8 }, cartItemDetails: { flex: 1, marginLeft: 12 }, cartItemName: { fontSize: 16, fontWeight: '600' }, cartItemPrice: { fontSize: 14, color: '#666', marginTop: 4 }, quantityControl: { flexDirection: 'row', alignItems: 'center' }, quantityButton: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#f0f2f5', borderRadius: 20 }, quantityButtonText: { fontSize: 18, fontWeight: 'bold', color: '#4a90e2' }, quantityText: { fontSize: 16, fontWeight: '600', marginHorizontal: 16 }, emptyCartText: { fontSize: 18, color: '#666' }, cartFooter: { padding: 16, borderTopWidth: 1, borderTopColor: '#e0e0e0', backgroundColor: 'white' }, totalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }, totalText: { fontSize: 18, color: '#666' }, totalPrice: { fontSize: 20, fontWeight: 'bold' }, checkoutButton: { backgroundColor: '#2ecc71', padding: 16, borderRadius: 8, alignItems: 'center' }, checkoutButtonText: { color: 'white', fontSize: 18, fontWeight: '600' },

  // --- NOVOS ESTILOS PARA O MODAL DE CHECKOUT ---
  qrCodeContainer: {
    marginVertical: 24,
  },
  totalPriceLg: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  modalCloseButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  }
});

export default Menu;