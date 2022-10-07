import { Test, TestingModule } from '@nestjs/testing';
import { ListsService } from './lists.service';
import { ListsResolver } from './lists.resolver';

describe('ListResolver', () => {
  let resolver: ListsResolver;

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
          }),
        },
      ],
    }).compile();

    resolver = module.get<ListsResolver>(ListsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('lists', () => {
    it('should get the list array', async () => {
      expect(await resolver.findAll()).toEqual([
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
      expect(await resolver.findOne(1)).toEqual([{
          id: expect.any(Number),
          name: 'Product Meeting',
        }]);
    });
  });
});