// src/entities/note.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('notes') // Este es el nombre de la tabla en la base de datos
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;
}
