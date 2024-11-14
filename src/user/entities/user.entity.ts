import { Shortener } from '../../shortener/entities/shortener.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Shortener, (shortener) => shortener.user)
  shortenerLinks: Shortener[];
}
