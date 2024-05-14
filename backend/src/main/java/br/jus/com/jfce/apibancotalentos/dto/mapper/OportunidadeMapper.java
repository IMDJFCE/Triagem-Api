package br.jus.com.jfce.apibancotalentos.dto.mapper;

import br.jus.com.jfce.apibancotalentos.dto.OportunidadeRequestDTO;
import br.jus.com.jfce.apibancotalentos.dto.OportunidadeResponseDTO;
import br.jus.com.jfce.apibancotalentos.model.Oportunidade;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class OportunidadeMapper {
    private final ModelMapper mapper;

    public OportunidadeMapper(ModelMapper mapper) {
        this.mapper = mapper;
    }

    public Oportunidade toOportunidade(OportunidadeRequestDTO dto){
        return this.mapper.map(dto, Oportunidade.class);
    }

    public OportunidadeResponseDTO toOportunidadeResponseDTO(Oportunidade oportunidade){
        return this.mapper.map(oportunidade, OportunidadeResponseDTO.class);
    }
}
