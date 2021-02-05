import { Injectable } from '@nestjs/common';
import { TestService } from '../test/test.service';
import { UserService } from './user.service';
import { roleEnum } from './enums/role.enum';

@Injectable()
export class TeacherService {

  constructor(
    private readonly testService: TestService,
    private readonly userService: UserService,
  ) {}

  async addStudentInTest({_id}, {idTest, idStudent}) {
    const teacher = await this.userService.findById(_id)

    if (teacher && (teacher.role === roleEnum.teacher)) {
      return this.testService.addStudent(idTest,idStudent)
    }

    return 'Что-то пошло не так с добавлением нового студента в тест!'

  }

  async removeStudentInTest({_id}, {idTest, idStudent}) {
    const teacher = await this.userService.findById(_id)

    if (teacher && (teacher.role === roleEnum.teacher)) {
      return this.testService.removeStudent(idTest,idStudent)
    }

    return 'Что-то пошло не так с удалением студента из теста!'

  }

}