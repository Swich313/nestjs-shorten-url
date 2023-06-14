import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {nanoid} from 'nanoid';

export type UrlDocument = HydratedDocument<Url>;

@Schema()
export class Url {
  @Prop({required: true, default: () => nanoid(10), unique: true})
  urlCode: string;

  @Prop()
  longUrl: string;

  @Prop()
  shortUrl: string;

  @Prop({default: Date.now})
  createdAt: Date;
}

export const UrlMongooseSchema = SchemaFactory.createForClass(Url);