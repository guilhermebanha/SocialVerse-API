const connection = require('./connection');
const MD5Encrypt = require('./encryptionModel');
const mime = require('mime-types');
const path = require('path');

const getAll = async () =>{
    const [pesquisa] = await connection.execute('SELECT * FROM User');
    return pesquisa;
};
const getAllPosts = async () =>{
    const [posts] = await connection.execute('SELECT * FROM Post');
    return posts;
};

const deleteById = async (id)=>{
    const total = connection.execute('DELETE FROM `post` WHERE ID ='+id);
    return total; 
};


const uploadPost = async (dados) =>{

    var file = MD5Encrypt((dados.email + Math.floor(Math.random() * 5000)));
    var ext = mime.extension(mime.lookup(dados.image.name));
    file += '.';
    file += ext;
    const dir = path.join(__dirname, '..') +'/db_images/imgdir/user/'+file;
    console.log('1'+dir);
    dados.image.mv(dir, (err) => {
        if(err) throw err;
    });

    console.log('2'+dir);

    console.log(dados.content);
    var query = 'INSERT INTO `post`(`User_ID`, `Content`, `Like`, `Dislike`, `MediaPath`) VALUES ('+dados.email+',"'+dados.content+'",0,0,"'+file+'")';
    const insert = await connection.execute(query);
    console.log(insert);
    console.log('####\n'+query+'\n####');
    console.log('@@@@@@@'+connection);
    return true;
};

//#region Codigo Obsuleto
/*
const getLength = async () =>{
    const [totalL] = await connection.execute('SELECT COUNT(`id`) AS ID FROM `post`;');
    return totalL;
};
*/
//#endregion

module.exports = [
    getAll,
    getAllPosts,
    uploadPost,
    deleteById,
];