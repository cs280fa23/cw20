import { IsOptional, IsString } from "class-validator";

export class UpdatePostDTO {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
