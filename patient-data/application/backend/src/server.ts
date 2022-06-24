import { Gateway, GatewayOptions } from 'fabric-network';
import * as path from 'path';

import express from "express";
import { Wallet, Wallets } from 'fabric-network';
import * as fs from 'fs';

import FabricCAServices = require('fabric-ca-client');

const adminUserId = 'admin';
const adminUserPasswd = 'adminpw';

const buildCAClient = (ccp: Record<string, any>, caHostName: string): FabricCAServices => {
    // Create a new CA client for interacting with the CA.
    const caInfo = ccp.certificateAuthorities[caHostName]; // lookup CA details from config
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const caClient = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

    console.log(`Built a CA Client named ${caInfo.caName}`);
    return caClient;
};

const enrollAdmin = async (caClient: FabricCAServices, wallet: Wallet, orgMspId: string): Promise<void> => {
    try {
        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get(adminUserId);
        if (identity) {
            console.log('An identity for the admin user already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await caClient.enroll({ enrollmentID: adminUserId, enrollmentSecret: adminUserPasswd });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: orgMspId,
            type: 'X.509',
        };
        await wallet.put(adminUserId, x509Identity);
        console.log('Successfully enrolled admin user and imported it into the wallet');
    } catch (error) {
        console.error(`Failed to enroll admin user : ${error}`);
    }
};

const registerAndEnrollUser = async (caClient: FabricCAServices, wallet: Wallet, orgMspId: string, userId: string, affiliation: string): Promise<void> => {
    try {
        // Check to see if we've already enrolled the user
        const userIdentity = await wallet.get(userId);
        if (userIdentity) {
            console.log(`An identity for the user ${userId} already exists in the wallet`);
            return;
        }

        // Must use an admin to register a new user
        const adminIdentity = await wallet.get(adminUserId);
        if (!adminIdentity) {
            console.log('An identity for the admin user does not exist in the wallet');
            console.log('Enroll the admin user before retrying');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, adminUserId);

        // Register the user, enroll the user, and import the new identity into the wallet.
        // if affiliation is specified by client, the affiliation value must be configured in CA
        const secret = await caClient.register({
            affiliation,
            enrollmentID: userId,
            role: 'client',
        }, adminUser);
        const enrollment = await caClient.enroll({
            enrollmentID: userId,
            enrollmentSecret: secret,
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: orgMspId,
            type: 'X.509',
        };
        await wallet.put(userId, x509Identity);
        console.log(`Successfully registered and enrolled user ${userId} and imported it into the wallet`);
    } catch (error) {
        console.error(`Failed to register user : ${error}`);
    }
};

const buildCCPOrg1 = (): Record<string, any> => {
    // load the common connection configuration file
    const ccpPath = path.resolve(__dirname, '..', '..', '..', '..', 'test-network',
        'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
    const fileExists = fs.existsSync(ccpPath);
    if (!fileExists) {
        throw new Error(`no such file or directory: ${ccpPath}`);
    }
    const contents = fs.readFileSync(ccpPath, 'utf8');

    // build a JSON object from the file contents
    const ccp = JSON.parse(contents);

    console.log(`Loaded the network configuration located at ${ccpPath}`);
    return ccp;
};

const buildCCPOrg2 = (): Record<string, any> => {
    // load the common connection configuration file
    const ccpPath = path.resolve(__dirname, '..', '..', '..', '..', 'test-network',
        'organizations', 'peerOrganizations', 'org2.example.com', 'connection-org2.json');
    const fileExists = fs.existsSync(ccpPath);
    if (!fileExists) {
        throw new Error(`no such file or directory: ${ccpPath}`);
    }
    const contents = fs.readFileSync(ccpPath, 'utf8');

    // build a JSON object from the file contents
    const ccp = JSON.parse(contents);

    console.log(`Loaded the network configuration located at ${ccpPath}`);
    return ccp;
};

const buildWallet = async (walletPath: string): Promise<Wallet> => {
    // Create a new  wallet : Note that wallet is for managing identities.
    let wallet: Wallet;
    if (walletPath) {
        wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Built a file system wallet at ${walletPath}`);
    } else {
        wallet = await Wallets.newInMemoryWallet();
        console.log('Built an in memory wallet');
    }

    return wallet;
};

const prettyJSONString = (inputString: string): string => {
    if (inputString) {
         return JSON.stringify(JSON.parse(inputString), null, 2);
    } else {
         return inputString;
    }
};


const channelName = 'mychannel';
const chaincodeName = 'basic';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';
const ccp = buildCCPOrg1();

const caClient = buildCAClient(ccp, 'ca.org1.example.com');

// setup the wallet to hold the credentials of the application user
let wallet;
let gateway = new Gateway();

buildWallet(walletPath).then((_wallet)=>{
    wallet = _wallet;
  })



//--------------------
const app = express();
const port = 8080; 


app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );      
app.get( "/init", async ( req, res ) => {
    await enrollAdmin(caClient, wallet, mspOrg1)
    await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1')
    let gatewayOpts:GatewayOptions={
        wallet,
        identity: org1UserId,
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
    }; 
    await gateway.connect(ccp, gatewayOpts);

    // Build a network instance based on the channel where the smart contract is deployed
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(chaincodeName);

    // Initialize a set of asset data on the channel using the chaincode 'InitLedger' function.
    // This type of transaction would only be run once by an application the first time it was started after it
    // deployed the first time. Any updates to the chaincode deployed later would likely not need to run
    // an "init" type function.
    console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');
    await contract.submitTransaction('InitLedger');
    console.log('*** Result: committed');
    res.json({"result":"ok"})
    res.end()
} );

app.get( "/all", async ( req, res ) => {

    let gatewayOpts:GatewayOptions={
        wallet,
        identity: org1UserId,
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
    }; 

    await gateway.connect(ccp, gatewayOpts);
    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);
    let result = await contract.evaluateTransaction('GetAllAssets');
    let temp = prettyJSONString(result.toString())
    console.log((temp))
    res.json(temp)
    res.end()

})

app.get( "/create_patient", async ( req, res ) => {
    let gatewayOpts:GatewayOptions={
        wallet,
        identity: org1UserId,
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
    }; 

    await gateway.connect(ccp, gatewayOpts);
    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);
    await contract.submitTransaction('CreatePatient', '2', 'yellow', 'KuchBhi',"deadly");
    let result = await contract.evaluateTransaction('GetAllAssets');
    let temp = prettyJSONString(result.toString())
    res.json(temp)
    res.end()
})

app.post( "/read_patient", async ( req, res ) => {
    
    let id = req.query.id.toString()
    if(id == undefined){
        res.json({"error":"no id in request"})
        res.end()
    }

    let gatewayOpts:GatewayOptions={
        wallet,
        identity: org1UserId,
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
    }; 

    await gateway.connect(ccp, gatewayOpts);
    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);
    let result = await contract.evaluateTransaction('ReadPatient', id);
    let temp = prettyJSONString(result.toString())
    res.json(temp)
    res.end()
})




