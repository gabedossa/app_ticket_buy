package com.projeto.ticket.repository;

import com.projeto.ticket.model.ProdutoPedido;
import com.projeto.ticket.model.ProdutoPedidoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoPedidoRepository extends JpaRepository<ProdutoPedido, ProdutoPedidoId> {
}