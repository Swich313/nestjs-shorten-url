import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import {Url, UrlMongooseSchema} from "./schemas/url.schema"

@Module({
  imports: [ConfigModule, MongooseModule.forFeature([{name: Url.name, schema: UrlMongooseSchema}])],
  providers: [UrlService],
  controllers: [UrlController]
})
export class UrlModule {}
