package com.projeto.ticket.service;

import com.projeto.ticket.exception.ResourceNotFoundException;
import com.projeto.ticket.model.ImagemProduto;
import com.projeto.ticket.repository.ImagemProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImagemProdutoService {

    @Autowired
    private ImagemProdutoRepository imagemProdutoRepository;

    public List<ImagemProduto> buscarTodos() {
        return imagemProdutoRepository.findAll();
    }

    public ImagemProduto buscarPorId(Integer id) {
        return imagemProdutoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Imagem do produto não encontrada com id: " + id));
    }

    public ImagemProduto criar(ImagemProduto imagemProduto) {
        return imagemProdutoRepository.save(imagemProduto);
    }

    public ImagemProduto atualizar(Integer id, ImagemProduto imagemDetalhes) {
        ImagemProduto imagem = buscarPorId(id);
        imagem.setUrlImagem(imagemDetalhes.getUrlImagem());
        imagem.setProduto(imagemDetalhes.getProduto());
        return imagemProdutoRepository.save(imagem);
    }

    public void deletar(Integer id) {
        ImagemProduto imagem = buscarPorId(id);
        imagemProdutoRepository.delete(imagem);
    }
}