#language: pt

Funcionalidade: Listagem
    
    Como usuário desejo acessar a Listagem
    Para que eu possa visualizar meus dados

Cenário: Listagem sem registros
    Dado que o site não possui registros
    Quando acessar a listagem
    Então devo visualizar a listagem vazia

Cenário: Listagem com apenas um registro
    Dado possua apenas um registro
    Quando acessar a listagem
    Então devo visualizar apenas um registro 

