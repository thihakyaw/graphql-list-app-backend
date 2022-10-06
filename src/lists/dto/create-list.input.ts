import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateListInput {
    @Field()
    name: string;
}