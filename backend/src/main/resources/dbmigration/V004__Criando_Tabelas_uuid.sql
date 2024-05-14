INSERT INTO Usuario (id, nome, email, senha, data_nascimento, matricula, tipo)
VALUES
    ('acbf6009-57d6-44a9-a3c2-f711ebb71d57', 'David', 'david@jfce.com', 'jfce@residentes', '1999-01-01', 'MAT001', 'Recrutador'),
    ('968f4817-8739-4aff-8967-e166126d6e81', 'Allan', 'allan@jfce.com', 'jfce@residentes', '1991-02-02', 'MAT002', 'Recrutador'),
    ('445f94fe-5deb-41ec-8fef-3850d74b8943', 'Mariana', 'mariana@jfce.com', 'jfce@residentes', '1992-03-03', 'MAT003', 'Recrutador'),
    ('cfe4c625-d361-4ae7-bfd9-8344e76fca41', 'Haline', 'haline@jfce.com', 'jfce@residentes', '1993-04-04', 'MAT004', 'Recrutador'),
    ('123d56f4-66ff-4da9-91e8-d83a9850e9ab', 'Admin', 'admin@jfce.com', 'jfce@residentes', '1994-05-05', 'MAT005', 'Recrutador');

WITH inserted_opportunities AS (
    INSERT INTO Oportunidade (id, titulo, data_inicial, data_final, descricao, email)
    VALUES
        ('2372bced-a913-4c91-8bf9-5e3ee7153644', 'Desenvolvedor', '2024-03-01', '2024-03-31', 'Vaga para desenvolvedor web', 'empresa@example.com'),
        ('4870836f-45b3-468a-98ad-78ba67392d3b', 'Analista', '2024-03-05', '2024-04-05', 'Vaga para analista de sistemas', 'empresa@example.com'),
        ('4e152abf-80ae-4441-80f9-70172f2c0862', 'Designer', '2024-03-10', '2024-04-10', 'Vaga para designer gráfico', 'empresa@example.com'),
        ('9d5b50c1-5ed2-4631-bff3-844c0079233f', 'Engenheiro de Software', '2024-03-15', '2024-04-15', 'Vaga para engenheiro de software', 'empresa@example.com'),
        ('cd416ff8-28cd-42cb-8659-c052a6d3613e', 'Administrador de Banco de Dados', '2024-03-20', '2024-04-20', 'Vaga para administrador de banco de dados', 'empresa@example.com'),
        ('c89e7ffa-b49f-4499-bc35-cef8339e9aca', 'Cientista de Dados', '2024-03-25', '2024-04-25', 'Vaga para cientista de dados', 'empresa@example.com'),
        ('c8a27a92-fb3a-4c43-bf8d-bb2afc6d22b3', 'Engenheiro de Testes', '2024-03-30', '2024-04-30', 'Vaga para engenheiro de testes', 'empresa@example.com')
    RETURNING id, titulo
),
habilidades_inserted AS (
    INSERT INTO habilidade (nome, tipo)
    VALUES
        ('Java', 'TECNICA'),
        ('Python', 'TECNICA'),
        ('HTML/CSS', 'TECNICA'),
        ('JavaScript', 'TECNICA'),
        ('C#', 'TECNICA'),
        ('SQL', 'TECNICA'),
        ('Angular', 'TECNICA'),
        ('React', 'TECNICA'),
        ('Node.js', 'TECNICA'),
        ('Trabalho em equipe', 'COMPORTAMENTAL'),
        ('Comunicação', 'COMPORTAMENTAL'),
        ('Liderança', 'COMPORTAMENTAL')
    RETURNING habilidade_id, nome
)
INSERT INTO oportunidade_habilidade (id_habilidade, id_oportunidade)
SELECT
    hi.habilidade_id,
    io.id
FROM
    inserted_opportunities io
CROSS JOIN
    habilidades_inserted hi
WHERE
    (io.titulo = 'Desenvolvedor' AND hi.nome IN ('Java', 'Python', 'Trabalho em equipe', 'Comunicação')) OR
    (io.titulo = 'Analista' AND hi.nome IN ('Python', 'Comunicação', 'Liderança')) OR
    (io.titulo = 'Designer' AND hi.nome IN ('HTML/CSS', 'JavaScript', 'Trabalho em equipe')) OR
    (io.titulo = 'Engenheiro de Software' AND hi.nome IN ('Java', 'HTML/CSS', 'JavaScript', 'Trabalho em equipe', 'Liderança')) OR
    (io.titulo = 'Administrador de Banco de Dados' AND hi.nome IN ('C#', 'SQL', 'Angular', 'Comunicação', 'Liderança')) OR
    (io.titulo = 'Cientista de Dados' AND hi.nome IN ('React', 'Node.js', 'Comunicação')) OR
    (io.titulo = 'Engenheiro de Testes' AND hi.nome IN ('Java', 'Trabalho em equipe'));