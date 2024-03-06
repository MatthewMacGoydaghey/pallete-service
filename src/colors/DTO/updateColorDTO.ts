import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";



export class UpdateColorDTO {
  
  @ApiProperty()
  @IsString()
  HEX: string

}