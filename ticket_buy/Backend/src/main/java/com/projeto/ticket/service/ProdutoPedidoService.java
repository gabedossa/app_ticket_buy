package com.projeto.ticket.service;

import com.projeto.ticket.exception.ResourceNotFoundException;
import com.projeto.ticket.model.ProdutoPedido;
import com.projeto.ticket.model.ProdutoPedidoId;
import com.projeto.ticket.repository.ProdutoPedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoPedidoService {

    @Autowired
    private ProdutoPedidoRepository produtoPedidoRepository;

    public List<ProdutoPedido> buscarTodos() {
        return produtoPedidoRepository.findAll();
    }

    public ProdutoPedido buscarPorId(ProdutoPedidoId id) {
        return produtoPedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item de pedido não encontrado com id: " + id));
    }

    public ProdutoPedido criar(ProdutoPedido produtoPedido) {
        return produtoPedidoRepository.save(produtoPedido);
    }

    public ProdutoPedido atualizar(ProdutoPedidoId id, ProdutoPedido produtoPedidoDetalhes) {
        ProdutoPedido item = buscarPorId(id);
        item.setQuantidadeProduto(produtoPedidoDetalhes.getQuantidadeProduto());
        item.setPrecoUnidade(produtoPedidoDetalhes.getPrecoUnidade());
        item.setProduto(produtoPedidoDetalhes.getProduto());
        item.setPedido(produtoPedidoDetalhes.getPedido());

        return produtoPedidoRepository.save(item);
    }

    public void deletar(ProdutoPedidoId id) {
        ProdutoPedido item = buscarPorId(id);
        produtoPedidoRepository.delete(item);
    }
}