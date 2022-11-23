import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
// const salt = 10;

export function encodePassword(rawpassword : string){
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawpassword,salt)
}

export async function matchPassword(rawpassword : string, hashfromdb : string){
    // console.log("rawapasswrd", rawpassword,hashfromdb );
    
    // const check =  await bcrypt.compare(rawpassword, hashfromdb)
    // console.log("rawapasswrd", rawpassword,hashfromdb );
    // console.log("check", check);
    
    // return check;
    return bcrypt.compare(rawpassword, hashfromdb)
}
// const password = randomBytes(16)
 