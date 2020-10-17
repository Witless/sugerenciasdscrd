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

echo ID del canal de Sugerencias:
set /p suggestions_chnl=""
echo   "channel": "%suggestions_chnl%", >> config.json

echo ID del rol con permisos para aceptar y rechazar sugerencias:
set /p role_id=""
echo   "rol": "%role_id%", >> config.json

echo ID del canal al que iran las sugerencias al ser enviadas:
set /p pre_channel=""
echo   "pre_channel": "%pre_channel%", >> config.json

echo } >> config.json
echo Archivo de configuracion correctamente creado.
pause