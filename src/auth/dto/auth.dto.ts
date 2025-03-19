import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { UserDTO } from "src/users/dto/users.dto";

export class AuthDTO{
    user: Partial<UserDTO>;
    token: string;
}

export class SignDTO{
    user: Partial<UserDTO>;
}

export class SingIn {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 'jhondoe@gmail.com',
        description: "Email to login",
        type: String
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: '123456',
        description: "Password for login",
        type: String
    })
    password: string;
}

export class SignUp {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 'Name',
        description: "Name for user",
        type: String
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 'Last name',
        description: "Last name for user",
        type: String
    })
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 'admin@bululu.com',
        description: "Email for user",
        type: String
    })
    email: string;

    @IsString({
        message: 'Password must be a string'
    })
    @IsNotEmpty({
        message: 'Password must be not empty'
    })
    @ApiProperty({
        required: true,
        example: '123456',
        description: "Password for user",
        type: String
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 'ADMIN',
        description: "Role for user",
        type: String
    })
    role: string;
}