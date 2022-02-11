const fs = require('fs')
const pokemons = JSON.parse(
  fs.readFileSync('pokemons.json', 'utf8')
)
fs.writeFileSync(
  'pokemons.json',
  JSON.stringify(
    pokemons.sort((a, b) => b.total - a.total)
  )
)
