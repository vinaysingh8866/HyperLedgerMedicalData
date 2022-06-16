/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Insulin } from './types/insulin';
import { Patient } from './types/patient';

@Info({ title: 'DataTransfer', description: 'Smart contract for transfering data' })
export class DataTransferContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        const assets: Patient[] = [
        ];

        for (const asset of assets) {
            await ctx.stub.putState(asset.ID, Buffer.from(JSON.stringify(asset)));
            console.info(`Patient ${asset.ID} initialized`);
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
    public async CreatePatient(ctx: Context, _ID: string, _EyeColor: string, _Name: string, _BloodGroup: string): Promise<vo_ID> {
        const asset: Patient = {
            ID: _ID,
            EyeColor: _EyeColor,
            Name: _Name,
            BloodGroup: _BloodGroup,
        };
        await ctx.stub.putState(_ID, Buffer.from(JSON.stringify(asset)));
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
        return patient;
    }

    // @notice UpdateAsset updates an existing asset in the world state with prov_IDed parameters.
    @Transaction()
    public async UpdateInsulin(ctx: Context, _ID: string, _InsulinData: Insulin): Promise<void> {
        const exists = await this.PatientExists(ctx, _ID);
        if (!exists) {
            throw new Error(`The asset ${_ID} does not exist`);
        }

        // overwriting original patient data with new data

        const patient: Patient = await this.ReadPatient(ctx, _ID)
        let iData: Insulin[] = patient.InsulinData
        iData.push(_InsulinData)
        const updatedPatient: Patient = {
            ID: '',
            EyeColor: '',
            Name: '',
            BloodGroup: '',
            InsulinData: iData
        }

        return ctx.stub.putState(_ID, Buffer.from(JSON.stringify(updatedPatient)));
    }

    // DeletePatient deletes an given asset from the world state.
    @Transaction()
    public async DeletePatient(ctx: Context, _ID: string): Promise<void> {
        const exists = await this.PatientExists(ctx, _ID);
        if (!exists) {
            throw new Error(`The asset ${_ID} does not exist`);
        }
        return ctx.stub.deleteState(_ID);
    }

    //@notice PatientExists returns true when Patent with given ID exists in world state.
    @Transaction(false)
    @Returns('boolean')
    public async PatientExists(ctx: Context, _ID: string): Promise<boolean> {
        const assetJSON = await ctx.stub.getState(_ID);
        return assetJSON && assetJSON.length > 0;
    }
}
