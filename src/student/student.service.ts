import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const res = await this.studentRepository.save(createStudentDto);
    return res;
  }

  findAll(): Promise<Student[]> {
    const allStudent = this.studentRepository.find();
    return allStudent;
  }
  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne(id);
    if (student) {
      return student;
    } else {
      throw new NotFoundException();
    }
  }

  //update của typeORM không patch được
  //không dùng hàm update mà làm theo cách tìm Object muốn update (updatingObject) => assign updatingObject đó với DTO => dùng hàm save, save lại vào DB => updatedObject
  async update(studentID: number, DTO) {
    const updatingStudent = await this.findOne(studentID);
    const updatedStudent = Object.assign(updatingStudent, DTO);
    return this.studentRepository.save(updatedStudent);
  }
  async remove(studentID: number) {
    const deletingStudent = await this.findOne(studentID);
    await this.studentRepository.delete({ id: studentID });
    return { message: 'Student ' + deletingStudent.name + ' deleted' };
  }
}
