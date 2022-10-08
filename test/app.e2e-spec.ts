import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { List } from '../src/lists/entities/list.entity';

const lists: List[] = [
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
];

const gql = '/graphql';

describe('GraphQL AppResolver (e2e) {Supertest}', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(gql, () => {
    describe('lists', () => {
      it('should get the lists array', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({ query: '{lists {id name }}' })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.lists).toEqual(lists);
          });
      });
    });
  });
});