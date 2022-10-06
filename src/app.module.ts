import { Module } from '@nestjs/common';
import { ListsModuleV1 } from './api/v1/lists/lists.module';
import { TasksModuleV1 } from './api/v1/tasks/tasks.module';
import DatabaseConfig from './config/database-config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ListsModuleV1,
    TasksModuleV1,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        DatabaseConfig, 
      ],
    }),
  ],
})
export class AppModule {}
