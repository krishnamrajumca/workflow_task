import React, { Component } from 'react';
import { connect } from 'react-redux'
import CreateController from './createController';
import Node from './node'
import moment from 'moment';
import { Growl } from 'primereact/growl';
import {NODE_STATUS,WORKFLOW_STATUS, addWorkflow,editWorkflow} from '../reducers/actions'
class CreateWorkFlow extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            status:WORKFLOW_STATUS[0],
            nodes: [],
            id:0
        }
    }
    static getDerivedStateFromProps(props, state) {
     
        const { state: propState } = props.location;
        
        if (propState) {
            const {workflow} = propState
            if (state.id !== workflow.id) {
                return {
                    ...workflow
                }
            }
            
        }
        return null
    }
    shuffle = (array) =>{
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


    addNode = () => {
      
        const nodes = this.state.nodes;
        nodes.push({ title: "", content: "", status: NODE_STATUS[0],id:moment().unix()+""+nodes.length })
        this.setState({nodes:nodes,status:WORKFLOW_STATUS[0]})
    }
    deleteNode = () => {
        const nodes = this.state.nodes;
        
        if (nodes.length) {
            nodes.pop()
            this.setState({ nodes: nodes })
        }
        
    }
    shuffleNodes = () => {
        const shuffledNodes = this.shuffle(this.state.nodes);
        this.setState({nodes:shuffledNodes})
    }
    save = () => {
        if (this.state.name && this.state.nodes.length !==0) {
            if (this.state.id === 0) {
                const newState = { ...this.state, id: "workflow_" + moment().unix() }
                this.props.addWorkFlow(newState);
            }
            else {
            
                this.props.editWorkflow(this.state, this.props.location.state.index)
            }
            this.props.history.push("/workflow")
        }
        else {
            if (!this.state.name) {
                this.growl.show({ severity: 'error', summary: 'Workflow Not Saved', detail: 'Workflow name is not a empty filed' });
            }
            if (this.state.nodes.length === 0) {
                this.growl.show({ severity: 'error', summary: 'Workflow Not Saved', detail: 'Add atleast one node to workflow' });
            }
            
        }
    }
    changeName = (value) => {
        
        this.setState({name:value})
    }
    onChangeNode = (node, index) => {
        const nodes = this.state.nodes
        nodes[index] = node;
        this.setState({nodes:nodes})
    }
    updateStatus = (node,nodes,index) => {
        const status = NODE_STATUS[(NODE_STATUS.indexOf(node.status) + 1) % 3];
        const newNode = { ...node, ...{ status } }
        nodes[index] = newNode;
        
        if (status === NODE_STATUS[0]) {
           
            nodes = nodes.map((node, idx) => {
                if (idx > index) {
                    node = { ...node, ...{ status: NODE_STATUS[0] } }
                   
                }
                return node;
            })
        
        }
        
            this.setState({ nodes: nodes })
        
        
        
    }
    onChangeStatus = (index) => {
        
        const nodes = this.state.nodes;
        const preNodes = nodes.slice(0, index)
        const currentNode = nodes[index];
        if (currentNode.status === NODE_STATUS[1]) {
            if (preNodes.length === 0) {
                this.updateStatus(currentNode, nodes, index)
            }
            else {
                const notCompeledNodes = preNodes.filter(node => node.status !== NODE_STATUS[2])
                
                if (notCompeledNodes.length === 0) {
                    this.updateStatus(currentNode, nodes, index)
                }
            }
        }
        else {
            this.updateStatus(currentNode, nodes, index)
        }
        
    }
    render() {
        // console.log("nodes",this.state)
        const showShuffle = this.state.nodes.length > 1 && this.state.nodes.filter(node => node.status !== NODE_STATUS[2]).length === 0
        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <CreateController
                    isComepled={showShuffle}
                    addNode={this.addNode}
                    deleteNode={this.deleteNode}
                    shuffleNodes={this.shuffleNodes}
                    save={this.save}
                    name ={this.state.name}
                    onChangeName={this.changeName}
                />
                <div className="p-col-12 p-sm-12 p-grid scroll">
                    {
                        this.state.nodes.map((node,index)=>{
                            return (
                                <Node
                                    node={node}
                                    key={node.id}
                                    index={index}
                                    callback={this.onChangeNode}
                                    onChangeStatus={this.onChangeStatus}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addWorkFlow: (workflow) => dispatch(addWorkflow(workflow)),
        editWorkflow:(workflow,index) => dispatch(editWorkflow(workflow,index))
    }
}
export default connect(null, mapDispatchToProps)(CreateWorkFlow)
