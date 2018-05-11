import axios from 'axios';
export const DATA_EXTRACT = "DATA_EXTRACT";
export const CHART_DATA_EXTRACT = "CHART_DATA_EXTRACT";
export const DATE_WISE_DATA = 'DATE_WISE_DATA';


export const dataExtract_Done = (data) => {
            
    return {
        type:DATA_EXTRACT,
        data:data
    };
}
export const chartDataExtractor = (data) => {
    return {
        type:CHART_DATA_EXTRACT,
        data:data
    };

}

export const dateDataExtractor = (data) => {
    return {
        type:DATE_WISE_DATA,
        date_wise:data
    };

}


export const dataExtract = (seasonId) => {
    return dispatch => {
        axios.get('http://localhost:8000/season/'+seasonId).then((response)=>{
            dispatch(dataExtract_Done(response.data))
        })
    }
    
}


export const chartDataExtract = (seasonId,teamShortCode) => {
    return dispatch => {
        axios.get('http://localhost:8000/'+seasonId+'/'+teamShortCode).then((response)=>{
            dispatch(chartDataExtractor(response.data))
        })
    }
    
}

export const dateDataExtract = (date) => {
    return dispatch => {
        axios.get('http://localhost:8000/'+date).then((response)=>{
            dispatch(dateDataExtractor(response.data))
        })
    }
    
}
