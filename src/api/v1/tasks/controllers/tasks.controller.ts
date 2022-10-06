import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller({
    path: 'tasks',
    version: '1',
})
export class TasksController {
    constructor(
    ) { }
    
    @Get('/')
    async getTasks(@Res() res: Response): Promise<Response> {        
        return res.status(HttpStatus.OK).json({
            state: "success",
            data: null,
        });
    }
}
