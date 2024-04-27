const crudModel = require('../models/crudModel');
const fs = require('fs');
const path = require('path');
const loginModel = require('../models/sessionModel');



// Implementar verificação do user que deleta
const deleteById = async(request,response) => {
    var x = await crudModel.deleteById(request.query.id);
    console.log(x);
    return response.status(200).send();
};

const sendImage = async(request, response) => {
    var mediapth = request.query.mediapath;
    const dirplace = path.join(__dirname,'..', '/db_images/imgdir/user/');
    const files = await fs.promises.readdir(dirplace);
    for(let i = 0;i<files.length; i++){
        console.log(files[i]);
        console.log('path: ' + mediapth);
        console.log(path.join(dirplace,files[i]));
        console.log(files[i].startsWith(mediapth));
        if(files[i].split('.')[0] === mediapth)
            return response.sendFile(path.join(dirplace,files[i]));
    //return response.status(200).json(fs.readFileSync(path.join(dirplace,files[i]),'base64'));
    }
    return response.sendStatus(500);

};

const uploadPost = async(request, response) => {
    const dados = {
        content : request.query.content,
        image : request.files.image,
        email : request.query.email
    };
    console.log(dados.image);
    const result = await crudModel.uploadPost({content : dados.content, email: dados.email, image : dados.image});
    console.log(result);
    return response.status(200).json();
};

const getAll = async(request, response) => {

    const data = await loginModel.getAll();
    return response.status(200).json(data);

};

const getAllPosts = async(request, response) =>{
    // Mudar para DataModel
    try{
        const data = await loginModel.getAllPosts();
        return response.status(200).json(data);
    }
    catch{
        return response.status(500);
    }

};

//#region Código obsuleto

/*
const getLength = async(request, response) => {

    const result = await testModel.getLength();
    console.log(Object.values(result)[0]['ID']);

    return response.send(result[0]);
};
*/

//#endregion

module.exports =  {
    deleteById,
    sendImage,
    uploadPost,
    getAll,
    getAllPosts,
};