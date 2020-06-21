import React from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
const CreateController = ({isComepled = true,addNode,deleteNode,shuffleNodes,save,onChangeName,name=""}) => {
   
    return (
        <div className="p-grid p-col-12 border-bottom p0 mlr0">
            <div className="p-col-12 p-md-3">
                <div className="p-inputgroup mtb10">
                    
                    <InputText
                        className="w100"
                        placeholder="Workflow Name"
                        value={name}
                        onChange={e => onChangeName(e.target.value)} />
                </div>
            </div>
            <div className="p-col-12 p-md-9 p-grid p0 p-justify-end p-align-center">
                {
                    isComepled &&
                    <div className="p-col-6 p-md-3">
                        <Button
                            label="Shuffle"
                            icon="pi pi-refresh"
                            style={{ backgroundColor: '#993dad', borderColor: '#993dad' }}
                            onClick={shuffleNodes}
                        />
                    </div>
                }
                <div className="p-col-6 p-md-3">
                    <Button
                        label="Delete"
                        icon="pi pi-times"
                        className="p-button-danger"
                        onClick={deleteNode}
                    />
                </div>
                <div className="p-col-6 p-md-3">
                    <Button
                        label="Add Note"
                        icon="pi pi-plus"
                        className="p-button-success"
                        onClick={addNode}
                    />
                </div>
                <div className="p-col-6 p-md-3">
                    <Button
                        label="Save"
                        icon="pi pi-save"
                        onClick={save}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateController;