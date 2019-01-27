var Blockathon = artifacts.require('./Blockathon.sol');
const uuidv4 =require('uuid/v4');

const ONE_DAY = 86400000

const tollTagId = '4a38c438-94e8-40e3-9903-69f486eabb3'
const eFlowId = '69f486ea-94e8-40e3-9903-4a38c4386267'
const directRouteId = '94e894e8-40e3-9903-69f4-86eabb369f4'

module.exports = async function(deployer, network, accounts) {
    const contractInstance = await Blockathon.deployed()

    await createOperators(contractInstance, accounts)
    await eFlowTollsTransactions(contractInstance, accounts)
    await directRouteTransactions(contractInstance, accounts)
    await tollTagTransactions(contractInstance, accounts)
};

function randomTimeAgo() {
    const timestamp = new Date().getTime() - Math.random() * 10 * ONE_DAY
    return Math.floor(timestamp)
}

async function createOperators(contractInstance, accounts) {
    await contractInstance.postOperator(
      tollTagId,
      'TollTag.ie',
      new Date().getTime() - 15 * ONE_DAY,
      {
        from: accounts[0],
        gas: 4000000
      }
    )

    await contractInstance.postOperator(
      eFlowId,
      'eFlow',
      new Date().getTime() - 25 * ONE_DAY,
      {
        from: accounts[0],
        gas: 4000000
      }
    )

    await contractInstance.postOperator(
      directRouteId,
      'Direct Route',
      new Date().getTime() - 35 * ONE_DAY,
      {
        from: accounts[0],
        gas: 4000000
      }
    )
}

async function eFlowTollsTransactions(contractInstance, accounts) {
    await contractInstance.postEvent(
        'toll-tag-1',
        eFlowId,
        tollTagId,
        100,
        10,
        'M50 Dublin',
        randomTimeAgo(),
        {
          from: accounts[0],
          gas: 4000000
        }
      );

    await contractInstance.postEvent(
        'toll-tag-2',
        eFlowId,
        tollTagId,
        500,
        50,
        'M50 Dublin',
        randomTimeAgo(),
        {
          from: accounts[0],
          gas: 4000000
        }
      );

    await contractInstance.postEvent(
        'toll-tag-1',
        eFlowId,
        tollTagId,
        100,
        10,
        'M3 Clonee Kells',
        randomTimeAgo(),
        {
          from: accounts[0],
          gas: 4000000
        }
      );

    await contractInstance.postEvent(
       'toll-tag-4',
        eFlowId,
        tollTagId,
        1000,
        100,
        'M3 Clonee Kells',
        randomTimeAgo(),
        {
          from: accounts[0],
          gas: 4000000
        }
      );

    await contractInstance.postEvent(
       'toll-tag-7',
        eFlowId,
        tollTagId,
        450,
        45,
        'M3 Clonee Kells',
        randomTimeAgo(),
        {
          from: accounts[0],
          gas: 4000000
        }
      );

    await contractInstance.postEvent(
       'eflow-tag-6',
        eFlowId,
        eFlowId,
        200,
        20,
        'East Link',
        randomTimeAgo(),
        {
          from: accounts[0],
          gas: 4000000
        }
      );
}

async function tollTagTransactions(contractInstance, accounts) {
    await contractInstance.postEvent(
        'eflow-tag-1',
        tollTagId,
        eFlowId,
        700,
        70,
        'Limerick Tunnel',
        randomTimeAgo(),
        {
          from: accounts[0],
          gas: 4000000
        }
      );

    await contractInstance.postEvent(
        'direct-route-tag-2',
        tollTagId,
        directRouteId,
        500,
        50,
        'Limerick Tunnel',
        randomTimeAgo(),
        {
          from: accounts[0],
          gas: 4000000
        }
      );

    await contractInstance.postEvent(
        'direct-route-tag-2',
        tollTagId,
        directRouteId,
        200,
        20,
        'M8 Fermoy',
        randomTimeAgo(),
        {
          from: accounts[0],
          gas: 4000000
        }
      );

    await contractInstance.postEvent(
        'toll-tag-3',
        tollTagId,
        tollTagId,
        500,
        50,
        'M8 Fermoy',
        randomTimeAgo(),
        {
          from: accounts[0],
          gas: 4000000
        }
      );

    await contractInstance.postEvent(
        'direct-route-tag-2',
        tollTagId,
        directRouteId,
        100,
        10,
        'M8 Fermoy',
        randomTimeAgo(),
        {
          from: accounts[0],
          gas: 4000000
        }
      );
}

async function directRouteTransactions(contractInstance, accounts) {
    await contractInstance.postEvent(
        'eflow-tag-1',
        directRouteId,
        eFlowId,
        700,
        70,
        'M25 Waterford',
        randomTimeAgo(),
        {
          from: accounts[0],
          gas: 4000000
        }
      );

    await contractInstance.postEvent(
        'eflow-tag-2',
        directRouteId,
        eFlowId,
        500,
        50,
        'M25 Waterford',
        randomTimeAgo(),
        {
          from: accounts[0],
          gas: 4000000
        }
      );
}