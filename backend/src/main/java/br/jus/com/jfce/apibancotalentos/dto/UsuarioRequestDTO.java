package br.jus.com.jfce.apibancotalentos.dto;

import br.jus.com.jfce.apibancotalentos.model.Genero;
import br.jus.com.jfce.apibancotalentos.model.Raca;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class UsuarioRequestDTO {
    @NotBlank
    @Size(max = 100)
    private String nome;

    @NotBlank
    @Email
    @Size(max = 70)
    private String email;

    @NotBlank
    @Size(min = 8)
    private String senha;

    @NotNull
    private LocalDate dataNascimento;

    @NotBlank
    @Size(max = 50)
    private String matricula;

    private Genero genero;

    private Raca raca;

    private Set<HabilidadeRequestDTO> habilidades;

    private Set<DeficienciaRequestDTO> deficiencias;
}
