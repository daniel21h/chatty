import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const createUserService = new CreateUserService()

    const user = await createUserService.execute({ email })

    return response.json(user)
  }
}

export { UsersController }
