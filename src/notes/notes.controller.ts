import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createNoteDto: CreateNoteDto) {
    const createdNote = await this.notesService.create(createNoteDto);
    return {
      message: 'Note created successfully!',
      data: createdNote,
    };
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.notesService.findOne(+id);
  }

  @Get('title/:title')
  async findByTitle(@Param('title') title: string) {
    return this.notesService.findByTitle(title);
  }

  @Get('search')
  async searchByTitle(@Query('term') term: string) {
    if (!term) {
      throw new BadRequestException('Search term is required');
    }
    return await this.notesService.findByTitleContains(term);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number, // ID note to updaate
    @Body() updateNoteDto: UpdateNoteDto, // Data to update
  ) {
    const updatedNote = await this.notesService.update(id, updateNoteDto);
    return {
      message: 'Note updated successfully!',
      data: updatedNote,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    await this.notesService.remove(id);
  }
}
