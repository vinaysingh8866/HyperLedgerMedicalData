/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';


interface InsulinData {
    id: string;
    date:string;
    data: object;
}

@Object()
export class Insulin {

    @Property()
    public ID: string;

    @Property()
    public data: InsulinData[];
}
