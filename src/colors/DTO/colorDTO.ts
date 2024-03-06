import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";



export class ColorDTO {
  @ApiProperty()
  @IsNumber()
  palleteId: number
  
  @ApiProperty()
  @IsString()
  HEX: string

}