import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { User } from "./User";

@Entity('messages')
class Message {
  @PrimaryColumn()
  private id: string;

  @Column()
  admin_id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  private user: User;

  @Column()
  text: string;

  @CreateDateColumn()
  private created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Message }
