#!/bin/bash
echo "Vamos a configurar tu bot."
echo "Token del Bot:"
read bot_token
echo "Prefix del Bot:"
read bot_prefix
echo "ID del canal para Sugerencias:"
read suggestions_chnl
echo "ID del rol"
read rol_ID
echo "{
  \"token\": \"$bot_token\",
  \"prefix\": \"$bot_prefix\",
  \"channel\": \"$suggestions_chnl\",
  \"rol\": \"$rol_ID\"
}" >config.json
echo "Archivo de configuracion creado correctamente."
