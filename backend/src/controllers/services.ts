import { BlockchainOperator } from 'helpers/BlockchainOperator'

import { getOperator, getOperatorsNum } from '../helpers/blockchain'
import { OperatorResponse } from './responses/OperatorResponse'

export async function getAllOperators(): Promise<OperatorResponse[]> {
    const operatorNum: number = await getOperatorsNum()
    const result: OperatorResponse[] = []
    for (let i = 0; i < operatorNum; i++) {
        const operator: BlockchainOperator = await getOperator(i)
        result.push(
            {
                id: operator.id,
                name: operator.name,
                registrationTimestamp: formatDate(operator.registrationTimestamp)
            }
        )
    }
    return result
}

export async function getAllOperatorsMap(): Promise<Map<string, OperatorResponse>> {
    const operators = await getAllOperators()
    const operatorForId = new Map<string, OperatorResponse>()
    for (let operator of operators) {
        operatorForId[operator.id] = operator
    }

    return operatorForId
}

function formatDate(timestamp: number) {
    const date = new Date(timestamp)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}