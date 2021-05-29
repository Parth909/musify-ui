import React from 'react';
import './SidebarOption.css';

function SidebarOption({ title, Icon}) {
    return (
        <div className="sidebarOption">

            {Icon && <Icon className="sidebarOption__icon" />}

            {Icon ? <span>{title}</span> : <span className="sidebarOption__ptitle">{title}</span>}

            
        </div>
    )
}

export default SidebarOption
