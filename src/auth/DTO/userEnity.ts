import { ApiProperty } from "@nestjs/swagger";
import { Pallete } from "src/palletes/DTO/palleteEntity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class User {
@ApiProperty()
@PrimaryGeneratedColumn()
id: number

@ApiProperty()
@Column()
userName: string

@ApiProperty()
@Column({unique: true})
login: string

@ApiProperty()
@Column()
password: string


@OneToMany(() => Pallete, (pallete) => pallete.user)
palletes: Pallete[]
}