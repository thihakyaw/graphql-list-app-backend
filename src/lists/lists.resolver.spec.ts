import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from '../tasks/tasks.module';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { ListsModule } from './lists.module';
import DatabaseConfig from '../../config/database-config';
import * as request from 'supertest'

describe('ListsResolver', () => {
  let app: INestApplication;
  let repository: Repository<List>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ListsModule,
        TasksModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [
            DatabaseConfig, 
          ],
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get<string>('database.host'),
            port: configService.get<number>('database.port'),
            username: configService.get<string>('database.username'),
            password: configService.get<string>('database.password'),
            database: configService.get<string>('database.test_database'),
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true
          }),
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    repository = module.get('ListRepository');
  });
  
  afterEach(async () => {
    //await repository.query(`DELETE FROM lists;`);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('findAll', () => {

    it('should return an array of lists', async () => {
      // await repository.save([
      //   { name: 'Test List #1' },
      //   { name: 'Test List #2' }
      // ]);
      const mutation = `
        {
           lists {
             name
           }
        }
      `

      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: mutation,
        })

      expect(body).toEqual({
        data: {
          lists: [
            { name: 'Test List #1' },
            { name: 'Test List #2' }
          ]
        }
      });
    });
  });

});
