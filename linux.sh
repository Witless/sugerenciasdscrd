#!/bin/bash
echo "Vamos a configurar tu bot."
echo "Token del Bot:"
read bot_token
echo "Prefix del Bot:"
read bot_prefix
echo "Canal para Sugerencias:"
read suggestions_chnl
echo "{
  \"token\": \"$bot_token\",
  \"prefix\": \"$bot_prefix\",
  \"channel\": \"$suggestions_chnl\"
}" > config.json
echo "Archivo de configuracion creado correctamente.."
  