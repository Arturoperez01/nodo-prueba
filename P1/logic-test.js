// No editar
const teams = [
  { id: 1, country: 'Spain', name: 'Real Madrid C.F.' },
  { id: 2, country: 'Italy', name: 'A.C. Milan' },
  { id: 3, country: 'Spain', name: 'Futbol Club Barcelona' },
  { id: 4, country: 'Germany', name: 'FC Bayern Munich' },
  { id: 5, country: 'England', name: 'Liverpool F.C.' },
  { id: 6, country: 'Netherlands', name: 'AFC Ajax' },
  { id: 7, country: 'Italy', name: 'Inter Milan' },
  { id: 8, country: 'England', name: 'Manchester United F.C.' },
  { id: 9, country: 'England', name: 'Chelsea F.C.' },
  { id: 10, country: 'Portugal', name: 'FC Porto' },
  { id: 11, country: 'Germany', name: 'Borussia Dortmund' },
  { id: 12, country: 'Italy', name: 'Juventus FC' },
  { id: 13, country: 'France', name: 'Olympique Marseille' }

]

const leagues = [
  { id: 1, country: 'England', name: 'Premier League' },
  { id: 2, country: 'Germany', name: 'Bundesliga' },
  { id: 3, country: 'Netherlands', name: 'Eredivisie' },
  { id: 4, country: 'Spain', name: 'La Liga' },
  { id: 5, country: 'Italy', name: 'Serie A' },
  { id: 6, country: 'Portugal', name: 'Liga NOS' },
  { id: 7, country: 'France', name: 'Lige 1' }
]

const teamsByLeague = [
  { teamId: 12, leagueId: 5 },
  { teamId: 6, leagueId: 3 },
  { teamId: 2, leagueId: 5 },
  { teamId: 3, leagueId: 4 },
  { teamId: 4, leagueId: 2 },
  { teamId: 8, leagueId: 1 },
  { teamId: 10, leagueId: 6 },
  { teamId: 5, leagueId: 1 },
  { teamId: 7, leagueId: 5 },
  { teamId: 9, leagueId: 1 },
  { teamId: 11, leagueId: 2 },
  { teamId: 1, leagueId: 4 },
  { teamId: 13, leagueId: 7 }
]

const winsByTeams = [
  { teamId: 10, wins: 2 },
  { teamId: 6, wins: 4 },
  { teamId: 5, wins: 5 },
  { teamId: 1, wins: 13 },
  { teamId: 7, wins: 3 },
  { teamId: 4, wins: 5 },
  { teamId: 8, wins: 3 },
  { teamId: 2, wins: 7 },
  { teamId: 9, wins: 1 },
  { teamId: 3, wins: 5 },
  { teamId: 11, wins: 1 },
  { teamId: 12, wins: 2 },
  { teamId: 13, wins: 1 }
]

// Retorna las relaciones de las ligas con los equipos y sus victorias.
// Requiere el objeto de una liga
function leaguesWithTeamandWins(league) {
  return teamsByLeague.filter(teamByLeague=>league.id==teamByLeague.leagueId).map(team=>{
                                  return joinedResult = winsByTeams.find(vic=>vic.teamId==team.teamId);
                               });

}

/*
  SECCIÓN PROBLEMAS
    - Las siguientes son preguntas básicas de Javascript y manejo de datos. Se evaluará eficiencia, ORDEN y claridad del código entregado.
    - Se debe programar un algoritmo para cada método y que este retorne lo requerido.
    - Debe usar nombres explicativos para sus variables.
    - Usar sintaxis ES6.
    - Puede utilizar funciones auxiliares como apoyo para tener una descomposición de código mas clara al momento de lectura.
    - Su prueba debe ejecutarse sin errores con: node logic-test.js
*/

// 0 Arreglo con los ids de los equipos (función de ejemplo)
function listTeamsIds () {
  return teams.map((client) => client.id)
}

// 1 Arreglo con los nombres de los equipos y el país al que pertenecen, ordenados alfabéticamente por el nombre de su país de origen.
function listTeamsByCountry () {
  // CODE HERE
  
  return teams.sort(function(teamA, teamB) {
                                let countryA = teamA.country.toUpperCase(); 
                                let countryB = teamB.country.toUpperCase(); 
                                if (countryA < countryB) {
                                  return -1;
                                }
                                if (countryA > countryB) {
                                  return 1;
                                }
                                return 0;
                              });
}

// 2 Arreglo con los nombres de los equipos ordenados de mayor a menor por la cantidad de victorias en champions league.
function sortTeamsByWins () {
  // CODE HERE
  let sortedWinners = winsByTeams.sort((teamA,teamB)=>teamB.wins - teamA.wins);
  return sortedWinners.map((winner)=>{
                            let team = teams.find(team=>team.id==winner.teamId);
                            winner.name = team.name;
                            winner.country = team.country;
                            return {teamName: winner.name, wins: winner.wins};
                          });
}

