package com.projeto.ticket.controller;

import com.projeto.ticket.model.ProdutoPedido;
import com.projeto.ticket.model.ProdutoPedidoId;
import com.projeto.ticket.service.ProdutoPedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produto-pedido")
@CrossOrigin(origins = "*")
public class ProdutoPedidoController {

    @Autowired
    private ProdutoPedidoService produtoPedidoService;

    @GetMapping
    public List<ProdutoPedido> buscarTodos() {
        return produtoPedidoService.buscarTodos();
    }

    @GetMapping("/{produtoId}/{pedidoId}")
    public ResponseEntity<ProdutoPedido> buscarPorId(
            @PathVariable Integer produtoId,
            @PathVariable Integer pedidoId) {
        ProdutoPedidoId id = new ProdutoPedidoId(produtoId, pedidoId);
        ProdutoPedido item = produtoPedidoService.buscarPorId(id);
        return ResponseEntity.ok(item);
    }

    @PostMapping
    public ProdutoPedido criar(@RequestBody ProdutoPedido produtoPedido) {
        return produtoPedidoService.criar(produtoPedido);
    }

    @PutMapping("/{produtoId}/{pedidoId}")
    public ResponseEntity<ProdutoPedido> atualizar(
            @PathVariable Integer produtoId,
            @PathVariable Integer pedidoId,
            @RequestBody ProdutoPedido produtoPedidoDetalhes) {
        ProdutoPedidoId id = new ProdutoPedidoId(produtoId, pedidoId);
        ProdutoPedido atualizado = produtoPedidoService.atualizar(id, produtoPedidoDetalhes);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{produtoId}/{pedidoId}")
    public ResponseEntity<Void> deletar(
            @PathVariable Integer produtoId,
            @PathVariable Integer pedidoId) {
        ProdutoPedidoId id = new ProdutoPedidoId(produtoId, pedidoId);
        produtoPedidoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}