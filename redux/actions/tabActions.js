import { tradeModal } from "../reducers/tabReducers";
import { store } from "../store";
const {dispatch} = store
export const tradeModalAction = (isVisible) =>{
    console.log('tradeModalAction dispatched')
    dispatch(tradeModal(isVisible))
}