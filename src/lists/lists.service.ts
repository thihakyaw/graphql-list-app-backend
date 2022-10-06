import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { Repository } from 'typeorm';
import { CreateListInput } from './dto/create-list.input';
import { List } from './entities/list.entity';

@Injectable()
export class ListsService {
    constructor(
        @InjectRepository(List)
        private listsRepository: Repository<List>,
        private tasksService: TasksService,
    ) {}

    async createList(createListInput:CreateListInput): Promise<List> {
        const newList = await this.listsRepository.create(createListInput);
        return this.listsRepository.save(newList);
    }

    async findAll(): Promise<List[]> {
        return this.listsRepository.find();
    }

    getTasks(listId: number): Promise<Task[]> {
        return this.tasksService.find(listId);
    }
}
