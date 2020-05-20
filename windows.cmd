@echo off
title Bot Suggest
echo Vamos a configurar el bot.
echo Token del Bot:
set /p bot_token=""
echo { > config.json
echo   "token": "%bot_token%", >> config.json

echo Prefix del Bot:
set /p bot_prefix=""
echo   "prefix": "%bot_prefix%", >> config.json

echo Canal de Sugerencias:
set /p suggestions_chnl=""
echo   "channel": "%suggestions_chnl%" >> config.json

echo } >> config.json
echo {} > suggestions.json
echo Archivo de configuracion correctamente creado.
pause