package com.projeto.ticket.service;

import com.projeto.ticket.dto.CartItemRequest;
import com.projeto.ticket.dto.PedidoRequest;
import com.projeto.ticket.exception.ResourceNotFoundException;
import com.projeto.ticket.model.Cliente;
import com.projeto.ticket.model.Pedido;
import com.projeto.ticket.model.Produto;
import com.projeto.ticket.model.ProdutoPedido;
import com.projeto.ticket.model.ProdutoPedidoId;
import com.projeto.ticket.repository.ClienteRepository;
import com.projeto.ticket.repository.PedidoRepository;
import com.projeto.ticket.repository.ProdutoPedidoRepository;
import com.projeto.ticket.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PedidoService {
    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ProdutoPedidoRepository produtoPedidoRepository;

    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    public Pedido getPedidoById(Integer id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado com id: " + id));
    }

    @Transactional
    public Pedido createPedido(PedidoRequest pedidoRequest, String userEmail) {
        Cliente cliente = clienteRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente autenticado não encontrado com o email: " + userEmail));

        Pedido novoPedido = new Pedido();
        novoPedido.setCliente(cliente);
        novoPedido.setDataPedido(LocalDateTime.now());
        novoPedido.setStatus("em preparo");

        Pedido pedidoSalvo = pedidoRepository.save(novoPedido);

        List<ProdutoPedido> itensDoPedido = new ArrayList<>();
        BigDecimal totalCalculado = BigDecimal.ZERO;

        for (CartItemRequest itemRequest : pedidoRequest.getItens()) {
            Produto produto = produtoRepository.findById(itemRequest.getProdutoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com id: " + itemRequest.getProdutoId()));

            ProdutoPedido produtoPedido = new ProdutoPedido();
            produtoPedido.setId(new ProdutoPedidoId(produto.getIdProduto(), pedidoSalvo.getIdPedido()));
            produtoPedido.setPedido(pedidoSalvo);
            produtoPedido.setProduto(produto);
            produtoPedido.setQuantidadeProduto(itemRequest.getQuantidade());
            produtoPedido.setPrecoUnidade(produto.getPreco());

            itensDoPedido.add(produtoPedido);

            totalCalculado = totalCalculado.add(produto.getPreco().multiply(BigDecimal.valueOf(itemRequest.getQuantidade())));
        }

        produtoPedidoRepository.saveAll(itensDoPedido);

        pedidoSalvo.setPrecoTotal(totalCalculado);
        pedidoSalvo.setItens(itensDoPedido);

        return pedidoRepository.save(pedidoSalvo);
    }

    public Pedido updatePedido(Integer id, Pedido pedidoDetails) {
        Pedido pedido = getPedidoById(id);
        pedido.setPrecoTotal(pedidoDetails.getPrecoTotal());
        pedido.setStatus(pedidoDetails.getStatus());
        pedido.setDataPedido(pedidoDetails.getDataPedido());
        return pedidoRepository.save(pedido);
    }

    public void deletePedido(Integer id) {
        Pedido pedido = getPedidoById(id);
        pedidoRepository.delete(pedido);
    }
}