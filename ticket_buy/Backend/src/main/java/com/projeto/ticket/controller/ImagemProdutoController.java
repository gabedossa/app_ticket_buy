package com.projeto.ticket.controller;

import com.projeto.ticket.model.ImagemProduto;
import com.projeto.ticket.service.ImagemProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/imagens-produto")
@CrossOrigin(origins = "*")
public class ImagemProdutoController {

    @Autowired
    private ImagemProdutoService imagemProdutoService;

    @GetMapping
    public List<ImagemProduto> buscarTodos() {
        return imagemProdutoService.buscarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImagemProduto> buscarPorId(@PathVariable Integer id) {
        ImagemProduto imagem = imagemProdutoService.buscarPorId(id);
        return ResponseEntity.ok(imagem);
    }

    @PostMapping
    public ImagemProduto criar(@RequestBody ImagemProduto imagemProduto) {
        return imagemProdutoService.criar(imagemProduto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ImagemProduto> atualizar(@PathVariable Integer id, @RequestBody ImagemProduto imagemDetalhes) {
        ImagemProduto atualizada = imagemProdutoService.atualizar(id, imagemDetalhes);
        return ResponseEntity.ok(atualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        imagemProdutoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}