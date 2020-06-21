import React from 'react'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import {NODE_STATUS} from '../reducers/actions'
const Node = ({ node, callback, index, onChangeStatus }) => {
 
    const status = node.status === NODE_STATUS[0] ? "gray" : node.status === NODE_STATUS[2] ? "green" : "blue";
    const classname = `circle ${status}`
    const onChangeTitle = (title) => {
        const newNode = { ...node, ...{ title } }
        callback(newNode,index)
    }
    const onChangeContent = (content) => {
        const newNode = { ...node, ...{ content } }
        callback(newNode,index)
    }
    const changeStatus = () => {
        
        onChangeStatus(index)
    }
    return(
        <div className="p-col-12 p-md-4">
            <Card className="node-card">
                <div className="p-col-12 p-grid p-dir-col plr0 mlr0" style={{height:'300px',position:'relative'}}>
                    <div className="p-col-12 border-bottom" style={{height:'50px'}}>
                        <InputText
                            className="w100"
                            placeholder="Title"
                            value={node.title}
                            onChange={(e) => onChangeTitle(e.target.value)} />
                    </div>
                    <div className="p-col-12 plr0">
                        <InputTextarea
                            rows={10}
                            cols={30}
                            value={node.content}
                            autoResize={true}
                            onChange={(e) => onChangeContent(e.target.value)} />
                    </div>
                </div>
                <div className={classname} onClick={()=>changeStatus()}>
                    <i className="pi pi-check"></i>
                </div>
            </Card>
        </div>
    )
}

export default Node;