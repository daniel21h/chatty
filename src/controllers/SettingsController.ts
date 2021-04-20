import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

class SettingsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, chat } = request.body;

    const settingsRepository = getCustomRepository(SettingsRepository)

    const setting = settingsRepository.create({
      username,
      chat
    })

    await settingsRepository.save(setting)

    return response.status(201).json(setting)
  }
}

export { SettingsController }
