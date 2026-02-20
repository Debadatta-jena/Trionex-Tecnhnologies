import {
  Injectable,
  NotFoundException,
  ConflictException,
  OnModuleInit,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, UserRole } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const adminEmail = 'debadattajena552@gmail.com';
    const adminPassword = 'debadatta2004';

    const existing = await this.findByEmail(adminEmail);
    if (!existing) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const admin = this.usersRepository.create({
        name: 'Debadatta Jena',
        email: adminEmail,
        password: hashedPassword,
        phone: '9692292496',
        role: UserRole.ADMIN,
        isActive: true,
        isEmailVerified: true,
      });
      await this.usersRepository.save(admin);
      console.log('✅ Admin user seeded successfully!');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: [
        "id",
        "name",
        "email",
        "role",
        "phone",
        "company",
        "isActive",
        "isEmailVerified",
        "createdAt",
        "updatedAt",
      ],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: [
        "id",
        "name",
        "email",
        "role",
        "phone",
        "company",
        "isActive",
        "isEmailVerified",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async getCount(): Promise<{ count: number }> {
    const count = await this.usersRepository.count();
    return { count };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw new ConflictException("User with this email already exists");
      }
    }

    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string | null,
  ): Promise<void> {
    await this.usersRepository.update(userId, { refreshToken });
  }

  async updateEmailVerification(
    userId: string,
    isVerified: boolean,
  ): Promise<void> {
    await this.usersRepository.update(userId, { isEmailVerified: isVerified });
  }

  async deactivateUser(userId: string): Promise<void> {
    await this.usersRepository.update(userId, { isActive: false });
  }

  async activateUser(userId: string): Promise<void> {
    await this.usersRepository.update(userId, { isActive: true });
  }

  async changeRole(userId: string, role: UserRole): Promise<void> {
    await this.usersRepository.update(userId, { role });
  }
}
