const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const database = await sqliteConnection()
    const checkUsersExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (checkUsersExist){
      throw new AppError("Este email já está cadastrado, por favor inserir outro!")
    }

    const hashedPassword = await hash(password,8)
    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])


    return response.status(201).json()
  }

  async update (request, response){
    const { name, email, password, old_password } = request.body
    const { id } = request.params

    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = ?", [id])

    if (!user){
      throw new AppError("Usuário não encontrado!")
    }

    const userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email = ?", [email])

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id){
      throw new AppError("Este email já está cadastrado, por favor inserir outro!")
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if( password && !old_password) {
      throw new AppError("Favor verificar as senhas")
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, use.password)

      if(!checkOldPassword) {
        throw new AppError("Senha antiga incorreta!")
      }

      user.password = await hash(password, 8)

    }


    await database.run(`
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?
    updated_at = DATATIME('now')
    WHERE id = ?`, 
    [user.name, user.email, user.password, id]
  )

    return response.json()
  }
}

module.exports = UsersController