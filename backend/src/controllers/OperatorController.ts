import { Body, Controller, Get, Post, Route, Tags } from 'tsoa'

import { OperatorRequest } from './requests/OperatorRequest';
import { OperatorResponse } from './responses/OperatorResponse';
import { postOperator, getOperatorEventsNum, getOperatorEvent, getOperatorsNum, getOperator } from '../helpers/blockchain';
import { BlockchainOperator } from 'helpers/BlockchainOperator';
import { getAllOperators } from './services';
const uuidv4 = require('uuid/v4');

@Tags('Operators')
@Route('operator')
export class OperatorController extends Controller {
    @Post('')
    public async createOperator(@Body() request: OperatorRequest): Promise<OperatorResponse> {
        const id = uuidv4()
        const date = new Date();
        const timestamp = date.getTime();

        await postOperator({
            id,
            name: request.name,
            registrationTimestamp: timestamp
        })

        return {
            id,
            name: request.name,
            registrationTimestamp: this.formatDate(timestamp)
        }
    }

    @Get()
    public async getOperators(): Promise<OperatorResponse[]> {
        return getAllOperators()
    }

    private formatDate(timestamp: number) {
        const date = new Date(timestamp)
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }
}