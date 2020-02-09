# "Suggest" Bot de Discord

Suggest es un bot dedicado a enviar sugerencias a un canal definido en un servidor de Discord

## Instalación

Usa el controlador de paquetes de node

```
npm i -y 
```

## Uso

En el fichero ``config.json`` podrás: 

- Añadir el token del bot (nesesario)
- Definir el nombre del fichero dónde se guardarán los datos

Una vez rellenado el fichero ``config.json`` podrás iniciar el bot con 
```bash
node Main.js
```

## Comandos

**!canal** {IDCanal} | Añade el canal dónde quieres que se envíen las sugerencias

**!sugerir** {Sugerencia} | Envía una nueva sugerencia

## Contribución
Este bot está hecho en aprox. 2 horas, por lo que cualquier ayuda es muy agradecida, los Pull Requests son bienvenidos <3

## Licencia
[MIT](https://choosealicense.com/licenses/mit/)
