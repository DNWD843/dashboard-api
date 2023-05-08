import { IsEmail, IsString } from 'class-validator'

export class UserRegisterDto {
	@IsEmail({}, { message: 'Incorrect email' })
	email: string

	@IsString({ message: 'Password is not passed.' })
	password: string

	@IsString({ message: 'Name is not passed.' })
	name: string
}
