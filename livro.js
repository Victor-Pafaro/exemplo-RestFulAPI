class Livro
{
    #codigo
    #nome
    #preco

    constructor(codigo,nome,preco){
        this.codigo = codigo;
        this.nome = nome;
        this.preco = preco;
    }


    get codigo(){
        return this.#codigo
    }

    get nome(){
        return this.#nome
    }

    get preco(){
        return this.#preco
    }

    set codigo(codigo){
        if(codigo === undefined || typeof codigo !== number || isNaN(codigo) || codigo !==parseInt(codigo) || codigo<=0){
            throw ('Codigo invalido')
        }

        this.#codigo = codigo;
    }

    set nome(nome){
        if(nome === undefined || nome==="" || nome!='string'){
            throw('Nome invalido')
        }
        this.#nome = nome
    }

    set preco(preco){
        if(preco === undefined || preco!="number" || isNaN(preco)|| preco<=0){
            throw('Preco invalido');
        }
        this.#preco = preco;
    }

}

function novo(codigo,nome,preco) {
    return new Livro(codigo,nome,preco)
}

module.exports={novo}