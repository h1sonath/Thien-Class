import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  //uuid thì xịn hơn nhưng lâu, 1-2-3 thì nhanh và index cũng nhanh
  id: number;
  @Column()
  name: string;
  @Column()
  class: string;
  @Column()
  age: number;
}
