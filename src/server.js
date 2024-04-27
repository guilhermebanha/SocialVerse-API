const app = require('./app');
require('dotenv').config();

// Utiliza entre a porta padrão e alternativa.
const PORT = process.env.APP_PORT || process.env.APP_PORT_ALTERNATE;

app.listen(PORT, () => console.log(`API Ligada na porta: ${PORT}`));