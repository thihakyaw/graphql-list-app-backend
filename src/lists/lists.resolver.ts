import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Task } from 'src/tasks/entities/task.entity';
import { CreateListInput } from './dto/create-list.input';
import { List } from './entities/list.entity';
import { ListsService } from './lists.service';

@Resolver(of => List)
export class ListsResolver {
    constructor(private listsService: ListsService) {}

    @Query(returns => [List], {name: 'lists'})
    findAll(): Promise<List[]> {
        return this.listsService.findAll();
    }

    @Mutation(returns => List, {name: 'createList'})
    create(@Args('createListInput') createListInput: CreateListInput): Promise<List> {
        return this.listsService.createList(createListInput);
    }

    @ResolveField(returns => [Task])
    tasks(@Parent() list: List): Promise<Task[]> {
      return this.listsService.getTasks(list.id)
    }
}
