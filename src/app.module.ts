import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ListsModule } from './lists/lists.module';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import DatabaseConfig from '../config/database-config';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gpl'),
    }),
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
        database: configService.get<string>('database.database'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true
      }),
    }),
    ListsModule,
    TasksModule,
  ],
})
export class AppModule {}
