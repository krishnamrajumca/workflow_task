import React,{useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {logout} from '../reducers/actions'
const Header = () => {
    const loggedIn = useSelector(state => state.workflowReducer.loggedIn);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        
        if(!loggedIn)
            history.push("/")
    }, [loggedIn])
    return (
        <header>
            <div className="p-grid p-col-12">
                <div className="p-col p-sm-6 align-left flex">
                    <i className="pi pi-sitemap" style={{fontSize:'25px',marginRight:'10px'}}/>
                    WORKFLOW
                </div>
                {
                    loggedIn &&
                    <div className="p-col p-sm-6 align-right pointer logout-btn">
                        <span onClick={() => dispatch(logout())}>
                            LOGOUT
                        </span>
                    </div>
                }
                
            </div>
        </header>
    )
}

export default Header