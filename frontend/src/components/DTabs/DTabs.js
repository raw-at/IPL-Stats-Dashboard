import React from 'react';

const DTabs = () => {
    const style = {
        "box-shadow":" 0 4px 8px 0 rgba(0,0,0,0.2)",
        "margin-top":"2%",
        "width":"100%",

  
    }
    return (
        <div className="container-fluid" style={style}>
            <ul className="nav nav-tabs">
                <li className="active"><a data-toggle="tab" href="#home">Team Performance</a></li>
                
                <li><a data-toggle="tab" href="#menu3">Date Wise Match Performance</a></li>
                <li><a data-toggle="tab" href="#menu4">Player Information</a></li>
            </ul>

            <div className="tab-content">
                <div id="home" className="tab-pane fade in active">
                <h3>TEAM PERFORMANCE</h3>
                <p>Please Select A Team From DropDown</p>
                    <div className="form-group">
                        <label for="sel1">Select Team:</label>
                        <select style={{"background":" linear-gradient(to bottom right, #ffffff 0%, #ccffff 74%)"}} class="form-control" id="sel1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select><br />
                        <input type="submit" class="btn btn-primary" value="Get Result" />
                    </div> 
                </div>
                <div id="menu3" className="tab-pane fade">
                <h3>DATE WISE MATCH PERFORMANCE</h3>
                <p>Please Select A DATE From DropDown</p>
                    <div className="form-group">
                        <label for="sel1">Select Date:</label>
                        <select class="form-control" id="sel1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                        <br />
                        <input type="submit" class="btn btn-primary" value="Get Result" />
                    </div> 
               
               
                </div>

                <div id="menu4" className="tab-pane fade">
                <h3>PLAYER PERFORMANCE</h3>
                    <div className="form-group">
                        <label for="sel1">Select Team:</label>
                        <select class="form-control" id="sel1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    
                        <label for="sel2">Select Player:</label>
                        <select class="form-control" id="sel2">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                        <br />
                        <input type="submit" class="btn btn-primary" value="Get Result" />
                    </div> 
               
               
                </div>
            </div>
        </div>

    )
}

export default DTabs;