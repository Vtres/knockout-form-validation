import api from './../api/api.js'
import css from "./style.css"

//  api.getCep("99700252").then((result) => {
//   console.log(result)
//  })

// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    var valid = this;
    var self = this;
    
    self.nome = ko.observable().extend({ required: {
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
    self.sobrenome = ko.observable().extend({ required: {
        params: true,
        message: " O campo Sobrenome é obrigatório!"
    }}).extend({ pattern:{
        params: "^[A-Za-zÀ-ú ']+$",
        message: "Sem espaços e sem numeros"
    }});

    // DDD
    self.ddd = ko.observable().extend({ required:{
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
    self.telefone = ko.observable().extend({ required: {
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
    }}).extend({pattern: {  
        params: '^[9]{1}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}$',
        message: 'Número de telefone não corresponde ao padrão Brasil'
         
    }});

    // CEP
    self.cep = ko.observable().extend({ required: {
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
    
    self.endereco = ko.observable().extend({ required: {
        params: true,
        message: " O campo Endereço é obrigatório!"
    }});
    self.enderecoo = ko.observable(false)

    self.residencia = ko.observable().extend({ required: {
        params: true,
        message: " O campo Residencia é obrigatório!"
    }});
    self.residenciaa = ko.observable(false);

    self.complemento = ko.observable();

    self.bairro = ko.observable().extend({ required: {
        params: true,
        message: " O campo Bairro é obrigatório!"
    }}).extend({ pattern:{
        params: "^[A-Za-zÀ-ú ']+$",
        message: "Sem espaços e sem numeros"
    }});
    self.bairroo = ko.observable(false);

    self.cidade = ko.observable().extend({ required: {
        params: true,
        message: " O campo Cidade é obrigatório!"
    }}).extend({ pattern:{
        params: "^[A-Za-zÀ-ú ']+$",
        message: "Sem espaços e sem numeros"
    }});
    self.cidadee = ko.observable(false);

    self.estado = ko.observable().extend({ required: {
        params: true,
        message: " O campo Estado é obrigatório!"
    }}).extend({ pattern:{
        params: "^[A-Za-zÀ-ú ']+$",
        message: "Sem espaços e sem numeros"
    }});
    self.estadoo = ko.observable(false);
   
    // self.nome,self.sobrenome,self.telefone,self.ddd, 
    self.Erros = ko.validation.group([self.cep]);
    
    self.validaCep = function(){
        var recebeCep = vm.cep();
        
        if(self.Erros().length == 0){
            
            api.getCep(recebeCep).then((result) => {
                if(result.erro == true){
                   
                    $(".invisivel").show();
                    self.enderecoo(false)
                    self.endereco("");
                    self.residenciaa(false);
                    self.residenciaa("");
                    self.bairroo(false);
                    self.bairroo("");
                    self.cidadee(false);
                    self.cidadee("");
                    self.estadoo(false);
                    self.estadoo("");
                    
                }else{
                    $(".invisivel").hide();
                    
                    self.cidade(result.localidade)
                    if(self.cidade() != ""){
                        self.cidadee(false)
                    }else{
                        self.cidadee(true)
                    }

                    self.bairro(result.bairro);
                    if(self.bairro() != ""){
                        self.bairroo(false)
                    }else{
                        self.bairroo(true)
                    }
                    self.endereco(result.logradouro); 
                    if(self.endereco() != ""){
                        self.enderecoo(false)
                    }else{
                        self.enderecoo(true)
                    }

                    self.residencia();
                    self.residenciaa(true)
                    
                    self.complemento(result.complemento);
                    self.estado(result.uf);
                    if(self.estado() != ""){
                        self.estadoo(false)
                    }else{
                        self.estadoo(true)
                    } 
                }               
            })      
        }else{
            self.Erros.showAllMessages();  
        }      
    }
    
    self.submeter = function(){
        self.Erros = ko.validation.group([self.nome,self.sobrenome,self.telefone,self.ddd, self.cep,self.bairro,self.endereco,self.residencia,self.cidade, self.estado]);
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

};


const vm = new AppViewModel();
window.appViewModel = vm;
ko.validation.init(); 

vm.isValid = ko.computed(function(){
    return ko.validatedObservable(vm).isValid();
})

ko.applyBindings(vm);