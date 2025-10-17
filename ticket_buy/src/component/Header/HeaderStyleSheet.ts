// app/components/HeaderStyleSheet.ts
import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary, 
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.white,
    marginLeft: 8,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  btnText: {
    color: Colors.white,
    fontWeight: "600",
  },
  ButtonStyle: {
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    borderRadius: 16,
    position: 'relative',
  },
  cartContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBack: {
    width: 18,
    height: 18,
    position: "absolute",
    top: -16,
    right: -16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.yellow,
    borderRadius: 9,
    zIndex: 1,
  },
  counterText: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: "700",
  },
  carrinhoText: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 12,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  fullScreen: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  serverStatus: {
    fontSize: 14,
    color: Colors.black, 
    opacity: 0.95,
    fontWeight: "500",
  },
  HeaderBtn: {
    padding: 16,
    backgroundColor: Colors.secondary, 
  },
  headerSide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
  },
});