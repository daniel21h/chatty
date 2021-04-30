import { getCustomRepository } from 'typeorm'
import { io } from '../http'
import { ConnectionsRepository } from '../repositories/ConnectionsRepository'
import { UsersRepository } from '../repositories/UsersRepository'
import { CreateConnectionService } from '../services/CreateConnectionService'
import { CreateMessageService } from '../services/CreateMessageService'
import { CreateUserService } from '../services/CreateUserService'
import { ListMessagesByUser } from '../services/ListMessagesByUser'

interface IParams {
  email: string;
  text: string;
}

io.on('connect', socket => {
  const createConnectionService = new CreateConnectionService()
  const createUserService = new CreateUserService()
  const createMessageService = new CreateMessageService()
  const listMessagesByUser = new ListMessagesByUser()
  const usersRepository = getCustomRepository(UsersRepository)
  const connectionsRepository = getCustomRepository(ConnectionsRepository)

  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id
    const { email, text } = params as IParams

    let user_id

    const userExists = await usersRepository.findOne({ email })

    if (!userExists) {
      const user = await createUserService.execute({ email })

      await createConnectionService.execute({
        socket_id,
        user_id: user.id
      })

      user_id = user.id
    } else {
      const connection = await connectionsRepository.findOne({
        user_id: userExists.id
      })

      if (!connection) {
        await createConnectionService.execute({
          socket_id,
          user_id: userExists.id
        })
      } else {
        connection.socket_id = socket_id

        await createConnectionService.execute(connection)
      }

      user_id = userExists.id
    }

    await createMessageService.execute({
      text,
      user_id
    })

    const allMessages = await listMessagesByUser.execute({ user_id })

    socket.emit('client_list_all_messages', allMessages)
  })
})
