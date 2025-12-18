import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Device } from '../../devices/entities/device.entity';
import { SparePart } from '../../spare-parts/entities/spare-part.entity';

// Entity Intervention = el table "interventions" fil database
// Hé hedhi el fiche mta3 el réparation (fiche d'intervention)
@Entity('interventions')
export class Intervention {
  // ID auto-increment unique lel intervention
  @PrimaryGeneratedColumn()
  id: number;

  // Description el réparation: chnou 3amel el technicien?
  // type: 'text' = texte long (mch limité à 255 caractères kima VARCHAR)
  @Column({ type: 'text' })
  description: string;

  // Date el intervention (automatic, t7ott automatically ken t3amel intervention)
  @CreateDateColumn()
  date: Date;

  // Relation ManyToOne: Barcha interventions y9addou ya3mlhom technicien we7ed
  // eager: true = automatiquement yjiblék el user mé3a el intervention (ma t7tajjch JOIN manually)
  @ManyToOne(() => User, (user) => user.interventions, { eager: true })
  technician: User;

  // Relation ManyToOne: Barcha interventions y9addou ysirrou 3la appareil we7ed
  // eager: true = automatiquement yjiblék el device mé3a el intervention
  @ManyToOne(() => Device, (device) => device.interventions, { eager: true })
  device: Device;

  // Relation ManyToMany: Intervention testa3mel barcha pièces, w kol pièce testa3mel fi barcha interventions
  // JoinTable = ya3ml table intermédiaire "intervention_spare_parts" automatically
  // eager: true = yjiblék les pièces automatically
  @ManyToMany(() => SparePart, { eager: true })
  @JoinTable({ name: 'intervention_spare_parts' })
  spareParts: SparePart[];
}