package br.jus.com.jfce.apibancotalentos.controller;

import br.jus.com.jfce.apibancotalentos.dto.OportunidadeRequestDTO;
import br.jus.com.jfce.apibancotalentos.dto.OportunidadeResponseDTO;
import br.jus.com.jfce.apibancotalentos.service.OportunidadeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/oportunidades/")
@AllArgsConstructor
@Tag(
        name = "Oportunidade Controller",
        description = "Controlador responsável por gerenciar operações relacionadas a oportunidades."
)
public class OportunidadeController {
    private OportunidadeService service;

    @GetMapping
    @Operation(
            summary = "Listar Todas as Oportunidades",
            description = "Este endpoint retorna uma lista de todas as oportunidades disponíveis."
    )
    @ResponseStatus(HttpStatus.OK)
    public List<OportunidadeResponseDTO> listAll(){
        return service.findAll();
    }

    @GetMapping("{id}")
    @Operation(
            summary = "Obter uma Oportunidade por ID",
            description = "Este endpoint retorna uma oportunidade específica com base no ID fornecido."
    )
    @ResponseStatus(HttpStatus.OK)
    public OportunidadeResponseDTO getById(@PathVariable String id){
        return service.getById(id);
    }

    @PostMapping
    @Operation(
            summary = "Criar uma Nova Oportunidade",
            description = "Este endpoint permite criar uma nova oportunidade."
    )
    @ResponseStatus(HttpStatus.CREATED)
    public OportunidadeResponseDTO create(@Valid @RequestBody OportunidadeRequestDTO oportunidade){
        return service.create(oportunidade);
    }

    @PutMapping("{id}")
    @Operation(
            summary = "Atualizar uma Oportunidade Existente",
            description = "Este endpoint permite atualizar os dados de uma oportunidade existente."
    )
    @ResponseStatus(HttpStatus.OK)
    public OportunidadeResponseDTO update(@PathVariable String id, @Valid @RequestBody OportunidadeRequestDTO oportunidade){
        return service.update(id, oportunidade);
    }

    @DeleteMapping("{id}")
    @Operation(
            summary = "Excluir uma Oportunidade",
            description = "Este endpoint permite excluir uma oportunidade com base no ID fornecido."
    )
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id){
        service.delete(id);
    }
}
