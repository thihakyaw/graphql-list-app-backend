import { Test, TestingModule } from '@nestjs/testing';
import { ListsService } from './lists.service';
import { ListsResolver } from './lists.resolver';
import { CreateListInput } from './dto/create-list.input';

describe('ListResolver', () => {
  let listsResolver: ListsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListsResolver,
        {
          provide: ListsService,
          useFactory: () => ({
            findAll: jest.fn(() => [
              {
                id: 1,
                name: 'Product Meeting',
              },
              {
                id: 2,
                name: 'Sprint Planning',
              },
              {
                id: 3,
                name: 'Backend List',
              },
            ]),
            findOne: jest.fn(() => [
              {
                id: 1,
                name: 'Product Meeting',
              }
            ]),
            create: jest.fn((list: CreateListInput) => ({
              id: 1,
              ...list,
            })),
          }),
        },
      ],
    }).compile();

    listsResolver = module.get<ListsResolver>(ListsResolver);
  });

  describe('lists', () => {
    it('should get the list array', async () => {
      expect(await listsResolver.findAll()).toEqual([
        {
          id: expect.any(Number),
          name: 'Product Meeting',
        },
        {
          id: expect.any(Number),
          name: 'Sprint Planning',
        },
        {
          id: expect.any(Number),
          name: 'Backend List',
        },
      ]);
    });

    it('should get one list', async () => {
      expect(await listsResolver.findOne(1)).toEqual([{
          id: expect.any(Number),
          name: 'Product Meeting',
        }]);
    });

    it('should create one list', async () => {
      const list = {
        id: 1,
        name: 'Recruting Canidate List'
      }
      expect(await listsResolver.create(list)).toEqual({
          id: expect.any(Number),
          name: 'Recruting Canidate List',
        });
    });
  });
});