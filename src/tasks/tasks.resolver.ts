import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { UpdateTaskOrder } from './dto/update-task-order.input';

@Resolver(() => Task)
export class TasksResolver {
  constructor(
    private readonly tasksService: TasksService,
  ) {}

  @Mutation(() => Task, {name: 'createTask'})
  create(@Args('createTaskInput') createTaskInput: CreateTaskInput):Promise<Task> {
    return this.tasksService.create(createTaskInput);
  }

  @Mutation(() => Task, {name: 'updateTask'})
  update(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput):Promise<Task> {
    return this.tasksService.update(updateTaskInput);
  }

  @Mutation(() => [Task], {name: 'updateTaskOrder'})
  async updateOrder(@Args('updateTaskOrder') updateTaskOrder: UpdateTaskOrder): Promise<Task[]> {
    let ids = updateTaskOrder.ids;
    return this.tasksService.updateOrder(ids);
  }
}
