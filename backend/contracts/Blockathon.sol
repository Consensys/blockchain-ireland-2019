pragma solidity >=0.4.0 <0.6.0;

contract Blockathon {

    struct Operator {
        string id;
        string name;
        uint registrationTimestamp;
    }

    struct Event {
        string tagId;
        string tollOperatorId;
        string tagOperatorId;
        int amount;
        int settlementAmount;
        string location;
        uint timestamp;
    }

    Operator[] operators;

    // Per operator id
    mapping(string => Event[]) events;
    // All events
    Event[] allEvents;

    function postOperator(string memory id, string memory name, uint registrationTimestamp) public {
        operators.push(Operator(id, name, registrationTimestamp));
    }

    function getOperator(uint position) public view returns (string memory, string memory, uint) {
        return(
            operators[position].id,
            operators[position].name,
            operators[position].registrationTimestamp
        );
    }

    function getOperatorsNum() public view returns(uint) {
        return operators.length;
    }

    function postEvent(
        string memory tagId,
        string memory tollOperatorId,
        string memory tagOperatorId,
        int amount,
        int feeAmount,
        string memory location,
        uint timestamp
        ) public {

        events[tollOperatorId].push(
            Event(
                tagId,
                tollOperatorId,
                tagOperatorId,
                amount,
                feeAmount,
                location,
                timestamp
            )
        );

        allEvents.push(
            Event(
                tagId,
                tollOperatorId,
                tagOperatorId,
                amount,
                amount - feeAmount,
                location,
                timestamp
            )
        );
    }

    function getOperatorEvent(string memory operatorId, uint position)
    public view returns (
        string memory,
        string memory,
        string memory,
        int,
        int,
        string memory,
        uint
        ) {
        return (
            events[operatorId][position].tagId,
            events[operatorId][position].tollOperatorId,
            events[operatorId][position].tagOperatorId,
            events[operatorId][position].amount,
            events[operatorId][position].settlementAmount,
            events[operatorId][position].location,
            events[operatorId][position].timestamp
        );
    }

    function getOperatorEventsNum(string memory operatorId) public view returns(uint) {
        return events[operatorId].length;
    }


    function getEvent(uint position)
    public view returns (
        string memory,
        string memory,
        string memory,
        int,
        int,
        string memory,
        uint
        ) {
        return (
            allEvents[position].tagId,
            allEvents[position].tollOperatorId,
            allEvents[position].tagOperatorId,
            allEvents[position].amount,
            allEvents[position].settlementAmount,
            allEvents[position].location,
            allEvents[position].timestamp
        );
    }

    function getAllEventsNum() public view returns(uint) {
        return allEvents.length;
    }
}