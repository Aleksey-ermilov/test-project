import * as mongoose from 'mongoose'

export interface ITokenPayload {
    _id:  mongoose.Types.ObjectId;
    roles: string;
}
