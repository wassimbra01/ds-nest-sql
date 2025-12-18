import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { DeviceStatus } from '../enums/device-status.enum';
import { DeviceGrade } from '../enums/device-grade.enum';
import { Intervention } from '../../interventions/entities/intervention.entity';

// Entity Device = el table "devices" fil database
@Entity('devices')
export class Device {
  // ID auto-increment unique lel appareil
  @PrimaryGeneratedColumn()
  id: number;

  // Serial number unique (kol appareil 3andou serial unique)
  // Ex: "IPHONE12345", "SAMSUNG9876"
  @Column({ unique: true })
  serialNumber: string;

  // Marque mta3 el appareil (ex: "Apple", "Samsung", "Huawei")
  @Column()
  brand: string;

  // Model mta3 el appareil (ex: "iPhone 12", "Galaxy S21")
  @Column()
  model: string;

  // Status: wech 7alto tawa? (PENDING, REPAIRING, READY)
  // Par défaut kol appareil jdid yabda PENDING
  @Column({
    type: 'enum',
    enum: DeviceStatus,
    default: DeviceStatus.PENDING,
  })
  status: DeviceStatus;

  // Grade: kifeh 7alto ba3d el réparation? (A, B, C, NONE)
  // Par défaut NONE 7atta yçalla7 w y7ottoulouh grade
  @Column({
    type: 'enum',
    enum: DeviceGrade,
    default: DeviceGrade.NONE,
  })
  grade: DeviceGrade;

  // Date wa9tech dkhel el appareil lel atelier (automatic)
  @CreateDateColumn()
  createdAt: Date;

  // Relation: Device y9addou ya3mlou fih barcha interventions (réparations)
  @OneToMany(() => Intervention, (intervention) => intervention.device)
  interventions: Intervention[];
}