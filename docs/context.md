Estoy desarrollando una aplicación con Vue, Typescript y Vuetify. Uso Vitest y Vue Test Utils para testing. El objetivo de la aplicación es que el usuario pueda ingresar los resultados de partidas de juegos de mesa. Puede agregar jugadores, agregar juegos y agregar partidas. 
Para trabajar con formularios tengo Yup para hacer los schemas de validación y para las validaciones en sí uso Vee-validate. 
Para todas las consultas que te haga, escribí el código directamente en el chat, no abras ninguna ventana o muestres el código en otro lugar que no sea este chat.  

Estoy trabajando en las funciones y composables que permiten interactuar con la API de jugadores (getPlayers, getPlayer, updatePlayer y deletePlayer). Tengo armados los composables usePlayers, usePlayer y useDeletePlayer con sus tests correspondientes. Quiero hacer un refactor para tener las funciones unificadas y trabajarlo con TDD. 
El modelo de refactor que tengo tiene 2 composables:
- usePlayerApi: exporta una única función llamada usePlayerApi y dentro tiene las funciones fetchPlayer y updatePlayer. 
- usePlayersApi: exporta una única función llamada usePlayersApi y dentro tiene las funciones fetchPlayers, createPlayer y removePlayer
¿Esta es la manera más profesional de organizar las funciones? ¿Cómo recomendas que encare el refactor? ¿Cómo es conveniente hacer el testing? ¿Puedo reutilizar los tests que ya tenía?