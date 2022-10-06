import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller({
    path: 'lists',
    version: '1',
})
export class ListsController {
    constructor(
    ) { }
    
    @Get('/')
    async getLists(@Res() res: Response): Promise<Response> {        
        return res.status(HttpStatus.OK).json({
            state: "success",
            data: null,
        });
    }
}
