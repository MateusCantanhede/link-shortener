import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Shortener {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  originalUrl: string;
  @Column({ unique: true })
  shortenedUrl: string;
  @Column()
  clicks: number;
  @ManyToOne(() => User, (user) => user.shortenerLinks, { onDelete: 'CASCADE' })
  user: User;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  deletedAt: string;
  constructor(originalUrl: string, shortenedUrl: string, clicks: number) {
    this.originalUrl = originalUrl;
    this.shortenedUrl = shortenedUrl;
    this.clicks = clicks;
  }
}
