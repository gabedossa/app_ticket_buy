import { Product, UseProdutosReturn } from '@/app/type/types'; /**Importando os tipos de dados */
import { useEffect, useState } from 'react';
import { ServiceProdutos } from '../../app/service/api/ProdutoService';

export const useProdutos = (): UseProdutosReturn => {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoading(true);
        const data = await ServiceProdutos.getProdutos();
        console.log('Dado vindos do backend');
        setProdutos(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error("Falha ao buscar produtos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  return { produtos, loading, error, setProdutos };
};