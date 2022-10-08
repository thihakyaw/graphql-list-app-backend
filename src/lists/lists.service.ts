import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { TasksService } from '../tasks/tasks.service';
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

    async create(createListInput:CreateListInput): Promise<List> {
        const newList = await this.listsRepository.create(createListInput);
        return this.listsRepository.save(newList);
    }

    findOne(id: number): Promise<List> {
        return this.listsRepository.findOneOrFail({where: {id: id}});
    }

    async findAll(): Promise<List[]> {
        return this.listsRepository.find();
    }

    getTasks(listId: number): Promise<Task[]> {
        return this.tasksService.find(listId);
    }
}
