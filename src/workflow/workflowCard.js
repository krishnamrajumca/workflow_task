import React from 'react';
import {WORKFLOW_STATUS} from '../reducers/actions'
import { Card } from 'primereact/card';
const WorkFlowCard = ({ workflow, editWorkflow, deleteWorkflow, index, updateStatus }) => {
    const color = workflow.status === WORKFLOW_STATUS[1] ? "green" : "gray"
    const classname = `p-col-4 p-sm-4 align-right circle ${color}` 
    
    return (
        <div className="p-col-12 p-sm-12 p-md-4 p-lg-3" style={{ position: 'relative' }} >
            <Card className=" workflow-card" >
                <div >
                    <div className="p-col-12 border-2 title" onClick={() => editWorkflow(workflow, index)}>
                        {workflow.name}
                    </div>
                    <div className="p-col-12 p-grid">
                        <div className="p-col-8 p-sm-8 align-left">
                            {workflow.status}
                        </div> 
                        <div className={classname} onClick={() => updateStatus(index )}>
                            <i className ="pi pi-check"/>
                        </div>
                    </div>

                    <div className="delete-card" onClick={()=>deleteWorkflow(index)}>
                        <i className="pi pi-trash" />
                    </div>
                </div>
            </Card>
            
        </div>
    )
}

export default WorkFlowCard