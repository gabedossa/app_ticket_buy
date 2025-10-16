package com.projeto.ticket.controller;

import com.projeto.ticket.dto.AuthResponse;
import com.projeto.ticket.dto.LoginRequest;
import com.projeto.ticket.dto.RegisterRequest;
import com.projeto.ticket.model.Cliente;
import com.projeto.ticket.repository.ClienteRepository;
import com.projeto.ticket.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getSenha()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        if (clienteRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Erro: O email já está em uso!"));
        }

        Cliente cliente = new Cliente();
        cliente.setNome(registerRequest.getNome());
        cliente.setEmail(registerRequest.getEmail());
        cliente.setSenha(passwordEncoder.encode(registerRequest.getSenha()));

        clienteRepository.save(cliente);

        return ResponseEntity.ok(Map.of("message", "Usuário registrado com sucesso!"));
    }
}