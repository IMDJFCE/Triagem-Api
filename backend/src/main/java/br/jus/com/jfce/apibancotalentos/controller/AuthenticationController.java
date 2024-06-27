package br.jus.com.jfce.apibancotalentos.controller;

import br.jus.com.jfce.apibancotalentos.dto.LoginDTO;
import br.jus.com.jfce.apibancotalentos.dto.LoginResponseDTO;
import br.jus.com.jfce.apibancotalentos.dto.UsuarioRequestDTO;
import br.jus.com.jfce.apibancotalentos.dto.UsuarioResponseDTO;
import br.jus.com.jfce.apibancotalentos.model.Usuario;
import br.jus.com.jfce.apibancotalentos.service.TokenService;
import br.jus.com.jfce.apibancotalentos.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UsuarioService usuarioService;
    private final TokenService tokenService;

    public AuthenticationController(AuthenticationManager authenticationManager, UsuarioService usuarioService, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.usuarioService = usuarioService;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginDTO loginDTO){
        var usernamePassword = new UsernamePasswordAuthenticationToken(loginDTO.usuario(), loginDTO.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((Usuario) auth.getPrincipal());
        String userId = usuarioService.pegarIdPorEmail(loginDTO.usuario());
        return ResponseEntity.ok(new LoginResponseDTO(token, userId));
    }

    @PostMapping("/cadastro")
    public UsuarioResponseDTO cadastro(@RequestBody @Valid UsuarioRequestDTO request){
        return usuarioService.create(request);
    }
}
