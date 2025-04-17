import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schemas';
import { UserDocument } from './schemas/users.schemas';
import { CreateUserDto, ResponseData, RolesEnum, UserDTO } from './dto/users.dto';
import { Encrypt } from 'src/utils/encrypt.util';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly encryptUtil: Encrypt,
    private readonly authService: AuthService
  ){}

  async getUsers(page: number = 1, limit: number = 10): Promise<ResponseData<any>> {
    try {
      const skip = (page - 1) * limit;

      const users = await this.userModel.find({ role: "user" })
          .skip(skip)
          .limit(limit)
          .exec();

      if (!users) throw new BadRequestException;

      const total = await this.userModel.countDocuments({ role: "user" });

      return {
          data: users,
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
        return error;
    }
  }

  async getUser(userId: any): Promise<any> {
    try {

      const user = await this.userModel.findById({
        _id: userId
      });

      if(!user) throw new BadRequestException

      return user;

    } catch (error) {
      return error
    }
  }

  async updateUser(userToUpdate: UserDTO): Promise<any> {
    try {
      const user = await this.userModel.findById({
        _id: userToUpdate.id
      });

      if(!user) throw new BadRequestException

      const updateUser = await this.userModel.updateOne({
        _id: userToUpdate.id
      }, userToUpdate);

      return {
        user: updateUser,
      }

    } catch (error) {
      return error
    }
  }

  async registerUser(newUser: CreateUserDto) {
    try {
      newUser.password = this.encryptUtil.hash(newUser.password)
      const user = {
          ...newUser,
          role: RolesEnum.USER
      }

      const saveUser = await this.userModel.create(user).catch(e =>{
          throw new ConflictException()
      })
      const userPayload= await this.authService.generatePayload(saveUser)
      return {
        userPayload,
      }
    } catch (error) {
        return error
    }
  }
  
}
