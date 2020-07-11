import React, { useEffect, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DashboardContainer from '../dashboard/common/DashboardContainer'
import ApiService from '../../services/web/ApiService'
import Loader from '../dashboard/common/Loader'
import { Link } from "react-router-dom";

export const MetadataItem = ({ item, patientId, saveCallback }) => {
    const id = item ? item.metadataItemId : undefined;
    const [nameField, setNameField] = useState(item ? item.name : "");
    const [valueField, setValueField] = useState(item ? item.value : "");
    const save = () => {
        let data = {}
        data.name = nameField
        data.value = valueField;
        data.patientId = patientId;
        if (id) {
            data.metadataItemId = id
            ApiService.put('/metadata/' + id, data)
        } else {
            ApiService.post('/metadata', data)
                .then((res) => {
                    if (saveCallback) {
                        saveCallback(res.data)
                    }
                    setNameField("");
                    setValueField("");
                })
        }
    }
    return (
        <div className="row">
            <div className="col-5">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" disabled={patientId ? false : true} className="form-control" placeholder="Name" value={nameField} onChange={(e) => { setNameField(e.target.value) }} />
                </div>
            </div>
            <div className="col-5">
                <div className="form-group">
                    <label>Value</label>
                    <input type="text" disabled={patientId ? false : true} className="form-control" placeholder="Value" value={valueField} onChange={(e) => { setValueField(e.target.value) }} />
                </div>
            </div>
            <div className="col-2">
                <div className="form-group">
                    <label></label>
                    <button type="button" disabled={patientId ? false : true} className="btn btn-primary btn-block form-control" onClick={() => save()}>Save</button>
                </div>
            </div>
        </div>
    )

}

export default MetadataItem;