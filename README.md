# Desafio TecadiLabs

Fui desafiado a realizar o desenvolvimento deste aplicativo com as seguintes regras declaradas:
1. Desenvolver um CRUD de cadastro de produtos, funcional nas 4 operações básicas, acessível após uma interface de autenticação no formato login/senha.
2. Criar tela de formulário para cadastro/alteração e exclusão de produtos com os seguintes campos: Código Cliente, Descrição, UM, Grupo, Peso Bruto e Peso Líquido. Os campos de UM e Grupo devem ser um Dropdown onde sua lista de exibição deverá ser requisitada nos endpoints de GRUPOS e UNIDADES DE MEDIDAS, para selecionar somente o que existe no nosso sistema.
3. Criar tela para listar os produtos (GRID) com paginação, com possibilidade de o usuário selecionar a quantidade de registros que desejar (5 opções no menu).
4. Implementar filtro para exibir somente produtos que contenham saldo.
5. Utilizar o sistema de Containerização para o projeto.

## Com estas regras/desafios declarados tive as seguintes decisões:

Trabalhar com o novo App router do framework do Next.JS visando a maior performance para o projeto. Ofuscar o endpoint fornecido pela empresa dentro do aplicativo, assim não permitindo a descoberta do cliente de qual servidor as informações são retiradas.

Para facilitar a inicialização do projeto utilizei o T3 Stack, como uma boa prática e tranquilidade de ter as bibliotecas previamente configuradas, este stack vem composto das seguintes bibliotecas:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com)

## Eslint e Prettier

Referente aos padrões de Eslint optei por utilizar uma configuração que recentemente esta ganhando bastante atração, [JoshuaKGoldberg/linting-typescript-in-2023](https://github.com/JoshuaKGoldberg/linting-typescript-in-2023). Tem uma boa base e gosto de segui-la.

## Como inicializar o projeto.

Para inicializar o projeto basta criar um arquivo .env no root do projeto seguindo o template fornecido pelo .env.example. Então basta buildar a imagem docker utilizando o `docker build -t {nome-imagem} .` e inicializar o container com `docker run -d -p {porta-externa}:3000 {nome-image}`.
