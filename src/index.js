import api from './../api/api.js'
import css from "./style.css"

//  api.getCep("99700252").then((result) => {
//   console.log(result)
//  })

var endereco = document.querySelector("#logradouro");
endereco.setAttribute("disabled", "disabled");

var residencia = document.querySelector("#residencia");
residencia.setAttribute("disabled", "disabled");

var complemento = document.querySelector("#complementos");
complemento.setAttribute("disabled", "disabled");

var bairro = document.querySelector("#bairro");
bairro.setAttribute("disabled", "disabled");

var cidade = document.querySelector("#localidade");
cidade.setAttribute("disabled", "disabled");

var estado = document.querySelector("#uf");
estado.setAttribute("disabled", "disabled");

var btnSubmeter = document.querySelector("#btnSubmit");

// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    var valid = this;
    var self = this;
    

    self.nome = ko.observable("").extend({ required: {
        params: true,
        message: " O campo Nome é obrigatório!",
    }}).extend({ minLength: {
        params: 3,
        message: "Espera-se no minimo 3 caracters"
    }}).extend({ maxLength:{
        params: 8,
        message: "Espera-se no max 8 caracters"
    }}).extend({ pattern:{
        params: "^[A-Za-zÀ-ú ']+$",
        message: "Sem espaços e sem numeros"
    }});

    // SOBRENOME
    self.sobrenome = ko.observable("").extend({ required: {
        params: true,
        message: " O campo Sobrenome é obrigatório!"
    }}).extend({ pattern:{
        params: "^[A-Za-zÀ-ú ']+$",
        message: "Sem espaços e sem numeros"
    }});

    // DDD
    self.ddd = ko.observable("").extend({ required:{
        params: true,
        message: " O campo DDD é obrigatório!"
    }}).extend({ minLength: {
        params: 2,
        message: "Espera-se no minimo 2 caracters"
    }}).extend({ maxLength:{
        params: 2,
        message: "Espera-se no máximo 2 caracters"
    }}).extend({ number:{
        params: true,
        message: "Apenas numeros"
    }});

    // TELEFONE
    self.telefone = ko.observable("").extend({ required: {
        params: true,
        message: " O campo Telefone é obrigatório!"
    }}).extend({ number:{
        params: true,
        message: "Apenas numeros"
    }}).extend({ minLength: {
        params: 9,
        message: "Espera-se 9 caracters"
    }}).extend({ maxLength:{
        params: 9,
        message: "Espera-se 9 caracters"
    }});

    // CEP
    self.cep = ko.observable("").extend({ required: {
        params: true,
        message: " O campo CEP é obrigatório!"
    }}).extend({ number:{
        params: true,
        message: "Apenas numeros"
    }}).extend({ minLength: {
        params: 8,
        message: "Espera-se 8 caracters"
    }}).extend({ maxLength:{
        params: 8,
        message: "Espera-se 8 caracters"
    }});

    //===============================================================
    self.endereco = ko.observable("").extend({ required: {
        params: true,
        message: " O campo Endereço é obrigatório!"
    }});
    
    self.residencia = ko.observable("").extend({ required: {
        params: true,
        message: " O campo Residencia é obrigatório!"
    }});

    self.complemento = ko.observable("");

    self.bairro = ko.observable("").extend({ required: {
        params: true,
        message: " O campo Bairro é obrigatório!"
    }}).extend({ pattern:{
        params: "^[A-Za-zÀ-ú ']+$",
        message: "Sem espaços e sem numeros"
    }});

    self.cidade = ko.observable("").extend({ required: {
        params: true,
        message: " O campo Cidade é obrigatório!"
    }}).extend({ pattern:{
        params: "^[A-Za-zÀ-ú ']+$",
        message: "Sem espaços e sem numeros"
    }});

    self.estado = ko.observable("").extend({ required: {
        params: true,
        message: " O campo Estado é obrigatório!"
    }}).extend({ pattern:{
        params: "^[A-Za-zÀ-ú ']+$",
        message: "Sem espaços e sem numeros"
    }});
   

    self.Erros = ko.validation.group([self.nome,self.sobrenome,self.telefone,self.ddd, self.cep]);
    
    self.validaCep = function(){
        var recebeCep = vm.cep();
       
        if(self.Erros().length == 0){
            //alert("Formulário válido");
            api.getCep(recebeCep).then((result) => {
                dadosApi(result);
            })
            endereco.removeAttribute("disabled");
            residencia.removeAttribute("disabled");
            complemento.removeAttribute("disabled");
            bairro.removeAttribute("disabled");
            cidade.removeAttribute("disabled");
            estado.removeAttribute("disabled");
            btnSubmeter.removeAttribute("disabled");  
        }else{
            self.Erros.showAllMessages();  
        }
           
        
    }
    
    self.submeter = function(){
        self.Erros = ko.validation.group([self.bairro,self.endereco,self.residencia,self.cidade, self.estado]);
        if(self.Erros().length == 0){
            var resultadoFinal = {
                'Nome': self.nome(),
                'Sobrenome' : self.sobrenome(),
                'DDD': self.ddd(),
                'Telefone':self.telefone(),
                'CEP': self.cep(),
                'Endereço': self.endereco(),
                'N° Residencia': self.residencia(),
                'Complemento': self.complemento(),
                'Bairro' : self.bairro(),
                'Cidade':self.cidade(),
                'Estado':self.estado()
            }
            
            console.log(resultadoFinal);
            
        }else{
            self.Erros.showAllMessages();  
        }    
    }
    const dadosApi = (result)=>{
               
        self.cidade(result.localidade)
        self.bairro(result.bairro);
        self.endereco(result.logradouro); 
        self.ddd(result.ddd);
        self.residencia();
        self.complemento(result.complemento);
        self.estado(result.uf);

        for(const campo in result){
           if(document.querySelector("#"+campo)){
                if(result[campo]!= ""){
                    adicionaAtributo(campo);
                }
            }
        }
    }

};

 function adicionaAtributo(campo){
    document.querySelector("#"+campo).setAttribute("disabled", "disabled");
 }


const vm = new AppViewModel();
ko.validation.init(); 
ko.applyBindings(vm);

// can be used in the navigation console
window.appViewModel = vm;

