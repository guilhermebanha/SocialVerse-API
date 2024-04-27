const connection = require('./connection');
const MD5Encrypt = require('./encryptionModel');


const register = async (dados) =>{

    const {name,surname,dob,email,password} = dados;
    const query = 'INSERT INTO tbl_user(`name`,`surname`,`dob`,`email`,`password`,`followers`,`following`,`deleted`)'
    +'VALUES (?,?,?,?,?,?,?,0,0,0)';

    const EncryptedPassword = MD5Encrypt(password);

    const [registro] = await connection.execute(query,[name,surname,dob,email,EncryptedPassword]);
    return registro;
};

const login = async (dados) =>{

    const {email, password} = dados;



    const query = 'SELECT * FROM `tbl_usr` WHERE email = ? && password = ?;';

    const [row_value] = await connection.execute(query,[email,MD5Encrypt(password)]);
    console.log(row_value.length);

    if(row_value.length === 1){
        return true;
    }
    else
        return false;

};

module.exports = {
    register,
    login,
};