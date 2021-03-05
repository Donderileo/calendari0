# Calendari0

### Esse projeto é um CRUD feito utilizando o framework Next.js (APIs Rest e FrontEnd), a ideia central é um sistema com usuários e criação de eventos, tal como uma agenda pessoal ou um calendário.

## As funcionalidades implementadas são:

* Cadastro e Login de usuário:
    * Feito pelo [NextAuth](https://next-auth.js.org/), utiliza o sistema gratuito da [Auth0](https://auth0.com/), porém o NextAuth permite a utilização de diversos sistemas de login.

* Adição de eventos:
    * Na página /create por meio de formulários, criamos um novo evento e enviamos para o banco de dados com uma requisição post por meio da API /api/eventos.

* Edição de eventos:
    * Na própria página / temos a opção de editar o evento no botão do componente Evento e atualizamos por uma requisição put no banco de dados

* Remoção de eventos:
    * Da mesma forma que a edição, fazemos a requisição delete para a api /remove, clicando no botão de remoção, que remove o evento do banco.

## Para executar o projeto:

### Clone este projeto:

```
    git clone https://github.com/Donderileo/calendari0.git
```

### Dentro da pasta do projeto, faça as instalações de dependências com o yarn.

```
    yarn install
```

### Para esse projeto, utilizamos dois serviços em cloud, portanto, crie uma conta gratuitamente no [Auth0](https://auth0.com/) e também no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).

**MongoDB**:

* Criação de um cluster
* Criação de um usuário em NetworkAcess (memorize ou salve a senha)
* Em NetworkAcess adicione o ip 0.0.0.0/0 para liberar acesso a todos os IP's, ou apenas seu próprio IP se o objetivo for apenas rodar o projeto no localhost.


**NextAuth**:

* Crie uma aplicação
* Em allowed Callback URLs insira http://localhost:3000/api/auth/callback/auth0 ou /api/auth/callback/auth0 depois do seu domínio.

### Agora para conseguir linkar nosso projeto a esses dois serviços, precisamos de variáveis de ambiente.

* Crie um arquivo .env.local na raiz do projeto.
* Crie as seguintes variáveis de acordo com os valores do seu banco de dados e da sua aplicação Auth0.

```
MONGODB_URI =  
MONGODB_DB = 

NEXTAUTH_URL = http://localhost:3000
AUTH0_CLIENT_ID = 
AUTH0_CLIENT_SECRET = 
AUTH0_DOMAIN =   
```

#### MONGODB_URI está disponível em conexão com a aplicação no seu cluster.
#### MONGODB_DB é o nome do database criado
#### Variávies de auth estão disponíveis nas informações da aplicação.

## E por fim, só rodar!!

```
yarn dev
```

## Tecnologias utilizadas:

* Next.js
* TailWindCSS
* MongoDB
* TypeScript
* NextAuth (Auth0)

