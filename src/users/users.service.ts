import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schemas';
import { UserDocument } from './schemas/users.schemas';
import { CreateModeratorDto, ResponseData, RolesEnum, UserDTO } from './dto/users.dto';
import { SignUp } from 'src/auth/dto/auth.dto';
import { Encrypt } from 'src/utils/encrypt.util';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly encryptUtil: Encrypt,
    private readonly authService: AuthService
  ){}

  async getModerators(page: number = 1, limit: number = 10): Promise<ResponseData<any>> {
    try {
      const skip = (page - 1) * limit;

      const moderators = await this.userModel.find({ role: "moderator" })
          .skip(skip)
          .limit(limit)
          .exec();

      if (!moderators) throw new BadRequestException;

      const total = await this.userModel.countDocuments({ role: "moderator" });

      return {
          data: moderators,
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
        return error;
    }
  }

  async getModerator(userId: any): Promise<any> {
    try {

      const moderator = await this.userModel.findById({
        _id: userId
      });

      if(!moderator) throw new BadRequestException

      return moderator;

    } catch (error) {
      return error
    }
  }

  async updateOneModerator(userModerator: UserDTO): Promise<any> {
    try {
      const moderator = await this.userModel.findById({
        _id: userModerator.id
      });

      if(!moderator) throw new BadRequestException

      const updateModerator = await this.userModel.updateOne({
        _id: userModerator.id
      }, userModerator);

      return {
        moderator: updateModerator,
      }

    } catch (error) {
      return error
    }
  }

  async registerModerator(moderator: CreateModeratorDto) {
    try {
      moderator.password = this.encryptUtil.hash(moderator.password)
        const user = {
            ...moderator,
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