// 3 Arreglo de objetos en donde se muestre el nombre de las ligas y
// la sumatoria de las victorias de los equipos que pertenecen a ellas.
function leaguesWithWins () {
  // CODE HERE
  return leagues.map(league=>{
                              let tByLeague = teamRealtionHelper(league);
                              let totalWins         = tByLeague.reduce((totalWins, team)=>{
                                                                            win = winsByTeams.find(win=>win.teamId==team.teamId);
                                                                            return totalWins + win.wins;
                                                                          }, 0);
                             return {leagueName : league.name , totalWins : totalWins };
                          });

}

// 4 Objeto en que las claves sean los nombres de las ligas 
// y los valores el nombre del equipo con la menor cantidad 
// de victorias en champions.
function leaguesWithTeamWithLestWins () {
  // CODE HERE
  return leagues.map(league=>{
                              let teamsWin  = leaguesWithTeamandWins(league);   
                              let leastWins = teamsWin.reduce((leastWins, team)=> leastWins.wins>team.wins ? team:leastWins, teamsWin[0]);
                              return   {[league.name] : leastWins.name};
                    });
}

// 5 Objeto en que las claves sean los nombres de las ligas y 
// los valores el nombre del equipo con la mayor cantidad de 
// victorias en champions.
function leaguesWithTeamWithMostWins () {
  // CODE HERE
  return leagues.map(league=>{
                              let teamsWin = leaguesWithTeamandWins(league);                 
                              let mostWins = leaguesWithTeamandWins(league).reduce((mostWins, team)=> mostWins.wins<team.wins ? team:mostWins, teamsWin[0]);
                              return   {[league.name] : mostWins.name};
                          });
}

// 6 Arreglo con los nombres de las ligas ordenadas de mayor a menor por la cantidad de victorias de sus equipos.
function sortLeaguesByTeamsByWins () {
  // CODE HERE
  return leaguesWithWins().sort((teamA,teamB)=>{
    return teamB.totalWins - teamA.totalWins;
  })
}

// 7 Arreglo con los nombres de las ligas ordenadas de mayor a menor por la cantidad de equipos que participan en ellas.
function sortLeaguesByTeams () {
  // CODE HERE
  return leagues.map(league=>{
                                league.teams = leaguesWithTeamandWins(league).length;
                                return {name:league.name, teams: league.teams};
                              }).sort((leagueA,leagueB)=>leagueB.teams - leagueA.teams);
}

// 8 Agregar un nuevo equipo con datos ficticios a "teams", asociarlo a la liga de Francia y agregar un total de 4 victorias en champions.
// Luego devolver el lugar que ocupa este equipo en el ranking de la pregunta 2.
// No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
function newTeamRanking () {
  // CODE HERE
  let newTeam = {
      teamsName: 'Los Pete Does',
      wins: 4
  }
  let teams = sortTeamsByWins();
  teams.push(newTeam);
  return teams.sort((teamA,teamB)=>teamB.wins - teamA.wins);
}

// 9 Realice una función que retorne una promesa con los nombres de los equipos en upper case.
// haga la llamada a la función creada desde esta función y asignarle la respuesta a la variable response.
// recuerde que debe esperar el retorno de función asíncrona para que su resultado pueda ser mostrado por el
// console.log. Utilice async await para la llamada asíncrona a la función.
// NOTA: solo debe crear la función asíncrona y agregar la llamada en la siguiente función.

// Retorna la promesa y los nombres de los equipos en upper case
function getTeams () {
  return new Promise( resolve=>resolve (teams.map(team=>team.name.toUpperCase())));
}

async function getTeamsNamesAsUpperCase () {
  let response
  // ------MAKE AWAIT CALL HERE------
  response = await getTeams();
  // --------------------------------
  console.log('response:')
  console.log(response)
  //return response;
}
//*/
// Impresión de soluciones. No modificar.
console.log('Pregunta 0')
console.log(listTeamsIds())
console.log('Pregunta 1')
console.log(listTeamsByCountry())
console.log('Pregunta 2')
console.log(sortTeamsByWins())
console.log('Pregunta 3')
console.log(leaguesWithWins())
console.log('Pregunta 4')
console.log((leaguesWithTeamWithLestWins()))
console.log('Pregunta 5')
console.log((leaguesWithTeamWithMostWins()))
console.log('Pregunta 6')
console.log((sortLeaguesByTeamsByWins()))
console.log('Pregunta 7')
console.log((sortLeaguesByTeams()))
console.log('Pregunta 8')
console.log((newTeamRanking()))

console.log('Pregunta 9')
console.log(getTeamsNamesAsUpperCase())
//*/