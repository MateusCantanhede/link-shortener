import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column({ nullable: true })
  userId: string;
  constructor(
    originalUrl: string,
    shortenedUrl: string,
    clicks: number,
    userId?: string,
  ) {
    this.originalUrl = originalUrl;
    this.shortenedUrl = shortenedUrl;
    this.clicks = clicks;
    this.userId = userId ?? null;
  }
}
