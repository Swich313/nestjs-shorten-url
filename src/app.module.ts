import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { configValidationSchema } from "./config.schema";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
          // ssl: configService.get('STAGE') === 'prod',
          uri: `mongodb+srv://${configService.get('MONGODB_USER_NAME')}:${configService.get('MONGODB_USER_PASSWORD')}@${configService.get('MONGODB_CLUSTER')}.azpws6v.mongodb.net/${configService.get('MONGODB_COLLECTION')}`,
          useNewUrlParser: true
      })
    }),
  UrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
