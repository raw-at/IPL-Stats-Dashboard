import React from 'react';
const error = () => {
    return (
        <div className="container-fluid" style={{"color":"white"}}>
            <div className="row">
                <div className="col-xs-12 col-sm-12">
                    <span style={{"font-size":"130px","margin-left":"20%","color":"red"}}>Page Not Found!</span>
                    <br />
                    <span style={{"font-size":"100px","margin-left":"23%"}}>Error: 404 Go Back</span>
                </div>
            </div>
        </div>
    )
}

export default error;