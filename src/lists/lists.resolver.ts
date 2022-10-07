import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Task } from '../tasks/entities/task.entity';
import { CreateListInput } from './dto/create-list.input';
import { List } from './entities/list.entity';
import { ListsService } from './lists.service';

@Resolver(of => List)
export class ListsResolver {
    constructor(private listsService: ListsService) {}

    @Query(() => [List], {name: 'lists'})
    findAll(): Promise<List[]> {
        return this.listsService.findAll();
    }

    @Query(() => List, {name: 'list'})
    findOne(@Args('id', { type: () => Int}) id: number): Promise<List> {
        return this.listsService.findOne(id);
    }

    @Mutation(() => List, {name: 'createList'})
    create(@Args('createListInput') createListInput: CreateListInput): Promise<List> {
        return this.listsService.createList(createListInput);
    }

    @ResolveField(() => [Task])
    tasks(@Parent() list: List): Promise<Task[]> {
      return this.listsService.getTasks(list.id)
    }
}
