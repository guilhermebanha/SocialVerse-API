const sessionModel = require('../models/sessionModel');

const login = async(request, response) =>{

    const dados = {
        email: request.query.email,
        password: request.query.password
    };

    const data = await sessionModel.login({email: dados.email, password: dados.password});
    if(data === true)
        return response.status(200).json({Status: 'sucess'});
    else
        return response.status(400).json({Status: 'error'});
};

const register = async(request,response) =>{

    const dados = {
        name: request.query.name,
        surname: request.query.surname,
        dob: request.query.dob,
        email: request.query.email,
        pwd: request.query.pwd,

    };

    const mdados = await sessionModel.register(dados);
    if(mdados == 1)
        return response.status(200).json({Status: 'sucess'});
    else
        return response.status(400).json({Status: 'failure'});



};

module.exports = {
    login,
    register,
};