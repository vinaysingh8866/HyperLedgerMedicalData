
# HyperLedger Hospital Management 
A patient and doctor management system which shares data between hospitals using hyperdedger fabric blockchain.






## Running


Install hyperledger in root folder
```bash
  curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.0 1.4.9
```

Create Channel using test-network/network.sh

```bash
./network.sh up createChannel -s couchdb -ca
```

Install Chaincode on both organisations

```bash
./network.sh deployCC -ccn basic -ccp ../patient-data/chaincode-typescript/ -ccl typescript
```

Adding peer config
```
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051
```

Initialize chaincode to check if everything runs

```
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n basic --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"InitLedger","Args":[]}'
```

Running backend patient-data/application/backend
```
yarn
yarn start
```

Running front-end patient-data/application/frontend
```
yarn 
yarn start
```


## State Diagram

![State Diagram](https://raw.githubusercontent.com/vinaysingh8866/HyperLedgerMedicalData/main/State%20Diagram.jpg)


## ScrrenShots

![Patient ](https://raw.githubusercontent.com/vinaysingh8866/HyperLedgerMedicalData/main/PatientScreen.png)
![Hospital ](https://raw.githubusercontent.com/vinaysingh8866/HyperLedgerMedicalData/main/HospitalScreen.png)


