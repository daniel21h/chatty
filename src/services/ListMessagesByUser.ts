import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IRequest {
  user_id: string;
}

class ListMessagesByUser {
  private messagesRepository: Repository<Message>

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository)
  }

  public async execute({ user_id }: IRequest): Promise<Message[]> {
    const messages = await this.messagesRepository.find({
      where: { user_id },
      relations: ['user']
    })

    return messages
  }
}

export { ListMessagesByUser }
