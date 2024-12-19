import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { ILike, Like, Not, Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>, //Inject the Note entity
  ) {}

  //Create a new note
  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    console.log('Incoming data:', createNoteDto); // Verifica los datos recibidos

    const newNote = this.noteRepository.create(createNoteDto);
    return await this.noteRepository.save(newNote);
  }

  //Get all notes ordered by creation date (descending)
  async findAll(): Promise<Note[]> {
    return await this.noteRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  //Get a single note by id
  async findOne(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  //Get a single note by title
  async findByTitle(title: string): Promise<Note[]> {
    const notes = await this.noteRepository.find({
      where: { title },
    });

    if (notes.length === 0) {
      throw new NotFoundException(`No notes found with title "${title}"`);
    }

    return notes;
  }

  //Get a notes by word in title
  async findByTitleContains(term: string): Promise<Note[]> {
    const notes = await this.noteRepository.find({
      where: {
        title: ILike(`%${term}%`), // Busca títulos que contengan el término (ignora mayúsculas/minúsculas)
      },
    });

    if (notes.length === 0) {
      throw new NotFoundException(`No notes found with title "${term}"`);
    }

    return notes;
  }
  //Update a note by id
  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(id); // Busca la nota
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    // Update the note
    Object.assign(note, updateNoteDto);
    note.updatedAt = new Date(); // Update date

    return await this.noteRepository.save(note); // Save the note
  }

  //Delete a note by id
  async remove(id: number): Promise<void> {
    const note = await this.findOne(id); // Carga la entidad por ID
    await this.noteRepository.remove(note); // Elimina la entidad
  }
}
