package br.jus.com.jfce.apibancotalentos.model;

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
public class Deficiencia {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "deficiencia_id")
    private String id;

    private String descricao;
}
