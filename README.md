# APP Influencer - API

## Divisão

1. micro_auth (cuida da autenticação);
2. api (cuida das funcionalidades específicas);

## Estrutura e técnologias

* Na micro_auth, foi escolhido uma abordagem mais detalhada e fragmentada, onde o código não depende de framework específico, sendo que na main temos a adpatação do core para express;
    - Não foi utilizado libs de validação, pois o intuíto é demonstrar o conhecimento com NodeJS;
    - Foi usado sqlite para o banco de dados;
    - Foi realizado testes da controller;
    - Para manter o padrão do código, foi utilizado: (typescript, eslint, prettier, husky, jest e git-commit-msg-linter);
    - Melhorias possíveis, existem vários pontos, mas podemos destacar:
        - Criação de adpter para o express (tanto rotas, quanto middleware);
        - Uso de factories;
        - Testes abrangendo todo o sistema;

* Na api, foi escolhido a utilização de mais frameworks e libs. Como princípal destaque o NestJs (o desenvolvimento foi em cima da documentação do mesmo para seguir o padrão do framework);
    - Escolha de uso do NestJs, rodando sobre o express (poderia ser trocado pelo Fastify para torna-lo mais rápido);
    - Utilização de libs de validação (class-validator e class-transformer);
    - Utilização para banco de dados (Prisma e PostgreSQL);
    - Utilização do Amazon S3 para armazenar imagens;
