/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';
import { Insulin } from './insulin';

@Object()
export class Patient {

    @Property()
    public ID: string;

    @Property()
    public EyeColor: string;

    @Property()
    public Name: string;

    @Property()
    public dob: string;

    @Property()
    public BloodGroup: string;

    @Property()
    public InsulinData?: Insulin[];

    @Property()
    public key?:string

    @Property()
    public docType?: string;
    
}
