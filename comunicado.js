class Comunicado
{
    #codigo
    #mensagem
    #descricao

    constructor(codigo,mensagem,descricao){
        this.codigo = codigo;
        this.mensagem = mensagem;
        this.descricao = descricao;
    }


    get codigo(){
        return this.#codigo
    }

    get mensagem(){
        return this.#mensagem
    }

    get descricao(){
        return this.#descricao
    }

    set codigo(codigo){
        if(codigo === undefined || typeof codigo !== 'string' || codigo.length!==3){
            throw ('Codigo invalido')
        }

        this.#codigo = codigo;
    }

    set mensagem(mensagem){
        if(mensagem === undefined || mensagem==="" || mensagem!='string'){
            throw('mensagem invalida')
        }
        this.#mensagem = mensagem
    }

    set descricao(descricao){
        if(descricao === undefined || descricao!='string' || descricao===''){
            throw('descricao invalida');
        }
        this.#descricao = descricao;
    }

    get Object()
    {
        return {codigo:this.#codigo, mensagem:this.#mensagem, descricao:this.#descricao};
    }

}

function novo(codigo,mensagem,descricao) {
    return new Comunicado(codigo,mensagem,descricao)
}

module.exports={novo}