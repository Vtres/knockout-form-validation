**Avaliação**

Esse é o template inicial para o projeto final que compreende o módulo 2 do curso de Formação em Oracle Cloud Commerce.

O objetivo desse template é poupar tempo com um exemplo estático de HTML e CSS, porém sem nenhuma funcionalidade que é necessária para finalizar o projeto.

Seu trabalho aqui é adicionar interatividade ao projeto refatorando o código estático disponível nesse template.

O objetivo é integrar o knockout e knockout-validation no formulário disponibilizado efetuando consulta de CEP e retornando essas informações nos seus respectivos campos, não deve utilizar Jquery.

**Requisitos**:

Ter o Node instalado.

Link para download -> https://nodejs.org/en/download/

**Começar**

Após efetuar o fork do projeto

Acessar o diretório da pasta knockout-form-validation

Abrir o terminal e digitar o comando -> **npm install**

Após a instalação das dependecias.

Digitar o comando **npm start** ou **npm run-script start**

Para rodar o projeto localmente

Você pode começar abrindo o arquivo index.html no navegador de internet e editor de texto preferido.

**Critérios de Aceite**:

Utilizar knockout para iteração e validação do formulário, exibição de erro.

Utilizar Knockout-validations para validação do formulário, criando as regras de validação.

Adicionar a chamada a api de busca de CEP no botão Validar CEP, renderizar as informações dinamicamente sem atualização da pagina e utilizando knockout.

Deverá ser bloqueado as informações (Exeto complemento), quando a API retornar valores valido para cada um dos campos, caso contrario deverá ser preenchido manualmente.

Habilitar o botão de enviar formulário somente quando todos os campos obrigátorios estiverem preenchidos.

Desabilitar o botão de enviar formulário quando os campos obrigátorios não estiverem preenchidos.

Ao enviar o formuário deverá ser printado um objeto JSON com as informações do formulário no seguinte formato:
```
{
  'firstName': 'Icaro',
  'lastName' : 'Baruffi',
  'phone' : '54981123456'
  'cep': 99900000,
  'address' : 'Rua pedro dallacorte',
  'number' : 548,
  'complement' : 'casa verde',
  'district': 'Centro',
  'city' : 'Getulio Vargas',
  'state': 'RS'
}
```

OBS: CEP e number serão numeros inteiros.

state será apenas a sigla.

As demais propriedades do Json serão String.
