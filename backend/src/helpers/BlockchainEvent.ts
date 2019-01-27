export interface BlockchainEvent {
    tagId: string
    tollOperatorId: string
    tagOperatorId: string
    amount: number
    settlementAmount: number
    location: string
    timestamp: number
}