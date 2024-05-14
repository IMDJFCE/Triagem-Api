package br.jus.com.jfce.apibancotalentos.dto;

import br.jus.com.jfce.apibancotalentos.model.Habilidade;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class OportunidadeResponseDTO {
    private String id;

    @NotBlank
    @Size(max = 100)
    private String titulo;

    @NotNull
    private LocalDate dataInicial;

    @NotNull
    private LocalDate dataFinal;

    @NotBlank
    private String descricao;

    @NotNull
    private Set<Habilidade> habilidades;

    @NotBlank
    @Email
    @Size(max = 70)
    private String email;
}
