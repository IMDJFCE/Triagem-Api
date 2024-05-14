package br.jus.com.jfce.apibancotalentos.dto.mapper;

import br.jus.com.jfce.apibancotalentos.dto.HabilidadeRequestDTO;
import br.jus.com.jfce.apibancotalentos.model.Habilidade;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class HabilidadeMapper {
    private final ModelMapper mapper;

    public HabilidadeMapper(ModelMapper mapper) {
        this.mapper = mapper;
    }

    public Habilidade toHabilidade(HabilidadeRequestDTO dto){
        return this.mapper.map(dto, Habilidade.class);
    }
}
