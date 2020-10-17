#!/bin/bash
echo "Vamos a configurar tu bot."
echo "Token del Bot:"
read bot_token
echo "Prefix del Bot:"
read bot_prefix
echo "ID del canal para Sugerencias:"
read suggestions_chnl
echo "ID del rol con permisos para aceptar y rechazar sugerencias:"
read role_id
echo "ID del canal al que iran las sugerencias al ser enviadas:"
read pre_channel
echo "{
  \"token\": \"$bot_token\",
  \"prefix\": \"$bot_prefix\",
  \"channel\": \"$suggestions_chnl\",
  \"rol\": \"$role_id\",
  \"pre_channel\": \"$pre_channel\"
}" >config.json
echo "Archivo de configuracion creado correctamente."
