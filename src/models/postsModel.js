import 'dotenv/config';
import { ObjectId } from "mongodb"
import conectarAoBanco from "../config/dbConfig.js"

// Esta linha cria uma conexão com o banco de dados, utilizando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)


// Função assíncrona para obter todos os posts do banco de dados.
export async function getTodosPosts() {
    // Obtém o banco de dados 'instabytes' da conexão estabelecida.
        const db = conexao.db("instabytes")
    // Obtém a coleção 'posts' do banco de dados.
        const colecao = db.collection('posts')
    // Retorna um array com todos os documentos da coleção 'posts'.
        return colecao.find().toArray()
};

export async function criarPost(novoPost) {
    const db = conexao.db("instabytes")
    const colecao = db.collection('posts')
    return colecao.insertOne(novoPost)
}
 
export async function atualizarPost(id, novoPost) {
    const db = conexao.db("instabytes")
    const colecao = db.collection('posts')
    const objId = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novoPost} )
}
 