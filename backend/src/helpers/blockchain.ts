import * as winston from "winston";
import * as truffleContract from "truffle-contract";
import { createWeb3Instance } from "../utils/blockChainUtils";
import { BlockchainEvent } from "./BlockchainEvent";
import { BlockchainOperator } from "./BlockchainOperator";

const BlockathonJSON = require(__dirname +
  "/../../build/contracts/Blockathon.json");
let Blockathon = truffleContract(BlockathonJSON);

async function postOperator(newAddress: BlockchainOperator) {
  let web3Instance: any;

  try {
    web3Instance = await createWeb3Instance();
  } catch (error) {
    winston.error("Error from createWeb3Instance():", error);
    throw error;
  }

  Blockathon.setProvider(web3Instance.currentProvider);

  let contractInstance = await Blockathon.deployed();

  winston.info(
    "\n\n\n contractInstance.address: " + contractInstance.address + "\n\n\n"
  );
  winston.info("New event to be saved: " + JSON.stringify(newAddress));

  try {
    return await contractInstance.postOperator(
      newAddress.id,
      newAddress.name,
      newAddress.registrationTimestamp,
      {
        from: web3Instance.eth.accounts[0],
        gas: 4000000
      }
    );
  } catch (e) {
    winston.error(e);
    throw { status: 500, message: e.message };
  }
}

async function getOperatorsNum(): Promise<number> {
  let web3Instance: any;

  try {
    web3Instance = await createWeb3Instance();

    Blockathon.setProvider(web3Instance.currentProvider);

    let contractInstance = await Blockathon.deployed();

    try {
      const num = await contractInstance.getOperatorsNum.call();
      winston.info(`Number of operators is ${num}`);
      return num;
    } catch (error) {
      winston.error(error);
      throw { status: 500, message: error.message };
    }
  } catch (error) {
    winston.error("Error from createWeb3Instance():", error);
    throw error;
  }
}

async function getOperator(pos: number): Promise<BlockchainOperator> {
  let web3Instance: any;

  try {
    web3Instance = await createWeb3Instance();

    Blockathon.setProvider(web3Instance.currentProvider);

    let contractInstance = await Blockathon.deployed();

    try {
      const operator = await contractInstance.getOperator.call(pos);
      winston.info(`Operator at pos ${pos} is ${JSON.stringify(operator)}`);
      return {
        id: operator[0],
        name: operator[1],
        registrationTimestamp: parseInt(operator[2], 10)
      };
    } catch (error) {
      winston.error(error);
      throw { status: 500, message: error.message };
    }
  } catch (error) {
    winston.error("Error from createWeb3Instance():", error);
    throw error;
  }
}

let postEvent = async (newEvent: BlockchainEvent) => {
  let web3Instance: any;

  try {
    web3Instance = await createWeb3Instance();
  } catch (error) {
    winston.error("Error from createWeb3Instance():", error);
    throw error;
  }

  Blockathon.setProvider(web3Instance.currentProvider);

  let contractInstance = await Blockathon.deployed();

  winston.info(
    "\n\n\n contractInstance.address: " + contractInstance.address + "\n\n\n"
  );
  winston.info("New event to be saved: " + newEvent);

  try {
    return await contractInstance.postEvent(
      newEvent.tagId,
      newEvent.tollOperatorId,
      newEvent.tagOperatorId,
      newEvent.amount,
      newEvent.settlementAmount,
      newEvent.location,
      newEvent.timestamp,
      {
        from: web3Instance.eth.accounts[0],
        gas: 4000000
      }
    );
  } catch (e) {
    winston.error(e);
    throw { status: 500, message: e.message };
  }
};

async function getOperatorEventsNum(operatorId: string): Promise<number> {
  let web3Instance: any;

  try {
    web3Instance = await createWeb3Instance();

    Blockathon.setProvider(web3Instance.currentProvider);

    let contractInstance = await Blockathon.deployed();

    try {
      const num = await contractInstance.getOperatorEventsNum.call(operatorId);
      winston.info(`Number of events for operator ${operatorId} is ${num}`);
      return num;
    } catch (error) {
      winston.error(error);
      throw { status: 500, message: error.message };
    }
  } catch (error) {
    winston.error("Error from createWeb3Instance():", error);
    throw error;
  }
}

async function getOperatorEvent(
  operatorId: string,
  pos: number
): Promise<BlockchainEvent> {
  let web3Instance: any;

  try {
    web3Instance = await createWeb3Instance();

    Blockathon.setProvider(web3Instance.currentProvider);

    let contractInstance = await Blockathon.deployed();

    try {
      const event = await contractInstance.getOperatorEvent.call(
        operatorId,
        pos
      );
      winston.info(
        `Event for operator ${operatorId} in position ${pos} is ${JSON.stringify(
          event
        )}`
      );
      return convertEvent(event);
    } catch (error) {
      winston.error(error);
      throw { status: 500, message: error.message };
    }
  } catch (error) {
    winston.error("Error from createWeb3Instance():", error);
    throw error;
  }
}

async function getAllEventsNum(): Promise<number> {
  let web3Instance: any;

  try {
    web3Instance = await createWeb3Instance();

    Blockathon.setProvider(web3Instance.currentProvider);

    let contractInstance = await Blockathon.deployed();

    try {
      const num = await contractInstance.getAllEventsNum.call();
      winston.info(`Total number of events is ${num}`);
      return num;
    } catch (error) {
      winston.error(error);
      throw { status: 500, message: error.message };
    }
  } catch (error) {
    winston.error("Error from createWeb3Instance():", error);
    throw error;
  }
}

async function getEvent(pos: number): Promise<BlockchainEvent> {
  let web3Instance: any;

  try {
    web3Instance = await createWeb3Instance();

    Blockathon.setProvider(web3Instance.currentProvider);

    let contractInstance = await Blockathon.deployed();

    try {
      const event = await contractInstance.getEvent.call(pos);
      winston.info(
        `Global event in position ${pos} is ${JSON.stringify(event)}`
      );
      return convertEvent(event);
    } catch (error) {
      winston.error(error);
      throw { status: 500, message: error.message };
    }
  } catch (error) {
    winston.error("Error from createWeb3Instance():", error);
    throw error;
  }
}

function convertEvent(event: any[]): BlockchainEvent {
  return {
    tagId: event[0],
    tollOperatorId: event[1],
    tagOperatorId: event[2],
    amount: parseInt(event[3], 10),
    settlementAmount: parseInt(event[4], 10),
    location: event[5],
    timestamp: parseInt(event[6], 10)
  };
}

export {
  postEvent,
  getAllEventsNum,
  getEvent,
  getOperatorEventsNum,
  getOperatorEvent,
  postOperator,
  getOperator,
  getOperatorsNum
};
