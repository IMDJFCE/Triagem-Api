package br.jus.com.jfce.apibancotalentos.dto.mapper;

import br.jus.com.jfce.apibancotalentos.dto.UsuarioRequestDTO;
import br.jus.com.jfce.apibancotalentos.dto.UsuarioResponseDTO;
import br.jus.com.jfce.apibancotalentos.model.Usuario;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class UsuarioMapper {
    private final ModelMapper mapper;

    public UsuarioMapper(ModelMapper mapper) {
        this.mapper = mapper;
    }

    public Usuario toUsuario(UsuarioRequestDTO dto){
        return this.mapper.map(dto, Usuario.class);
    }

    public UsuarioResponseDTO toUsuarioResponseDTO(Usuario usuario){
        return this.mapper.map(usuario, UsuarioResponseDTO.class);
    }
}
