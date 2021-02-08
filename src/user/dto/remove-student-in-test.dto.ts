import { IsNotEmpty } from 'class-validator';

export class RemoveStudentInTestDto {
  @IsNotEmpty()
  idTest:string
  @IsNotEmpty()
  idStudent:string
}