import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm'
import { List } from 'src/lists/entities/list.entity';
import { ListsService } from 'src/lists/lists.service';
import { TasksConstants } from './tasks.constants';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
) {}

  async create(createTaskInput: CreateTaskInput) {
    const newTask = await this.tasksRepository.create({status: TasksConstants.INACTIVE, order: 1,...createTaskInput});
    return this.tasksRepository.save(newTask);
  }

  find(listId: number) {
    return this.tasksRepository.find({where : {listId: listId}});
  }

  update(updateTaskInput: UpdateTaskInput) {
    return this.tasksRepository.save(updateTaskInput);
  }
}
