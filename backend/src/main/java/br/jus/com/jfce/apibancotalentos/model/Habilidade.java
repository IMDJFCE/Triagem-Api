package br.jus.com.jfce.apibancotalentos.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Habilidade{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "habilidade_id")
    private Long id;

    @NotBlank
    @Size(max = 50)
    private String nome;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Tipo tipo;

    public enum Tipo {
        TECNICA,
        COMPORTAMENTAL;
    }
}
