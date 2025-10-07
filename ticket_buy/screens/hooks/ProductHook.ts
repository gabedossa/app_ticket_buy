import { Product } from '@/app/type/types';
import { useEffect, useState } from 'react';
import { ServiceProdutos } from '../../app/service/api/ProdutoService';

// Hook personalizado
type UseProdutosReturn = {
  produtos: Product[];
  loading: boolean;
  error: Error | null;
  setProdutos: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const useProdutos = (): UseProdutosReturn => {
  // 1. Estados que o hook vai gerenciar
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // 2. Efeito para buscar os dados da API
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoading(true); // Avisa que a busca começou
        const data = await ServiceProdutos.getProdutos();
        setProdutos(data); // Salva os dados no estado
        setError(null); // Limpa qualquer erro anterior
      } catch (err) {
        // Se der erro, guarda a mensagem de erro
        setError(err as Error);
        console.error("Falha ao buscar produtos:", err);
      } finally {
        // Executa sempre, seja com sucesso ou erro
        setLoading(false); // Avisa que a busca terminou
      }
    };

    fetchProdutos();
  }, []);

  // 3. O que o hook retorna para quem o usar
  return { produtos, loading, error, setProdutos };
};