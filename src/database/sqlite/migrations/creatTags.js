const createTags = `
  CREATE TABLE IF NOT EXISTS movie_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  note_id INTEGER
  user_id INTEGER
  name VARCHAR, 
  )
`
module.exports = createTags

