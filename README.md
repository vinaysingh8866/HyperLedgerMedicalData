
# HyperLedger Hospital Management 
A patient and doctor management system which shares data between hospitals using hyperdedger fabric blockchain. There are total 3 entities 
1. Hospital
2. Patient
3. Doctor

Hospital - Under this entity, Patients and Doctors get registered on the system and unique ID gets generated. 

Patient - This entity holds all the data related to patient. It enable patients to create appointments and select appropriate doctor based on the speciality. Patient can create appointment as per his preference and if new date/time suggested by doctor, he can accept/reject the suggested date/time.

Doctor - Under this entity, It holds doctor list and appointment list created by patinet. Each doctor can see appointments on his name and can have ability to accept/reject appointment or suggest a new date and time for it.






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
## Author

- [@vinaysingh8866](https://github.com/vinaysingh8866/)
- [@Tarandeep100](https://github.com/Tarandeep100/)
- [@Shweta-source-byte](https://github.com/Shweta-source-byte)
- [@Dimitri]
- [@Muhammad]

## State Diagram

![State Diagram](https://raw.githubusercontent.com/vinaysingh8866/HyperLedgerMedicalData/main/State%20Diagram.jpg)


## ScreenShots

![Patient ](https://raw.githubusercontent.com/vinaysingh8866/HyperLedgerMedicalData/main/PatientScreenShot.png)
![Hospital ](https://raw.githubusercontent.com/vinaysingh8866/HyperLedgerMedicalData/main/HospitalScreenShot.png)
![Doctor ](https://raw.githubusercontent.com/vinaysingh8866/HyperLedgerMedicalData/main/DoctorScreenShot.png)


