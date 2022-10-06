import { CreateTaskInput } from './create-task.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskOrder extends PartialType(CreateTaskInput) {
  @Field(() => [Int])
  ids: number[]
}
