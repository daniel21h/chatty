import { getCustomRepository } from 'typeorm'
import { io } from '../http'
import { ConnectionsRepository } from '../repositories/ConnectionsRepository'
import { ListMessagesByUser } from '../services/ListMessagesByUser'

io.on('connect', async (socket) => {
  const connectionsRepository = getCustomRepository(ConnectionsRepository)
  const listMessagesByUser = new ListMessagesByUser()

  const allConnectionsWithoutAdmin = await connectionsRepository.find({
    where: { admin_id: null },
    relations: ['user']
  })

  io.emit('admin_list_all_users', allConnectionsWithoutAdmin)

  socket.on('admin_list_messages_by_user', async (params, callback) => {
    const { user_id } = params

    const allMessages = await listMessagesByUser.execute({ user_id })

    callback(allMessages)
  })
})
