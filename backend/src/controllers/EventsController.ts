import { Body, Controller, Get, Post, Route, Tags } from 'tsoa'

import { NewEventRequest } from './requests/NewEventRequest';
import { EventResponse } from './responses/EventResponse';
import { postEvent, getEvent, getAllEventsNum, getOperatorEvent, getOperatorEventsNum } from '../helpers/blockchain';
import { BlockchainEvent } from 'helpers/BlockchainEvent';
import { getAllOperatorsMap } from './services';
import { OperatorResponse } from './responses/OperatorResponse';

@Tags('Events')
@Route('events')
export class EventsController extends Controller {
    @Post('')
    public async createEvent(@Body() request: NewEventRequest): Promise<EventResponse> {
        let date = new Date();
        let timestamp = date.getTime();

        const amountInCents = request.amount * 100

        let settlementAmount = Math.floor(amountInCents * 0.1)
        await postEvent(
            {
                tagId: request.tagId,
                tollOperatorId: request.tollOperatorId,
                tagOperatorId: request.tagOperatorId,
                amount: amountInCents,
                settlementAmount,
                location: request.location,
                timestamp
            }
        )

        const operatorForId = await getAllOperatorsMap()

        return {
            tagId: request.tagId,
            tollOperatorId: request.tollOperatorId,
            tollOperatorName: this.operatorName(operatorForId, request.tollOperatorId),
            tagOperatorId: request.tagOperatorId,
            tagOperatorName: this.operatorName(operatorForId, request.tagOperatorId),
            amount: amountInCents / 100.0,
            settlementAmount: settlementAmount / 100.0,
            location: request.location,
            timestamp: this.formatDate(timestamp)
       }
    }

    @Get('all')
    public async getAllEvents(): Promise<EventResponse[]> {
        const operatorForId = await getAllOperatorsMap()
        const eventsNum: number = await getAllEventsNum()
        const result: EventResponse[] = []
        for (let i = 0; i < eventsNum; i++) {
            const event: BlockchainEvent = await getEvent(i)
            result.push(
                {
                    tagId: event.tagId,
                    tollOperatorId: event.tollOperatorId,
                    tollOperatorName: this.operatorName(operatorForId, event.tollOperatorId),
                    tagOperatorId: event.tagOperatorId,
                    tagOperatorName: this.operatorName(operatorForId, event.tagOperatorId),
                    amount: event.amount / 100.0,
                    settlementAmount: event.settlementAmount / 100.0,
                    location: event.location,
                    timestamp: this.formatDate(event.timestamp)
                }
            )
        }
        return result
    }

    @Get('{tollOperatorId}')
    public async getEvents(tollOperatorId: string): Promise<EventResponse[]> {
        const operatorForId = await getAllOperatorsMap()
        const eventsNum: number = await getOperatorEventsNum(tollOperatorId)
        const result: EventResponse[] = []
        for (let i = 0; i < eventsNum; i++) {
            const event: BlockchainEvent = await getOperatorEvent(tollOperatorId, i)
            result.push(
                {
                    tagId: event.tagId,
                    tollOperatorId: event.tollOperatorId,
                    tollOperatorName: this.operatorName(operatorForId, event.tollOperatorId),
                    tagOperatorId: event.tagOperatorId,
                    tagOperatorName: this.operatorName(operatorForId, event.tagOperatorId),
                    amount: event.amount / 100.0,
                    settlementAmount: event.settlementAmount / 100.0,
                    location: event.location,
                    timestamp: this.formatDate(event.timestamp)
                }
            )
        }
        return result
    }

    private formatDate(timestamp: number) {
        const date = new Date(timestamp)
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }

    private operatorName(operatorForId: Map<string, OperatorResponse>, operatorId: string): string {
        const operator = operatorForId[operatorId]
        return operator ? operator.name : '<not-found>'
    }
}