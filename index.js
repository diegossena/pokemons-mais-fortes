const axios = require('axios').default
const fs = require('fs')
const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
})
async function start() {
  const pokemons_urls = (
    await api.get('/pokemon', {
      params: { limit: 2000 }
    })
  ).data.results.map(({ url }) => url)
  const pokemon_list = await Promise.all(
    pokemons_urls.map(async pokemon_url => {
      const pokemon = (await axios.get(pokemon_url).catch(() => { }))?.data
      if (!pokemon)
        return null
      const res = {
        name: pokemon.name,
        ...Object.fromEntries(
          pokemon.stats.map(stat => [stat.stat.name, stat.base_stat])
        ),
        total: pokemon.stats.map(stat => stat.base_stat).reduce((acc, val) => acc + val)
      }
      console.log(res)
      return res
    })
  )
  fs.writeFileSync('./pokemons.json', JSON.stringify(pokemon_list.filter(result => result)))
} start()