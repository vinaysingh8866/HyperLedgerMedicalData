/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Doctor } from './types/doctor';
import { Insulin } from './types/insulin';
import { Patient } from './types/patient';
interface query{
      selector:Patient;  
}
@Info({ title: 'DataTransfer', description: 'Smart contract for transfering data' })
export class DataTransferContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        const assets = [
            {
                BloodGroup:"b+",
                EyeColor:"brown",
                ID:"1",
                Name:"Vinay",
                docType:"patient"
            }
        ];
        for (const asset of assets) {
            await ctx.stub.putState(asset.ID, Buffer.from(JSON.stringify(asset)));
            console.info(`Patient ${asset.ID} initialized`);
            let indexName = 'docType~Name';
            let typeNameIndexKey = await ctx.stub.createCompositeKey(indexName, [asset.docType, asset.Name]);
            await ctx.stub.putState(typeNameIndexKey, Buffer.from('\u0000'));
        }

    }

    // GetAllAssets returns all assets found in the world state.
    @Transaction(false)
    @Returns('string')
    public async GetAllAssets(ctx: Context): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();

        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }

        return JSON.stringify(allResults);
    }

    // @notice CreatePatient issues a new Patient to the world state with given details.
    @Transaction()
    public async CreatePatient(ctx: Context, _ID: string, _EyeColor: string, _Name: string, _BloodGroup: string, _dob:string): Promise<void> {
        const asset: Patient = {
            ID: _ID,
            EyeColor: _EyeColor,
            Name: _Name,
            BloodGroup: _BloodGroup,
            docType:"patient",
            dob:_dob
        };
        await ctx.stub.putState(_ID, Buffer.from(JSON.stringify(asset)));

        let indexName = 'docType~Name';
		let typeNameIndexKey = await ctx.stub.createCompositeKey(indexName, [asset.docType, asset.Name]);

		//  Save index entry to state. Only the key name is needed, no need to store a duplicate copy of the marble.
		//  Note - passing a 'nil' value will effectively delete the key from state, therefore we pass null character as value
		await ctx.stub.putState(typeNameIndexKey, Buffer.from('\u0000'));
    }
    @Transaction()
    public async AddKeys(ctx: Context, _ID: string, _key:string): Promise<void> {
        const user = await this.ReadPatient(ctx, _ID)
        user.key = _key

		await ctx.stub.putState(_ID, Buffer.from(JSON.stringify(user)));
    }


    @Transaction()
    public async CreateDoctor(ctx: Context, _ID: string, _Speciality: string, _Name: string, _dob:string): Promise<void> {
        const asset: Doctor = {
            ID: _ID,
            Name: _Name,
            Speciality:_Speciality,
            docType:"doctor",
            dob:_dob
        };
        await ctx.stub.putState(_ID, Buffer.from(JSON.stringify(asset)));
        let indexName = 'docType~Name~Speciality';
		let typeNameIndexKey = await ctx.stub.createCompositeKey(indexName, [asset.docType, asset.Name, asset.Speciality]);

		//  Save index entry to state. Only the key name is needed, no need to store a duplicate copy of the marble.
		//  Note - passing a 'nil' value will effectively delete the key from state, therefore we pass null character as value
		await ctx.stub.putState(typeNameIndexKey, Buffer.from('\u0000'));
    }

    // @notice ReadPatient returns the patient stored in the world state with given _ID.
    @Transaction(false)
    public async ReadPatient(ctx: Context, _ID: string): Promise<Patient> {
        const patientJSON = await ctx.stub.getState(_ID);

        if (!patientJSON || patientJSON.length === 0) {
            throw new Error(`The asset ${_ID} does not exist`);
        }


        let jsonObj: any = JSON.parse(patientJSON.toString());
        let patient: Patient = <Patient>jsonObj;
        if (patient.docType != "doctor"){
            return patient;
        }
        return Promise.reject()
        
    }
    @Transaction(false)
    public async ReadDoctor(ctx: Context, _ID: string): Promise<Doctor> {
        const patientJSON = await ctx.stub.getState(_ID);

        if (!patientJSON || patientJSON.length === 0) {
            throw new Error(`The asset ${_ID} does not exist`);
        }


        let jsonObj: any = JSON.parse(patientJSON.toString());
        let doctor: Doctor = <Doctor>jsonObj;
        if (doctor.docType != "patient"){
            return doctor;
        }
        return Promise.reject()
        
    }

    @Transaction(false)
    public async ReadDoctorByName(ctx: Context, _Name: string): Promise<Object> {

        let queryString={"selector":{"docType":"", "Name":""}};
        queryString.selector.docType = 'doctor';
        queryString.selector.Name = _Name;
        return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString)); //shim.success(queryResults);
        
    }
    @Transaction(false)
    public async ReadDoctorBySpeciality(ctx: Context, _Speciality: string): Promise<Object> {
        let queryString={"selector":{"docType":"", "Speciality":""}};
        queryString.selector.docType = 'doctor';
        queryString.selector.Speciality = _Speciality;
        return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString)); //shim.success(queryResults);
    }
    async GetQueryResultForQueryString(ctx, queryString) {

		let resultsIterator = await ctx.stub.getQueryResult(queryString);
		let results = await this._GetAllResults(resultsIterator, false);

		return JSON.stringify(results);
	}
    async _GetAllResults(iterator, isHistory) {
		let allResults = [];
		let res = await iterator.next();
		while (!res.done) {
			if (res.value && res.value.value.toString()) {
				let jsonRes = {"TxId":"",Timestamp:"", "Value":"", "Key":"", "Record":"" };
				console.log(res.value.value.toString('utf8'));
				if (isHistory && isHistory === true) {
					jsonRes.TxId = res.value.txId;
					jsonRes.Timestamp = res.value.timestamp;
					try {
						jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
					} catch (err) {
						console.log(err);
						jsonRes.Value = res.value.value.toString('utf8');
					}
				} else {
					jsonRes.Key = res.value.key;
					try {
						jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
					} catch (err) {
						console.log(err);
						jsonRes.Record = res.value.value.toString('utf8');
					}
				}
				allResults.push(jsonRes);
			}
			res = await iterator.next();
		}
		iterator.close();
		return allResults;
	}
    
    


    @Transaction()
    public async AddAppointment(ctx: Context, _patientId: string, _doctorId: string, _abstract: string, _date:string): Promise<void> {
        const doctor = await this.ReadDoctor(ctx, _doctorId)
        doctor.appointments.push({abstract:_abstract,date:_date, id :(doctor.appointments.length+1).toString(), patientId:_patientId,state:"waiting"})
        await ctx.stub.putState(_doctorId, Buffer.from(JSON.stringify(doctor)));
    }

    @Transaction()
    public async DeleteDoctor(ctx: Context, _ID: string): Promise<void> {
        return ctx.stub.deleteState(_ID);
    }



    // @notice UpdateAsset updates an existing asset in the world state with prov_IDed parameters.
    // @Transaction()
    // public async UpdateInsulin(ctx: Context, _ID: string, _InsulinData: Insulin): Promise<void> {
    //     const exists = await this.PatientExists(ctx, _ID);
    //     if (!exists) {
    //         throw new Error(`The asset ${_ID} does not exist`);
    //     }

    //     // overwriting original patient data with new data
    //     const patient: Patient = await this.ReadPatient(ctx, _ID)
    //     patient.InsulinData.push(_InsulinData)

    //     return ctx.stub.putState(_ID, Buffer.from(JSON.stringify(patient)));
    // }

    // DeletePatient deletes an given asset from the world state.
    @Transaction()
    public async DeletePatient(ctx: Context, _ID: string): Promise<void> {
        const exists = await this.PatientExists(ctx, _ID);


        if (!exists) {
            throw new Error(`The asset ${_ID} does not exist`);
        }
        let patient = await this.ReadPatient(ctx, _ID)
        let indexName = 'docType~Name';
		let typeNameIndexKey = ctx.stub.createCompositeKey(indexName, [patient.docType, patient.Name]);

        return ctx.stub.deleteState(typeNameIndexKey);
    }

    //@notice PatientExists returns true when Patent with given ID exists in world state.
    @Transaction(false)
    @Returns('boolean')
    public async PatientExists(ctx: Context, _ID: string): Promise<boolean> {
        const assetJSON = await ctx.stub.getState(_ID);
        return assetJSON && assetJSON.length > 0;
    }
}
