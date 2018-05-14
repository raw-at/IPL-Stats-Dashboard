import axios from 'axios';
export const DATA_EXTRACT = "DATA_EXTRACT";
export const CHART_DATA_EXTRACT = "CHART_DATA_EXTRACT";
export const DATE_WISE_DATA = 'DATE_WISE_DATA';
export const PLAYER_DATA_EXTRACT = 'PLAYER_DATA_EXTRACT';
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
export const playerDataExtractor = (data) => {
    return {
        type:PLAYER_DATA_EXTRACT,
        player_data:data
    };

}

export const dataExtract = (seasonId) => {
    return dispatch => {
        axios.get('http://18.216.188.75:8000/season/'+seasonId).then((response)=>{
            dispatch(dataExtract_Done(response.data))
        })
    }
    
}


export const chartDataExtract = (seasonId,teamShortCode) => {
    return dispatch => {
        axios.get('http://18.216.188.75:8000/'+seasonId+'/'+teamShortCode).then((response)=>{
            dispatch(chartDataExtractor(response.data))
        })
    }
    
}

export const dateDataExtract = (date) => {
    return dispatch => {
        axios.get('http://18.216.188.75:8000/match/info/'+date).then((response)=>{
        
            dispatch(dateDataExtractor(response.data))
        })
    }
    
}


export const playerDataExtract = (season,player_name) => {
    return dispatch => {
        axios.get('http://18.216.188.75:8000/'+season+'/'+'player/'+player_name).then((response)=>{
            dispatch(playerDataExtractor(response.data))
        })
    }
    
}
