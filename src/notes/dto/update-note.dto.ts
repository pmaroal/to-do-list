import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @IsOptional()
  title?: string; // Opcional
  @IsString()
  @IsOptional()
  content?: string; // Opcional
  @IsBoolean()
  @IsOptional()
  isFinished?: boolean; // Campo para marcar como completada
}
