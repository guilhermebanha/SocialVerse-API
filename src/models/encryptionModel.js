const crypto = require('crypto');
const MD5Encrypt = (data) =>{
    const hash = crypto.createHash('md5');
    hash.update(data);
    return hash.digest('hex');
};

module.exports = MD5Encrypt;