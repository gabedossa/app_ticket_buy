package com.projeto.ticket.service;

import com.projeto.ticket.exception.ResourceNotFoundException;
import com.projeto.ticket.model.Pedido;
import com.projeto.ticket.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService {
    @Autowired
    private PedidoRepository pedidoRepository;

    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    public Pedido getPedidoById(Integer id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado com id: " + id));
    }

    public Pedido createPedido(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    public Pedido updatePedido(Integer id, Pedido pedidoDetails) {
        Pedido pedido = getPedidoById(id);

        pedido.setPrecoTotal(pedidoDetails.getPrecoTotal());
        pedido.setStatus(pedidoDetails.getStatus());
        pedido.setDataPedido(pedidoDetails.getDataPedido());
        pedido.setCliente(pedidoDetails.getCliente());

        return pedidoRepository.save(pedido);
    }

    public void deletePedido(Integer id) {
        Pedido pedido = getPedidoById(id);
        pedidoRepository.delete(pedido);
    }
}