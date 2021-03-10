# api-navers

## CodeSandBox
Acesse clicando no link
[CodeSandBox](https://codesandbox.io/s/teste-estagio-ohq5u?file=/index.html)

### Tecnologias utilizada:
```
node => versão 14.15.1
express => versão 4.17.1
node-pg => 8.5.1

postgres
```

### Testando o sistema:

Inicialmente para que o sistema possa ser testado, pelo fato de não ter sido utilizado um framework que automatize a criação das models, nem do banco de dados, deve ser feito de forma manual a criação do banco, no projeto foi utilizado o postgres, abaixo um exemplo de configuração do banco de dados ou pode ser visto no arquivo "db.js" que se encontra dentro de config: 

```
    user: 'postgres',
    password: 'postgres',
    database: 'NaveTeam',
    host: 'localhost',
    port: 5432
```

Para a criação das tabelas, que também foi feito de forma manual foi criado os arquivos que se encontram em "database" que ao rodar no banco utilizando a query tool ele cria as tabelas da forma como foi utilizada.

Para rodar o sistema inicialmente deve-se instalar as dependencias utilizando:
```
npm i
```
Após as dependencias terem sido devidamente instaladas utilize o comando abaixo para rodar o servidor.

```
npm serve run
```

