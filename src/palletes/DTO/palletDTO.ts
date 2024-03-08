import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class PalletDTO {
  @ApiProperty()
  @IsString()
  palleteName: string
}