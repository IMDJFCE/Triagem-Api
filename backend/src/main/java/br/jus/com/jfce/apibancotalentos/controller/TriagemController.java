package br.jus.com.jfce.apibancotalentos.controller;

import br.jus.com.jfce.apibancotalentos.dto.UsuarioResponseDTO;
import br.jus.com.jfce.apibancotalentos.service.TriagemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/triagens/")
@AllArgsConstructor
@Tag(
        name = "Triagem Controller",
        description = "Controlador responsável por gerenciar operações relacionadas a triagem."
)
public class TriagemController {
    private final TriagemService triagemService;

    @GetMapping("{oportunidadeId}")
    @Operation(
            summary = "Realizar a triagem da oportunidade",
            description = "Este endpoint retorna uma lista de usuários que possuem habilidades necessárias para a oportunidade especificada."
    )
    public ResponseEntity<List<UsuarioResponseDTO>> triarUsuariosParaOportunidade(@PathVariable String oportunidadeId) {
        List<UsuarioResponseDTO> usuariosTriados = triagemService.triarUsuariosParaOportunidade(oportunidadeId);
        return ResponseEntity.ok(usuariosTriados);
    }
}
