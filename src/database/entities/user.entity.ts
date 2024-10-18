import { Column, Entity, PrimaryGeneratedColumn, VirtualColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column({ nullable: true, type: 'text' })
  bio: string;

  @VirtualColumn({
    query: () => `SELECT CONCAT(firstname, lastname) FROM users WHERE id = id)`,
  })
  fullname: string;
}
