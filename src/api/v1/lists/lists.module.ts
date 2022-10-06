import { Module } from "@nestjs/common";
import { ListsController } from "./controllers/lists.controller";

@Module({
    controllers: [ListsController],
})
export class ListsModuleV1 {}