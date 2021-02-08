import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly group: string;
  @IsNotEmpty()
  readonly faculty: string;
  @IsNotEmpty()
  readonly specialty: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  readonly role: string;
  @IsNotEmpty()
  readonly avatar: string;
}