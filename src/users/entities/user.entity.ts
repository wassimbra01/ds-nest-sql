import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany, 
  CreateDateColumn 
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { Intervention } from '../../interventions/entities/intervention.entity';

// Entity User = el table "users" fil database
@Entity('users')
export class User {
  // ID auto-increment, kol user 3andou ID unique
  @PrimaryGeneratedColumn()
  id: number;

  // Email unique, ma ynajjamch 2 users b nafs el email
  @Column({ unique: true })
  email: string;

  // Password mhawel b bcrypt, manibou zéda mektoub normalement
  @Column()
  password: string;

  // Username mta3 el user (esm el user)
  @Column()
  username: string;

  // Role: ADMIN walla TECH (par défaut TECH)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TECH,
  })
  role: UserRole;

  // Date création el compte (automatic)
  @CreateDateColumn()
  createdAt: Date;

  // Relation: User ya3ml barcha interventions
  // 9oddem "() => Intervention" 7atta tetsajjel ba3d (circular dependency)
  @OneToMany(() => Intervention, (intervention) => intervention.technician)
  interventions: Intervention[];
}