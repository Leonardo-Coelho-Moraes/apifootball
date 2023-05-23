import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area} from 'recharts';
import { FiFlag, FiClock, FiShield } from "react-icons/fi";
import {BiFootball} from "react-icons/bi";


const MeuTime = ({ chave }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [players, setPlayers] = useState([]);
  const [isSeasonSelectEnabled, setIsSeasonSelectEnabled] = useState(false);
  const [isLeagueSelectEnabled, setIsLeagueSelectEnabled] = useState(false);
  const [isTeamSelectEnabled, setIsTeamSelectEnabled] = useState(false);
  const [goalsByMinuteData, setGoalsByMinuteData] = useState(null);
    const [loading, setLoading] = useState(false);
  const [forma, setForma] = useState(null); // Novo estado para a formação
  const url = 'https://api-football-v1.p.rapidapi.com/v3/';
  const headers = {
    'X-RapidAPI-Key': chave,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchData = async (endpoint, setState) => {
    try {
      const response = await axios.get(`${url}${endpoint}`, { headers });
      setState(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCountries = async () => {
    await fetchData('countries', setCountries);
  };

  const fetchSeasons = async () => {
    await fetchData('leagues/seasons', setSeasons);
  };

  const fetchLeagues = async () => {
    await fetchData(`leagues?country=${selectedCountry}&season=${selectedSeason}`, setLeagues);
  };

  const fetchTeams = async () => {
    await fetchData(`teams?league=${selectedLeague}&season=${selectedSeason}&country=${selectedCountry}`, setTeams);
  };

  const fetchPlayers = async () => {
    await fetchData(`players?team=${selectedTeam}&league=${selectedLeague}&season=${selectedSeason}`, setPlayers);
  };

  const fetchStatitic = async () => {
    setLoading(true);
    await fetchData(`teams/statistics?season=${selectedSeason}&team=${selectedTeam}&league=${selectedLeague}`, setForma); ;

    const data = forma.goals.for.minute;
    const chartData = Object.entries(data).map(([minute, item]) => ({
      minute,
      goals: item.total,
    }));
    setGoalsByMinuteData(chartData);
  };
 
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedSeason('');
    setSelectedLeague('');
    setTeams([]);
    setIsSeasonSelectEnabled(true);
  };

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
    setSelectedLeague('');
    setTeams([]);
    setIsLeagueSelectEnabled(true);
  };

  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
    setTeams([]);
    setIsTeamSelectEnabled(true);
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
    setPlayers([]);
  };

  const handleCountrySubmit = (event) => {
    event.preventDefault();
    fetchSeasons();
  };

  const handleSeasonSubmit = (event) => {
    event.preventDefault();
    fetchLeagues();
  };

  const handleLeagueSubmit = (event) => {
    event.preventDefault();
    fetchTeams();
  };

  const handleTeamSubmit = (event) => {
    event.preventDefault();
    fetchPlayers();
    fetchStatitic(); 
 
  };

  return (
<main main className='container'>

  <section className="bloco1">
    <div className="formularios area">
              <form onSubmit={handleCountrySubmit} className='entrada'>
                <div className="select">
                  <FiFlag />
                  <select id="countries-select" value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">Escolha o país</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type='submit'>
                  <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                      <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                      </svg>
                    </div>
                  </div>
                </button>
              </form>
              <form onSubmit={handleSeasonSubmit} disabled={!isSeasonSelectEnabled} className='entrada'>
                <div className="select">
                  <FiClock />
                  <select id="seasons-select" value={selectedSeason} onChange={handleSeasonChange} disabled={!selectedCountry}>
                <option value="">Escolha a temporada</option>
                    {seasons.map((season) => (
                      <option key={season} value={season}>
                        {season}
                      </option>
                    ))}
                  </select>
                </div>
                <button type='submit'>
                  <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                      <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                      </svg>
                    </div>
                  </div>
                </button>
              </form>
              <form onSubmit={handleLeagueSubmit} disabled={!isLeagueSelectEnabled} className='entrada'>
                <div className="select">
                  <FiShield />
                  <select id="leagues-select" value={selectedLeague} onChange={handleLeagueChange} disabled={!selectedSeason}>
                <option value="">Escolha a liga</option>
                    {leagues.map((league) => (
                      <option key={league.league.id} value={league.league.id}>
                        {league.league.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type='submit'>
                  <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                      <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                      </svg>
                    </div>
                  </div>
                </button>
              </form>
              <form onSubmit={handleTeamSubmit} disabled={!isTeamSelectEnabled} className='entrada'>
                <div className="select">
                  <BiFootball />
                  <select id="teams-select" value={selectedTeam} onChange={handleTeamChange} disabled={!selectedLeague}>
                <option value="">Escolha o time</option>
                    {teams.map((team) => (
                      <option key={team.team.id} value={team.team.id}>
                        {team.team.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type='submit'>
                  <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                      <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                      </svg>
                    </div>
                  </div>
                </button>
              </form>
    </div>
    <div className="sobre area">
      <h2>Sobre</h2>{forma &&(

              <div>Espaço reservado para propaganda e etc..</div>
    )}</div>
  </section>
  <section className="bloco2">
    <div className="grafico area">
              <h2>Quantidade de Gols Marcados por Tempo de Jogo</h2>
              {forma && goalsByMinuteData && goalsByMinuteData.length > 0 ? (
                
                 <ResponsiveContainer width="90%" height={140}>
        <AreaChart
          width='100%'
          height={400}
         data={goalsByMinuteData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="minute" />
          <YAxis />
          <Tooltip />
                <Area type="monotone" dataKey="goals" stroke="#172554" fill="#172554" />
        </AreaChart>
      </ResponsiveContainer>
              ) : (
                <div className='loading'></div>
              )}
    </div>
    <div className="jogos area"> 
            <h2>Jogos</h2>
            {forma  ? (
            <table>
              <thead>
                <tr>
                  <th style={{ width: '1%' }}>Local</th>
                  <th>Jogos</th>
                  <th>Vitórias</th>
                  <th>Empates</th>
                  <th>Derrotas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='local'>Fora</td>
                  <td><span className='win'>{forma.fixtures.wins.away} ↑</span></td>
                  <td>{forma.fixtures.draws.away}</td>
                  <td><span className='lose'>{forma.fixtures.loses.away}↓</span></td>
                  <td>{forma.fixtures.played.away}</td>
                </tr>
                <tr>
                  <td className='local'>Casa</td>
                  <td><span className='win'>{forma.fixtures.wins.home} ↑</span></td>
                  <td>{forma.fixtures.draws .home}</td>
                  <td><span className='lose'>{forma.fixtures.loses.home} ↓</span></td>
                  <td>{forma.fixtures.played.home}</td>
                </tr>
                <tr>
                  <td className='local'>Total</td>
                  <td><span className='win'>{forma.fixtures.wins.total} ↑</span></td>
                  <td>{forma.fixtures.draws.total}</td>
                  <td><span className='lose'>{forma.fixtures.loses.total} ↓</span></td>
                  <td>{forma.fixtures.played.total}</td>
                </tr>
              </tbody>
            </table>

    ): (<div className='loading'></div>)}</div>
    <div className="formacao area">
              <h2>Formação mais utilizada:</h2>
              { forma? (<div className='forms'>
                {forma.lineups.map((typeform) => (
                
                    <p>{typeform.formation}<br /><strong>Qnt. {typeform.played}</strong></p>
                  
                ))}
          </div>) : (<div className='loading'></div>) }
    </div>
  </section>
  <section className="bloco3 ">
    <div className="jogadores area">
              <h2>Jogadores:</h2>
              {forma ?(
                    <ul>
                      {players.map((player) => (
                        <li key={player.player.id}>
                          <img src={player.player.photo} alt={player.player.name} />
                          <p><strong>{player.player.firstname} {player.player.lastname}</strong>:  <br /><small>{player.player.age} Anos</small> - {player.player.nationality} </p>
                        </li>
                      ))}
                    </ul>
          ) : (<div className='loading2'></div>) }
    </div>
  </section>
</main>
  );
};

export default MeuTime;
