import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Entity SparePart = el table "spare_parts" fil database
@Entity('spare_parts')
export class SparePart {
  // ID auto-increment unique lel pièce
  @PrimaryGeneratedColumn()
  id: number;

  // Esm el pièce (ex: "Écran OLED", "Batterie iPhone 12")
  // unique = ma tnajjamch t7ott zouz pièces b nafs el esm
  @Column({ unique: true })
  name: string;

  // El stock mawjoud = 9adéh fama menhom fil atelier
  // type: 'int' = nombre entier, default: 0 = ken ma 7atténéch valeur yabda 0
  @Column({ type: 'int', default: 0 })
  stock: number;

  // Prix mta3 el pièce (b décimales, ex: 149.99)
  // precision: 10 = 10 chiffres total, scale: 2 = 2 chiffres ba3d el virgule
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  // Date création el pièce (automatic)
  @CreateDateColumn()
  createdAt: Date;

  // Date akher modification (automatic, tbadel automatiquement ken tbaddel el row)
  @UpdateDateColumn()
  updatedAt: Date;
}
