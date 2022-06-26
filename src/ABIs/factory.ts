export const FACTORY_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "deployedAddr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "companyToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "baseURI",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "vestingPeriod",
        "type": "uint256"
      }
    ],
    "name": "newCompanyCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol_",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "companyToken_",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "host_",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "superTokenFactory_",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "vestingPeriod",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "baseURI",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          }
        ],
        "internalType": "struct CompanyFactory.MetadataInfo",
        "name": "metadataInfo_",
        "type": "tuple"
      }
    ],
    "name": "createCompany",
    "outputs": [
      {
        "internalType": "address",
        "name": "newCompanyAddr",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
