import {
  HttpException,
  HttpStatus,
  Injectable,
  UseFilters,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
// import { UpdateStudentDto } from 'src/student/dto/update-student.dto';
import { Student } from 'src/student/entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationStudentDto } from 'src/student/dto/pagination-student.dto';
import { PaginatedStudentDto } from 'src/student/dto/paginatedStudent.dto';
import { Like } from 'typeorm';
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
  async findAll(paginationDto: PaginationStudentDto) {
    const keyword = paginationDto.keyword || '';
    const limit = paginationDto.limit;
    const page = paginationDto.page;
    console.log('', page);
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    const allStudent = await this.studentRepository
      .createQueryBuilder()
      .where({ name: Like('%' + keyword + '%') })
      .offset(skippedItems)
      .limit(limit)
      .getMany();
    const totalData = allStudent.length;
    const totalItem = await this.studentRepository.count();
    const totalPage = Math.ceil(totalItem / limit);
    return {
      data: allStudent,
      metadata: {
        ...paginationDto,
        totalPage,
        totalData,
        totalItem,
        nextPage: page < totalPage ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
      },
    };
  }
  async findOne(studentID: string): Promise<Student> {
    const student = await this.studentRepository.findOne(studentID);
    return student;
  }

  //update của typeORM không patch được
  //không dùng hàm update mà làm theo cách tìm Object muốn update (updatingObject) => assign updatingObject đó với DTO => dùng hàm save, save lại vào DB => updatedObject
  async update(studentID: string, DTO) {
    const updatingStudent = await this.findOne(studentID);
    const updatedStudent = Object.assign(updatingStudent, DTO);
    return this.studentRepository.save(updatedStudent);
  }
  async remove(studentID: string) {
    const deletingStudent = await this.findOne(studentID);
    await this.studentRepository.delete(studentID);
    return { message: 'Student ' + deletingStudent.name + ' deleted' };
  }
}
