import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface IRequest {
  username: string;
}

class ListSettingByUsername {
  private settingsRepository: Repository<Setting>

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository)
  }

  public async execute({ username }: IRequest): Promise<Setting> {
    const settings = await this.settingsRepository.findOne({ username })

    return settings
  }
}

export { ListSettingByUsername }
