function Siu() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [favorites, setFavorites] = useState([]);
   const getData = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=10"
    );

    const pokemonDetails = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        const typeResponses = await Promise.all(
  details.data.types.map((t) =>
    axios.get(t.type.url)
  )
);
const weaknesses = [
  ...new Set(
    typeResponses.flatMap((type) =>
      type.data.damage_relations.double_damage_from.map(
        (d) => d.name
      )
    )
  ),
];
       const species = await axios.get(
        details.data.species.url
          );
       
        return {
          weaknesses,
          id: details.data.id,
          name: details.data.name,

          hp: details.data.stats.find(
            (s) => s.stat.name === "hp"
          )?.base_stat,

          attack: details.data.stats.find(
            (s) => s.stat.name === "attack"
          )?.base_stat,

          defense: details.data.stats.find(
            (s) => s.stat.name === "defense"
          )?.base_stat,

          image:
            details.data.sprites.other[
              "official-artwork"
            ].front_default,

          types: details.data.types.map(
            (t) => t.type.name

          ),
          category: species.data.genera.find(
            (g) => g.language.name === "en"
          )?.genus,
          height: details.data.height / 10,
          weight: details.data.weight / 10,
          ability: details.data.abilities.map(
          (a) => a.ability.name
           ),
           genderRate: species.data.gender_rate,
           specialAttack: details.data.stats.find(
            (s) => s.stat.name === "special-attack"
          )?.base_stat,
          specialDefense: details.data.stats.find(
            (s) => s.stat.name === "special-defense"
          )?.base_stat,
          speed: details.data.stats.find(
          (s) => s.stat.name === "speed"
           )?.base_stat,
          
           genderRate: species.data.gender_rate,

          stats: details.data.stats
            .filter((stat) =>
              ["attack", "defense", "speed"].includes(
                stat.stat.name
              )
            )
            .map((stat) => ({
              name: stat.stat.name,
              value: stat.base_stat,
            })),
        };
      })
    );

    setPokemonList(pokemonDetails);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    getData();
  }, []);
}