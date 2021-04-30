import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";

import { v4 as uuid } from 'uuid';

@Entity('settings')
class Setting {
  @PrimaryColumn()
  private id: string;

  @Column()
  username: string;

  @Column()
  chat: boolean;

  @CreateDateColumn()
  private created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Setting }
