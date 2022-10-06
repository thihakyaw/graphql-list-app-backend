import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { Repository, In } from 'typeorm'
import { TasksConstants } from './tasks.constants';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
) {}

  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    let latestTask = await this.tasksRepository.find({
      where : { listId: createTaskInput.listId },
      order: {order : "DESC"},
      take: 1
    });

    const newTask = await this.tasksRepository.create({
      status: TasksConstants.INCOMPLETE, 
      order: (latestTask.length != 0) ? latestTask[0].order + 1 : 1,
      ...createTaskInput
    });

    return this.tasksRepository.save(newTask);
  }

  find(listId: number):Promise<Task[]> {
    return this.tasksRepository.find({
      where : { listId: listId },
      order: {order : "ASC"}
    });
  }

  update(updateTaskInput: UpdateTaskInput): Promise<Task> {
    return this.tasksRepository.save(updateTaskInput);
  }

  async updateOrder(ids: number[]): Promise<Task[]> {
    let order = 1;
    for (let id of ids) {
      await this.tasksRepository.save({
        id: id,
        order: order,
      });
      order++;
    }

    return this.tasksRepository.find({
      where :{id : In(ids)},
      order: {order : "ASC"}
    });
  }
}
