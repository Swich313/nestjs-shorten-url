import { Body, Controller, Get, Logger, Param, Post, Req, Res } from "@nestjs/common";
import { UrlService } from "./url.service";
import { UrlDto } from "./dtos/url.dto";

@Controller('url')
export class UrlController {
  logger = new Logger('urlController')
  constructor(private urlService: UrlService) {
  }

  @Post()
  shortenUtl(@Body() url: UrlDto, @Req() req) {
    this.logger.debug(req.get('headers'))
    return this.urlService.shortenUrl(url);
  }

  @Get(':urlCode')
  async redirect(@Res() res, @Param('urlCode') urlCode: string) {
    const url = await this.urlService.redirect(urlCode);
    return res.redirect(url.longUrl);
  }
}
