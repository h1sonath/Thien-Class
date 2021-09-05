import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { StudentModule } from 'src/student/student.module';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService],
  imports: [StudentModule],
})
export class TeacherModule {}
