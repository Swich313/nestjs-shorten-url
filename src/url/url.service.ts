import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Url, UrlDocument} from "./schemas/url.schema";
import { Model } from "mongoose";
import { UrlDto } from "./dtos/url.dto";
import { ConfigService } from "@nestjs/config";
import { nanoid } from "nanoid";

@Injectable()
export class UrlService {
  private logger = new Logger('UrlService');


  constructor(
    @InjectModel(Url.name)
    private UrlModel: Model<Url>,
    private configService: ConfigService) {
  }

  async shortenUrl(url: UrlDto): Promise<UrlDocument> {
      const {longUrl} = url;

    const baseUrl = process.env.BASE_URL;
      const urlCode = nanoid(10);
      try {
        let url = await this.UrlModel.findOne({longUrl});
        if (url) return url;
        const shortUrl = `${baseUrl}/url/${urlCode}`
        const newShortUrl = new this.UrlModel({
          urlCode,
          shortUrl,
          longUrl
        });
        return await newShortUrl.save();
      } catch (err) {
          this.logger.error('Exception:', err);
          throw new UnprocessableEntityException('Server Error')
      }
  }

  async redirect(urlCode: string) {
    try {
      const url = await this.UrlModel.findOne({urlCode});
      if (url) return url;
    } catch (err) {
      this.logger.verbose('Url was not found!', err);
      throw new NotFoundException('Resource Not Found')
    }
  }
}
