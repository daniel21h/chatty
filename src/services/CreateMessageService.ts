import { getCustomRepository, Repository } from "typeorm"
import { MessagesRepository } from "../repositories/MessagesRepository"
import { Message } from '../entities/Message'

interface IRequest {
  admin_id?: string;
  user_id: string;
  text: string;
}

class CreateMessageService {
  private messagesRepository: Repository<Message>

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository)
  }

  public async execute({ admin_id, user_id, text }: IRequest): Promise<Message> {
    const message = this.messagesRepository.create({
      admin_id,
      user_id,
      text
    })

    await this.messagesRepository.save(message)

    return message
  }
}

export { CreateMessageService }
