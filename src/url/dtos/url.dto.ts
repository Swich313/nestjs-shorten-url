import { IsNotEmpty, IsUrl } from "class-validator";

export class UrlDto {
  @IsUrl()
  @IsNotEmpty()
  longUrl: string
}