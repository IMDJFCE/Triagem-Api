package br.jus.com.jfce.apibancotalentos.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginDTO(@Email @NotBlank @Size(max = 70) String usuario, @NotBlank @Size(min = 8) String senha) {
}
