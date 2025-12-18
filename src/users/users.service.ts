import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../auth/dto/register.dto';

// Service mta3 el users = kol el business logic mta3 users
@Injectable()
export class UsersService {
  constructor(
    // Inject el repository bech na3mlou queries 3la el users table
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Na3mlou user jdid (inscription)
  async create(registerDto: RegisterDto): Promise<User> {
    // 1. Nverifiw ken email deja mawjoud (unique constraint)
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    // Ken email mawjoud, yraja3 error
    if (existingUser) {
      throw new ConflictException('Email deja mawjoud, essayi b email akher');
    }

    // 2. N7awlou el password b bcrypt (10 rounds = behi w secure)
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // 3. Na3mlou user jdid b el data
    const user = this.usersRepository.create({
      email: registerDto.email,
      username: registerDto.username,
      password: hashedPassword, // Password mhawel
      role: registerDto.role || UserRole.TECH, // Par défaut TECH ken ma 7attéch role
    });

    // 4. Nsajjlou fil database w nraja3ouh
    return await this.usersRepository.save(user);
  }

  // Nlaweou 3la user b email (bech nesta3mlouh fil login)
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ 
      where: { email } 
    });
  }

  // Nlaweou 3la user b ID (bech nesta3mlouh fil JWT strategy)
  async findById(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOne({ 
      where: { id } 
    });
  }

  // Njibou profil el user (sans password)
  async getProfile(userId: number): Promise<User> {
    const user = await this.findById(userId);

    // Ken user ma l9inéhech, error
    if (!user) {
      throw new NotFoundException('User ma l9inéhech');
    }

    // Ma nraja3ouch el password (security)
    delete user.password;
    return user;
  }

  // Njibou liste kol el users (optionnel, bech admin yjib kol el users)
  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    // N7athfou el passwords mel kol
    users.forEach(user => delete user.password);
    return users;
  }
}