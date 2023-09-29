const sqliteConnection = require('../../sqlite')
const createUsers = require('./createUsers')
const createTags = require('./creatTags')

async function migrationsRuns(){
  const schemas = [
    createUsers,
    createTags
  ].join('')

  sqliteConnection()
  .then(db => db.exec(schemas))
  .catch(error => console.error(error))
}

module.exports = migrationsRuns
