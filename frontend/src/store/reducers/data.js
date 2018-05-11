import * as actionTypes from '../actions/action';

const initialState = {
    data:null,
    seasonId:null,
    chartData:null,
    date_wise_data:null,
}


const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.DATA_EXTRACT:
            return {
                data:action.data,
            }
        case actionTypes.CHART_DATA_EXTRACT:
            return {
                chartData:action.data
            }

        case actionTypes.DATE_WISE_DATA:
            return{
                date_wise_data:action.date_wise
            }
        default:return state
    }
}

export default reducer;