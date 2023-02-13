import { HOLDINGS } from "../../src/config/url";
import { apiGet } from "../../src/utils/utils";
import { store } from "../store";
const {dispatch} = store


export const getHoldings = ( query = '',data = {}, headers = {})=>{
    return new Promise((resolve,reject)=>{
        apiGet(HOLDINGS+query).then(res=>{
            // console.log(res,"this is response")
            resolve(res)
        })
        .catch(e=>{
            reject(e)
            console.log(e,'error in api hit')
        })
    })
}