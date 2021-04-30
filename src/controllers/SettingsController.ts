import { Request, Response } from "express";
import { CreateSettingService } from "../services/CreateSettingService";
import { ListSettingByUsername } from "../services/ListSettingByUsername";
import { UpdateSettingService } from "../services/UpdateSettingService";

class SettingsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { username, chat } = request.body;
      const createSettingService = new CreateSettingService()

      const setting = await createSettingService.execute({
        username,
        chat
      });

      return response.status(201).json(setting)
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const listSettingByUsername = new ListSettingByUsername()

    const setting = await listSettingByUsername.execute({
      username
    })

    return response.json(setting)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const { chat } = request.body;

    const updateSettingService = new UpdateSettingService()

    const setting = await updateSettingService.execute({
      username,
      chat
    })

    return response.json(setting)
  }
}

export { SettingsController }
