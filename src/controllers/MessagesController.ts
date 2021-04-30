import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";
import { ListMessagesByUser } from "../services/ListMessagesByUser";

class MessagesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { admin_id, user_id, text } = request.body;

    const createMessageService = new CreateMessageService()

    const message = await createMessageService.execute({
      admin_id,
      user_id,
      text
    })

    return response.json(message)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listMessagesByUser = new ListMessagesByUser()

    const messages = await listMessagesByUser.execute({
      user_id
    })

    return response.json(messages)
  }
}

export { MessagesController }
