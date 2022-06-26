/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';
import { Patient } from './patient';

interface Appointments {
  id: string;
  abstract: string;
  date:string;
  patientId: string;
  state:string
}


@Object()
export class Doctor {

    @Property()
    public ID: string;

    @Property()
    public Speciality: string;

    @Property()
    public Name: string;

    @Property()
    public dob: string;

    @Property()
    public Patients?: Patient[];

    @Property()
    public appointments?: Appointments[]

    @Property()
    public key?:string

    @Property()
    public docType?: string;

    

}