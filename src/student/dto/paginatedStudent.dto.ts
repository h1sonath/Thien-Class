import { Student } from '../entities/student.entity';

export class PaginatedStudentDto {
  data: Student[];
  page: number;
  limit: number;
  total: number;
}
