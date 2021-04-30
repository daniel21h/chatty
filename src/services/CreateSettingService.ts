import { getCustomRepository, Repository } from "typeorm"
import { Setting } from "../entities/Setting"
import { SettingsRepository } from "../repositories/SettingsRepository"

interface IRequest {
  username: string;
  chat: boolean;
}

class CreateSettingService {
  private settingsRepository: Repository<Setting>

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository)
  }

  public async execute({ username, chat }: IRequest): Promise<Setting> {
    const settingAlreadyExists = await this.settingsRepository.findOne({ username })

    if (settingAlreadyExists) {
      throw new Error('Setting username already exists.')
    }

    const setting = this.settingsRepository.create({
      username,
      chat
    })

    await this.settingsRepository.save(setting)

    return setting;
  }
}

export { CreateSettingService }
