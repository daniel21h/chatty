import { getCustomRepository, Repository } from "typeorm"
import { ConnectionsRepository } from "../repositories/ConnectionsRepository"
import { Connection } from '../entities/Connection'

interface IRequest {
  id?: string;
  admin_id?: string;
  user_id: string;
  socket_id: string;
}

class CreateConnectionService {
  private connectionsRepository: Repository<Connection>

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository)
  }

  public async execute({
    id,
    admin_id,
    user_id,
    socket_id
  }: IRequest): Promise<Connection> {
    const connection = this.connectionsRepository.create({
      id,
      admin_id,
      user_id,
      socket_id
    })

    await this.connectionsRepository.save(connection)

    return connection
  }
}

export { CreateConnectionService }
