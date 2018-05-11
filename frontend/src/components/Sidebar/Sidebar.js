import React,{Component} from 'react';
import classes from './Sidebar.css';
class Sidebar extends Component  {

        state = {
            showSeason:false
        }

        
        dropdownHandler = () => {
            const newState = !this.state.showSeason
            this.setState({showSeason:newState})
        }
        
        render(){
            let dropdownMenu = null;
            if(this.state.showSeason){
                dropdownMenu = (
                    <div className={classes.dropdown_container}>
                             <a href="#about">Season 1</a>
                             <a href="#about">Season 2</a>
                             <a href="#about">Season 3</a>
                             <a href="#about">Season 4</a>
                             <a href="#about">Season 5</a>
                             <a href="#about">Season 6</a>
                             <a href="#about">Season 7</a>
                             <a href="#about">Season 8</a>
                         </div>
               
                ) 
            } 
            return (
                        
                        <div className={classes.sidenav}>
                            <a href="#about">About</a>
                            <a href="#services">Services</a>
                            <a href="#clients">Clients</a>
                            <a href="#contact">Contact</a>
                            <button className={classes.dropdown_btn}>Dropdown
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className={classes.dropdown_container}>
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                            <a href="#contact">Search</a>
                            </div> 

                
           
             )        
        }
    }
    

export default Sidebar;