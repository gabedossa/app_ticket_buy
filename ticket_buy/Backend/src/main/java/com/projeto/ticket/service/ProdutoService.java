package com.projeto.ticket.service;

import com.projeto.ticket.exception.ResourceNotFoundException;
import com.projeto.ticket.model.Produto;
import com.projeto.ticket.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> buscarTodos() {
        return produtoRepository.findAll();
    }

    public Produto buscarPorId(Integer id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com id: " + id));
    }

    public Produto criar(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Produto atualizar(Integer id, Produto produtoDetalhes) {
        Produto produtoExistente = buscarPorId(id);
        produtoExistente.setNome(produtoDetalhes.getNome());
        produtoExistente.setPreco(produtoDetalhes.getPreco());
        produtoExistente.setTipo(produtoDetalhes.getTipo());
        return produtoRepository.save(produtoExistente);
    }

    public void deletar(Integer id) {
        Produto produto = buscarPorId(id);
        produtoRepository.delete(produto);
    }
}