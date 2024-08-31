const fs = require('fs');
let config = process.argv[2];

// Leer variables de entorno
const production = process.env.IS_PRODUCTION;
const apiUrl = process.env.API_URL_FRONT;
const apiKey = process.env.API_KEY;

// Verificar si las variables están definidas
let hasMissingVariables = false;
const missingVariables = [];

if (production === undefined) {
  hasMissingVariables = true;
  missingVariables.push('IS_PRODUCTION');
}

if (apiUrl === undefined) {
  hasMissingVariables = true;
  missingVariables.push('API_URL_FRONT');
}

if (apiKey === undefined) {
  hasMissingVariables = true;
  missingVariables.push('API_KEY');
}

// Procesar variables de entorno o mensaje de error
if (hasMissingVariables) {
  const errorMessage = `Las siguientes variables de entorno no están definidas: ${missingVariables.join(', ')}`;
  console.error(errorMessage);
} else {
  // Leer archivo actual y reemplazar variables
  const environmentContent = fs.readFileSync('./src/environments/environment.ts').toString();

  const replacedContent = environmentContent
    .replace(/(\$\{IS_PRODUCTION\})/g, production)
    .replace(/(\$\{API_URL_FRONT\})/g, apiUrl)
    .replace(/(\$\{API_KEY\})/g, apiKey);

  // Escribir archivo con variables reemplazadas
  
  if(config)
    fs.writeFileSync(`./src/environments/environment.${config}.ts, replacedContent`);
  else
    fs.writeFileSync("./src/environments/environment.ts", replacedContent);

  console.log(`Variables de entorno reemplazadas correctamente en environment.${config}.ts`);
}