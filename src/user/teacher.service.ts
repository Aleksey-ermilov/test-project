import { Injectable } from '@nestjs/common';
import { TestService } from '../test/test.service';
import { UserService } from './user.service';
import { roleEnum } from './enums/role.enum';
import { AddStudentInTestDto } from './dto/add-student-in-test.dto';
import { RemoveStudentInTestDto } from './dto/remove-student-in-test.dto';

@Injectable()
export class TeacherService {

  constructor(
    private readonly testService: TestService,
    private readonly userService: UserService,
  ) {}

  async addStudentInTest({_id}, {idTest, idStudent}: AddStudentInTestDto) {

    if (await this.isTeacher(_id)){
      return this.testService.addStudent(idTest,idStudent)
    }

    return 'Что-то пошло не так с добавлением нового студента в тест!'  // error!

  }

  async removeStudentInTest({_id}, {idTest, idStudent}: RemoveStudentInTestDto) {
    const teacher = await this.userService.findById(_id)

    if (teacher && (teacher.role === roleEnum.teacher)) {
      return this.testService.removeStudent(idTest,idStudent)
    }

    return 'Что-то пошло не так с удалением студента из теста!' // error!

  }

  async isTeacher(id) {
    const teacher = await this.userService.findById(id)

    if (teacher && (teacher.role === roleEnum.teacher)) {
      return true
    }
    return false
  }

}