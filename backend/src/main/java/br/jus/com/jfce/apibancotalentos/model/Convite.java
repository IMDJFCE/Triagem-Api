package br.jus.com.jfce.apibancotalentos.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Convite{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "convite_id")
    private String id;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Status status;

    private LocalDateTime dataEnvio;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "oportunidade_id")
    private Oportunidade oportunidade;

    public enum Status {
        PENDENTE,
        ENVIADO;
    }
}
