import { ApiProperty } from "@nestjs/swagger";
import { Pallete } from "src/palletes/DTO/palleteEntity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Color {
  @ApiProperty()
@PrimaryGeneratedColumn()
id: number


@ManyToOne(() => Pallete)
@JoinColumn()
pallete: Pallete

@ApiProperty()
@Column()
HEX: string

@ApiProperty()
@Column()
colorName: string
}