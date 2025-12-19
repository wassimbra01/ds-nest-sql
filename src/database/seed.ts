import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/enums/user-role.enum';
import { SparePart } from '../spare-parts/entities/spare-part.entity';
import { config } from 'dotenv';

// N7arjou variables mel .env
config();

// Fonction seed = bech n7ottou data initial fil database
async function seed() {
  // Na3mlou connection lel database
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // TRUE bech ya3ml auto-sync (dev berk)
  });

  await dataSource.initialize();
  console.log('✅ Database connected');

  // ===== 1. Créer Admin par défaut =====
  const userRepository = dataSource.getRepository(User);

  // Nverifiw ken admin deja mawjoud
  let admin = await userRepository.findOne({
    where: { email: 'admin@repair.com' },
  });

  if (!admin) {
    // N7awlou el password (admin123)
    const hashedPassword = await bcrypt.hash('admin123', 10);

    admin = userRepository.create({
      email: 'admin@repair.com',
      username: 'Admin',
      password: hashedPassword,
      role: UserRole.ADMIN,
    });

    await userRepository.save(admin);
    console.log('✅ Admin créé: admin@repair.com / admin123');
  } else {
    console.log('ℹ️  Admin deja mawjoud');
  }

  // ===== 2. Créer Technicien par défaut =====
  let tech = await userRepository.findOne({
    where: { email: 'tech@repair.com' },
  });

  if (!tech) {
    const hashedPassword = await bcrypt.hash('password123', 10);

    tech = userRepository.create({
      email: 'tech@repair.com',
      username: 'Technicien1',
      password: hashedPassword,
      role: UserRole.TECH,
    });

    await userRepository.save(tech);
    console.log('✅ Technicien créé: tech@repair.com / password123');
  } else {
    console.log('ℹ️  Technicien deja mawjoud');
  }

  // ===== 3. Créer quelques pièces par défaut =====
  const sparePartRepository = dataSource.getRepository(SparePart);

  const parts = [
    { name: 'Écran OLED', stock: 10, price: 150.00 },
    { name: 'Batterie', stock: 15, price: 50.00 },
    { name: 'Caméra arrière', stock: 8, price: 75.00 },
    { name: 'Connecteur charge', stock: 20, price: 25.00 },
  ];

  for (const partData of parts) {
    const existing = await sparePartRepository.findOne({
      where: { name: partData.name },
    });

    if (!existing) {
      const part = sparePartRepository.create(partData);
      await sparePartRepository.save(part);
      console.log(`✅ Pièce créée: ${partData.name}`);
    }
  }

  await dataSource.destroy();
  console.log('');
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║  ✅ Seed completed successfully!               ║');
  console.log('╠════════════════════════════════════════════════╣');
  console.log('║  👤 Admin:                                     ║');
  console.log('║     Email: admin@repair.com                    ║');
  console.log('║     Pass:  admin123                            ║');
  console.log('║  👷 Tech:                                       ║');
  console.log('║     Email: tech@repair.com                     ║');
  console.log('║     Pass:  password123                         ║');
  console.log('╚════════════════════════════════════════════════╝');
  console.log('');
}

// Lancer el seed
seed().catch((error) => {
  console.error('❌ Seed failed:', error);
  process.exit(1);
});