package com.projeto.ticket.repository;

import com.projeto.ticket.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
    @Query("SELECT DISTINCT p FROM Produto p LEFT JOIN FETCH p.imagens")
    List<Produto> findAllComImagens();
}