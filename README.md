# "Suggest" Bot de Discord

Suggest es un bot dedicado a enviar sugerencias a un canal definido en un
servidor de Discord

## Instalación y Uso

1. Haz fork del repositorio y clónalo a tu dispositivo.
2. Usa el comando `npm i` en la terminal (carpeta del bot).
3. Usa el comando `npm run windows` o `npm run linux` dependiendo de tu SO.
   Después introduce los datos requeridos.
4. Arranca el bot con `node .` o si usas PM2, con
   `pm2 start src/index.js --name suggest`.

## Comandos

Recuerda usar delante del comando el prefix configurado.

- **sugerir {Contenido de la Sugerencia}** | Manda la sugerencia.
- **asugerir {Contenido de la Sugerencia}** | Manda la sugerencia anónimamente.
- **aceptar {ID del Mensaje} [Razón]** | Acepta la sugerencia.
- **posible {ID del Mensaje} [Razón]** | Marca la sugerencia como posible.
- **rechazar {ID del Mensaje} [Razón]** | Rechaza la sugerencia.

## Contribución

Este bot está hecho en aproximadamente 2 horas, por lo que cualquier ayuda es
muy agradecida. Los Pull Requests son bienvenidos <3

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
