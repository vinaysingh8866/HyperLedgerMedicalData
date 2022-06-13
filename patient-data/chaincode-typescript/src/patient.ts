/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class Asset {

    @Property()
    public ID: string;

    @Property()
    public EyeColor: string;

    @Property()
    public Name: string;

    @Property()
    public BloodGroup: string;

}
