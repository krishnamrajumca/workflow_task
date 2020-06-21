import React from 'react'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { connect } from 'react-redux';
import {loginAction} from '../reducers/actions'
class Login extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            isRemember:false
        }
    }
    componentDidMount() {
        if (this.props.loggedIn) {
            this.props.history.push("/workflow")
        }
        const loginDetails = localStorage.getItem("loginDetails");
        if (loginDetails) {
            this.setState(JSON.parse(loginDetails) )
        }
    }
    login = () => {
        if (this.state.isRemember) {
            localStorage.setItem("loginDetails",JSON.stringify(this.state))
        }
        this.props.loginAction()
        this.props.history.push('/workflow')
    }
    render() {
        return(
            <div id="login-page">
                
                <Card>
                    <div className="mtb10" style={{color:"black",fontWeight:'bold'}}>
                        Login Page
                    </div>
                    
                    <div className="p-inputgroup mtb10">
                        <span className="p-inputgroup-addon white">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText className="w100" placeholder="Username" value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})}/>
                    </div>
                    <div className="p-inputgroup mtb10">
                        <span className="p-inputgroup-addon white">
                            <i className="pi pi-lock"></i>
                        </span>
                        <Password className="w100" placeholder="Password" feedback={false} value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}/>
                    </div>
                    <div className="p-col-12 mtb10 align-left">
                        <Checkbox inputId="cb1" value="isRemember" onChange={()=>this.setState({isRemember:!this.state.isRemember})} checked={this.state.isRemember}></Checkbox>
                        <label htmlFor="cb1" className="p-checkbox-label">Remember me</label>
                    </div>
                    <div className="mtb10">
                        <Button label="Login" onClick={this.login} style={{width:'100%'}}/>
                    </div>
                    <div className="mtb10">
                        <p className="sign_up">Don't have an account? sign up here</p>
                    </div>
                </Card>
                
            </div>
        )
    }
}
const  mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loginAction: () => dispatch(loginAction())
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        loggedIn: state.workflowReducer.loggedIn
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)