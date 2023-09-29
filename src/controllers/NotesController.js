const knex = require('../database/knex');

class NotesController {
  async create(request, response) {
    const { title, description, rating } = request.body
    const { user_id } = request.params

    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    })

    const tagsInsert = tags.map(name =>{
      return {
        note_id,
        id,
        user_id,
        name
      }
    })

    await knex("tags").insert(tagsInsert)

    response.json()
  }
}

module.exports = NotesController