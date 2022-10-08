import { Test, TestingModule } from '@nestjs/testing';
import { CreateListInput } from 'src/lists/dto/create-list.input';
import { ListsService } from '../../src/lists/lists.service';
import { ListsResolver } from '../../src/lists/lists.resolver';
import { CreateTaskInput } from './dto/create-task.input';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { TasksConstants } from './tasks.constants';
import { UpdateTaskInput } from './dto/update-task.input';
import { UpdateTaskOrder } from './dto/update-task-order.input';

describe('ListResolver', () => {
  let tasksResolver: TasksResolver;
  let listsResolver: ListsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksResolver,
        ListsResolver,
        {
            provide: ListsService,
            useFactory: () => ({
                create: jest.fn((list: CreateListInput) => ({
                    id: 1,
                    ...list,
                })),
            }),
        },
        {
          provide: TasksService,
          useFactory: () => ({
            create: jest.fn((task: CreateTaskInput) => ({
              id: 1,
              ...task,
            })),
            update: jest.fn((task: UpdateTaskInput) => ({
                id: 1,
                ...task,
            })),
            updateOrder: jest.fn((task: UpdateTaskOrder) => ([
                {
                    id: 4,
                    name: 'Foo Bar',
                    status: TasksConstants.INCOMPLETE,
                    listId: 1,
                    order: 1
                },
                {
                    id: 2,
                    name: 'John Doe',
                    status: TasksConstants.INCOMPLETE,
                    listId: 1,
                    order: 2
                },
                {
                    id: 3,
                    name: 'Jane Doe',
                    status: TasksConstants.INCOMPLETE,
                    listId: 1,
                    order: 3
                },
                {
                    id: 1,
                    name: 'Thiha Kyaw',
                    status: TasksConstants.INCOMPLETE,
                    listId: 1,
                    order: 4
                }
            ]))
          }),
        },
      ],
    }).compile();

    listsResolver = module.get<ListsResolver>(ListsResolver);
    tasksResolver = module.get<TasksResolver>(TasksResolver);
    
  });

  describe('tasks', () => {
    it('should create one task', async () => {
      const list = {
        id: 1,
        name: 'Recruting Canidate List'
      }

      const createdlist = await listsResolver.create(list)
      const task = {
        id: 1,
        name: 'Thiha Kyaw',
        status: TasksConstants.INCOMPLETE,
        listId: createdlist.id
      }
      expect(await tasksResolver.create(task)).toEqual({
          id: expect.any(Number),
          name: 'Thiha Kyaw',
          status: TasksConstants.INCOMPLETE,
          listId: createdlist.id
        });
    });

    it('should update one task', async () => {
        const list = {
          id: 1,
          name: 'Recruting Canidate List'
        }
  
        const createdlist = await listsResolver.create(list);
        const task = {
          id: 1,
          name: 'Thiha Kyaw',
          status: TasksConstants.INCOMPLETE,
          listId: createdlist.id,
        }
        await tasksResolver.create(task)

        const updateTask = {
            id: 1,
            name: 'Kyaw Thiha',
            status: TasksConstants.COMPLETED,
        }

        expect(await tasksResolver.update(updateTask)).toEqual({
            id: expect.any(Number),
            name: 'Kyaw Thiha',
            status: TasksConstants.COMPLETED,
          });
      });

    it('should update tasks order', async () => {
        const list = {
          id: 1,
          name: 'Recruting Canidate List'
        }
  
        const createdlist = await listsResolver.create(list);
        const task1 = {
          id: 1,
          name: 'Thiha Kyaw',
          status: TasksConstants.INCOMPLETE,
          listId: createdlist.id,
        };
        const task2 = {
          id: 2,
          name: 'John Doe',
          status: TasksConstants.INCOMPLETE,
          listId: createdlist.id,
        };
        const task3 = {
          id: 3,
          name: 'Jane Doe',
          status: TasksConstants.INCOMPLETE,
          listId: createdlist.id,
        }
        const task4 = {
          id: 4,
          name: 'Foo Bar',
          status: TasksConstants.INCOMPLETE,
          listId: createdlist.id,
        }
        await tasksResolver.create(task1);
        await tasksResolver.create(task2);
        await tasksResolver.create(task3);
        await tasksResolver.create(task4);

        const updateOrder = { ids: [4, 2, 3, 1] };
        expect(await tasksResolver.updateOrder(updateOrder)).toEqual([
          {
            ...task4,
            order: 1
          },
          {
            ...task2,
            order: 2
          },
          {
            ...task3,
            order: 3
          },
          {
            ...task1,
            order: 4
          },
        ]);
      });
  });
});