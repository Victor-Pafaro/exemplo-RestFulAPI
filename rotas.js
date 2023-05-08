const Livros = require('./livros.js');
const Livro = require('./livro.js');
const Comunicado = require('./comunicado.js');


// para a rota de CREATE
async function inclusao(req,res)
{
    if(Object.values(req.body).length!=3 || !req.body.codigo || !req.body.nome || !req.body.preco)
    {
        const erro = Comunicado.novo('DdI', 'Dados inesperados', 'Nao foram fornecidos exatamente as 3 informações esperadas de um livro(codigo,nome e preco)').object;
        return res.status(422).json(erro);
    }

    let livro;
    try
    {
        livro = Livro.novo(req.body.codigo, req.body.nome, req.body.preco);
    }
    catch(excecao)
    {
        const erro = Comunicado.novo('TDE', 'Dados de tipos errados', 'Codigo dever ser um numero natural positivo, nome deve ser um texto nao vazio e preco deve ser um numero real positivo').object;
        return res.status(422).json(erro);
    }

    const ret = await Livros.inclua(livro);

    if(ret === null)
    {
        const erro = Comunicado.novo('CBD', 'Sem conexao com o BD', 'Codigo dever ser um numero natural positivo, nome deve ser um texto nao vazio e preco deve ser um numero real positivo').object;
        return res.status(500).json(erro);
    }

    if(ret ===false)
    {
        const erro = Comunicado.novo('LJE', 'Livro já existe', 'Já há livro cadastrado com o código informado').object;
        return res.status(409).json(erro);
    }

    const sucesso = Comunicado.novo('IBS', 'Inclusao bem sucedida', 'O livro foi incluido com sucesso').object;
    return res.status(200).json(sucesso);
}

async function atualizacao(req,res){
    if(Object.values(req.body).length!=3 || !req.body.codigo || !req.body.nome || !req.body.preco)
    {
        const erro = Comunicado.novo('DdI', 'Dados inesperados', 'Nao foram fornecidos exatamente as 3 informações esperadas de um livro(codigo,nome e preco)').object;
        return res.status(422).json(erro);
    }

    let livro;
    try
    {
        livro = Livro.novo(req.body.codigo, req.body.nome, req.body.preco);
    }
    catch(execao){
        const erro = Comunicado.novo('TDE', 'Dados de tipos errados', 'Codigo deve ser um numero natural positivo, nome deve ser um texto nao vazio e preco deve ser um numero real positivo').object;
        return res.status(422).json(erro);
    }

    const codigo = req.params.codigo;
    if(codigo!=livro.codigo)
    {
        const erro = Comunicado.novo('TMC', 'Mudança de código', 'Tentativa de mudar o código do livro').object;
        return res.status(400).json(erro);

    }
    
    let ret = await Livros.recupereUm(codigo);

    if(ret === null)
    {
        const erro = Comunicado.novo('CBD', 'Sem conexao com o BD', 'Codigo dever ser um numero natural positivo, nome deve ser um texto nao vazio e preco deve ser um numero real positivo').object;
        return res.status(500).json(erro);
    }

    if(ret ===false)
    {
        const erro = Comunicado.novo('FNC', 'Falha no comando SQL', 'O comando SQL apresenta algum erro de sintaxe').object;
        return res.status(409).json(erro);
    }

    // Se o retorno do comando SQL for um vetor vazio:
    if(ret.length==0)
    {
        const erro = Comunicado.novo('LNE', 'Livro inexistente', 'Não há livro cadastrado com o código').object;
        return res.status(404).json(erro);
    }

    ret = await Livros.atualize(livro);

    if(ret==null)
    {
        const erro = Comunicado.novo('CBD','Sem conexao com o bd','Nao foi possivel estabelecer conexao com o banco').object;
        return res.status(500).json(erro);
    }

    if(ret==false)
    {
        const erro = Comunicado.novo('FNC', 'Falha no comando SQL', 'O comando sql apresenta algum erro de sintaxe').object;
        return res.status(409).json(erro);
    }

    const sucesso = Comunicado.novo('ABS', 'Alteracao bem sucedida', 'O livro foi atualizado com sucesso').object;
    return res.status(200).json(sucesso);
}

async function remocao(req,res)
{
    if(Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados desnecessariamente').object;
        return res.status(422).json(erro);
    }

    const codigo = req.params.codigo;
    let ret = await Livros.recupereUm(codigo);

    if(ret===null)
    {
        const erro = Comunicado.novo('CBD', 'Sem conexao com o BD', 'Nao foi possivel estabelecer conexao com o bd').object;
        return res.status(500).json(erro);
    }
    if(ret==false)
    {
        const erro = Comunicado.novo('FNC', 'Falha no comando SQL', 'O comando sql apresenta algum erro de sintaxe').object;
        return res.status(409).json(erro);
    }

    if(ret.length==0)
    {
        const erro = Comunicado.novo('LNE', 'Livro inexistente', 'Não há livro cadastrado com o código').object;
        return res.status(404).json(erro);
    }

    ret = await Livros.remova(codigo);

    if(ret===null)
    {
        const erro = Comunicado.novo('CBD', 'Sem conexao com o BD', 'Nao foi possivel estabelecer conexao com o bd').object;
        return res.status(500).json(erro);
    }
    if(ret==false)
    {
        const erro = Comunicado.novo('FNC', 'Falha no comando SQL', 'O comando sql apresenta algum erro de sintaxe').object;
        return res.status(409).json(erro);
    }

    const sucesso = Comunicado.novo('RBS', 'Remocao bem sucedida', 'O livro foi removido com sucesso').object;
    return res.status(200).json(sucesso);

}

async function recuperacaoDeUm(req,res)
{
    if(Object.values(req.body).length!=0){
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados desnecessariamente').object;
        return res.status(422).json(erro);
    }

    const codigo = req.params.codigo;

    const ret = await Livros.recupereUm(codigo);

    if(ret===null)
    {
        const erro = Comunicado.novo('CBD', 'Sem conexao com o BD', 'Nao foi possivel estabelecer conexao com o bd').object;
        return res.status(500).json(erro);
    }

    if(ret===false)
    {
        const erro = Comunicado.novo('FNC', 'Falha no comando SQL', 'O comando sql apresenta algum erro de sintaxe').object;
        return res.status(409).json(erro);
    }

    if(ret.length==0)
    {
        const erro = Comunicado.novo('LNE', 'Livro inexistente', 'Não há livro cadastrado com o código').object;
        return res.status(404).json(erro);
    }

    /* ATENCAO: DIFERENTE DOS OUTROS COMANDOS, QUANDO TRATAMOS DO SELECT O RETORNO DO NOSSO JSON SERA AS INFORMACOES DO DBO E NAO UM COMUNICADO*/
    return res.status(200).json(ret);
}

async function recuperacaoDeTodos(req,res)
{

    if(Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP', 'Dados fornecidos sem proposito', 'Foram fornecidos dados sem proposito').object;
        return res.status(422).json(erro);
    }

    const ret = await Livros.recupereTodos();

    if(ret === null)
    {
        const erro = Comunicado.novo('CBD', 'Sem conexao com o BD', 'Nao foi possivel estabelecer conexao com o bd').object;
        res.status(500).json(erro);
    }

    if(ret === false)
    {
        const erro = Comunicado.novo('FNC', 'Falha no comando SQL', 'O comando sql apresenta algum erro de sintaxe').object;
        res.status(409).json(erro);
    }

    return res.status(200).json(ret);
}

module.exports = {inclusao, atualizacao, remocao, recuperacaoDeUm, recuperacaoDeTodos}

 