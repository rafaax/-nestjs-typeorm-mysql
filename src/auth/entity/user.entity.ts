import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'users_auth', // table name
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    length: 60,
  })
  login: string;

  @Column({
    type: 'longtext',
  })
  pass: string;

  @Column({
    length: 50,
  })
  email: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: string;

  @Column()
  role: number;
}
