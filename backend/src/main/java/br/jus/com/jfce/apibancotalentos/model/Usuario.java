package br.jus.com.jfce.apibancotalentos.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SQLDelete(sql = "UPDATE usuario SET deleted_at = CURRENT_TIMESTAMP WHERE id=?")
@Where(clause = "deleted_at is null")
public class Usuario extends AbstractEntity implements UserDetails {

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

    @NotBlank
    @Size(max = 15)
    private String tipo;

    @ManyToMany
    @JoinTable(
            name = "usuario_habilidade",
            joinColumns = {@JoinColumn(name = "id_usuario", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "id_habilidade", referencedColumnName = "habilidade_id")}
    )
    private Set<Habilidade> habilidades;

    @ManyToMany
    @JoinTable(
            name = "usuario_deficiencia",
            joinColumns = {@JoinColumn(name = "id_usuario", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "id_deficiencia", referencedColumnName = "deficiencia_id")}
    )
    private Set<Deficiencia> deficiencias;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "raca_id")
    private Raca raca;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "genero_id")
    private Genero genero;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.tipo.equals("Recrutador")){
            return List.of(new SimpleGrantedAuthority("ROLE_RECRUTADOR"), new SimpleGrantedAuthority("ROLE_CANDIDATO"));
        }else{
            return List.of(new SimpleGrantedAuthority("ROLE_CANDIDATO"));
        }
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
