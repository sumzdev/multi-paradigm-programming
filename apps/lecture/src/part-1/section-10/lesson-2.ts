export function lesson2() {
  // 10.2 Basketball league statistics

  type Player = {
    name: string;
    pointsPerGame: number;
    starter: boolean;
  }

  type Team = {
    name: string;
    players: Player[];
  }

  const teams: Team[] = [
    {
      name: "Bears",
      players: [
        { name: "Luka",    pointsPerGame: 32, starter: true },
        { name: "Anthony", pointsPerGame: 28, starter: true },
        { name: "Kevin",   pointsPerGame: 15, starter: false },
        { name: "Jaylen",  pointsPerGame: 14, starter: false },
        { name: "Chris",   pointsPerGame: 22, starter: true },
        { name: "Derrick", pointsPerGame: 10, starter: false },
        { name: "Dillon",  pointsPerGame: 31, starter: true },
        { name: "John",    pointsPerGame: 18, starter: true },
      ],
    },
    {
      name: "Lions",
      players: [
        { name: "Stephen", pointsPerGame: 37, starter: true },
        { name: "Zach",    pointsPerGame: 20, starter: true },
        { name: "Nikola",  pointsPerGame: 19, starter: false },
        { name: "Austin",  pointsPerGame: 22, starter: true },
        { name: "Bruce",   pointsPerGame: 13, starter: false },
        { name: "Damian",  pointsPerGame: 33, starter: true },
        { name: "Tyrese",  pointsPerGame: 29, starter: true },
        { name: "Jamal",   pointsPerGame: 11, starter: false },
      ],
    },
    {
      name: "Wolves",
      players: [
        { name: "Jayson",  pointsPerGame: 32, starter: true },
        { name: "Klay",    pointsPerGame: 37, starter: true },
        { name: "Andrew",  pointsPerGame: 15, starter: false },
        { name: "Patrick", pointsPerGame: 14, starter: false },
        { name: "Malik",   pointsPerGame: 24, starter: true },
        { name: "Buddy",   pointsPerGame: 10, starter: false },
        { name: "Jordan",  pointsPerGame: 27, starter: true },
        { name: "Kyle",    pointsPerGame: 18, starter: true },
      ],
    },
    {
      name: "Tigers",
      players: [
        { name: "DeMar",   pointsPerGame: 37, starter: true },
        { name: "Marcus",  pointsPerGame: 21, starter: true },
        { name: "Al",      pointsPerGame: 19, starter: false },
        { name: "Dennis",  pointsPerGame: 22, starter: true },
        { name: "Miles",   pointsPerGame: 14, starter: false },
        { name: "Paul",    pointsPerGame: 29, starter: true },
        { name: "Fred",    pointsPerGame: 13, starter: false },
        { name: "Terry",   pointsPerGame: 25, starter: true },
      ],
    },
  ];

  const totalStartersPPG = teams
    .flatMap(team => team.players)
    .filter(player => player.starter)
    .map(player => player.pointsPerGame)
    .reduce((a, b) => a + b, 0);

  console.log(totalStartersPPG) // 544
}
