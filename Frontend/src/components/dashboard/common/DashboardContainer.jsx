import React, { Children } from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function DashboardContainer({children}) {
    return (
        <div className="container-fluid">
            <div className="dashboard">
                {children}
            </div>
        </div>
    )
}

export default DashboardContainer;

