import { getCustomRepository, Repository } from "typeorm"
import { Setting } from "../entities/Setting"
import { SettingsRepository } from "../repositories/SettingsRepository"

interface IRequest {
  username: string;
  chat: boolean;
}

class UpdateSettingService {
  private settingsRepository: Repository<Setting>

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository)
  }

  public async execute({ username, chat }: IRequest): Promise<Setting> {
    const setting = await this.settingsRepository.findOne({ username })

    if (!setting) {
      throw new Error('Setting does not exists.')
    }

    setting.chat = chat

    await this.settingsRepository.save(setting)

    return setting;
  }
}

export { UpdateSettingService }
