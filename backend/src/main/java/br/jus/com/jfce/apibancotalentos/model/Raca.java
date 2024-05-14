package br.jus.com.jfce.apibancotalentos.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Raca {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "raca_id")
    @JsonIgnore
    private String id;

    @Enumerated(EnumType.STRING)
    private Descricao descricao;

    public enum Descricao {
        AMARELO,
        INDIGENA,
        BRANCO,
        PARDO,
        PRETO
    }
}
