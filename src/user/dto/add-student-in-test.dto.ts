import { IsNotEmpty } from 'class-validator';

export class AddStudentInTestDto {
  @IsNotEmpty()
  idTest:string
  @IsNotEmpty()
  idStudent:string
}