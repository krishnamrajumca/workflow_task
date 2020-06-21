import React, { PureComponent } from 'react';
import Controller from './controllers';
import {connect} from 'react-redux'
import WorkFlowCard from './workflowCard';
import { Growl } from 'primereact/growl';
import { deleteWorkflow,editWorkflow,WORKFLOW_STATUS,NODE_STATUS} from '../reducers/actions'
class Workflow extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            filter:'All'
        }
    }
   
    onSearch = (value) => {
        this.setState({searchKey:value.toLocaleLowerCase().trim()})
    }
    onFilter = value => {
        this.setState({filter:value})
    }
    onCreate = () => {
        this.props.history.push('/workflow/create')
    }
    filterData = () => {
        let workflows = this.props.workflows;
        const { filter, searchKey } = this.state;
        if (filter !== "All") {
            workflows = workflows.filter(workflow => workflow.status.toLowerCase() === filter.toLocaleLowerCase())
        }
        if (searchKey !== "") {
            workflows = workflows.filter(workflow => workflow.name.toLowerCase().indexOf(searchKey) !== -1)
        }
        return workflows
    }
    deleteWorkflow = (index) => {
        
        this.props.deleteWorkflow(index)
    }
    editWorkflow = (workflow,index) => {
        this.props.history.push('/workflow/create',{workflow,index})
    }
    updateStatus = (index) => {
        const { workflows } = this.props;
        let workflow = workflows[index];
        if (workflow.status === WORKFLOW_STATUS[1]) {
            workflow = { ...workflow, status: WORKFLOW_STATUS[0] }
            this.props.editWorkflow(workflow,index)
        }
        else {
            const length = workflow.nodes.filter(node => node.status !== NODE_STATUS[2]).length
            if (length === 0) {
                workflow = { ...workflow, status: WORKFLOW_STATUS[1] }
                this.props.editWorkflow(workflow, index)
            }
            else {
                this.growl.show({ severity: 'error', summary: 'Status Not Updated', detail: 'There are some in completed nodes in workflow' });
            }
        }
        
    }
    render() {
        const workflows = this.filterData()
        return (
            <div className="p-col-12 p-grid p0 mlr0">
                <Growl ref={(el) => this.growl = el} />
                <Controller onCreate={this.onCreate} onFilter={this.onFilter} onSearch={this.onSearch} />
                <div className="p-grid p20 p-col-12">
                    {
                        workflows.map((workflow,index) => {
                            return <WorkFlowCard
                                workflow={workflow}
                                key={workflow.id}
                                index={index}
                                deleteWorkflow={this.deleteWorkflow}
                                editWorkflow={this.editWorkflow}
                                updateStatus={this.updateStatus}
                            />
                        })
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        workflows: state.workflowReducer.workflows
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteWorkflow: (index) => dispatch(deleteWorkflow(index)),
        editWorkflow: (workflow, index) => dispatch(editWorkflow(workflow,index))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Workflow)