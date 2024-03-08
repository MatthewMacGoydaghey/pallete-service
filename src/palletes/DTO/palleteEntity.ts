import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/DTO/userEnity";
import { Color } from "src/colors/DTO/colorEntity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Pallete {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  palleteName: string


  @ManyToOne(() => User)
  @JoinColumn()
  user: User

  
  @OneToMany(() => Color, (color) => color.pallete)
  palletes: Pallete[]
}