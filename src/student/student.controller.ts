import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { StudentService } from 'src/student/student.service';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { UpdateStudentDto } from 'src/student/dto/update-student.dto';
import { PaginationStudentDto } from './dto/pagination-student.dto';
import { PaginatedStudentDto } from './dto/paginatedStudent.dto';

//Decorator @ sử dụng ở đây để tạo ra 1 instance dùng mãi mãi k tạo các instance mới
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationStudentDto) {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);
    return this.studentService.findAll({
      ...paginationDto,
      limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id).then((res) => {
      if (res) {
        return res;
      } else {
        throw new HttpException('Cant find this student', HttpStatus.NOT_FOUND);
      }
    });
  }

  //tìm hiểu xem muốn truyền body có field "class" thì làm thế nào

  //các field không truyền null được
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
