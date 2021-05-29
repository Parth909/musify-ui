import React from 'react';
import {connect} from 'react-redux';
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import {Link} from 'react-router-dom';
import { Avatar } from "@material-ui/core";


function Sidebar({app:{user, playlists}}) {
    
    // pulling data from the data layer
    // const [{user, playlists}, dispatch] = useDataLayerValue();

    return (
        <div className="sidebar">
            <div className="user__avatarName">
                <Avatar className="user__avatar" alt={user?.display_name} src={user?.images[0]?.url} />
                <span>{user?.display_name}</span>
            </div>

            {/* SidebarOptions */}
            <Link to={"/home"} className="playlist__track">
                <SidebarOption Icon={HomeIcon} title="Home"/>
            </Link>

            <Link to={"/search"} className="playlist__track">
                <SidebarOption Icon={SearchIcon} title="Search"/>
            </Link>

            <Link to={"/playlist/07eEtrgU112xRdc1BbmdMw"} className="playlist__track">
                <SidebarOption Icon={LibraryMusicIcon} title="Home Library"/>
            </Link>

            <br/>
            <strong className="sidebar__title">PLAYLISTS</strong>

            <hr/>
            <div className="sidebar__playlists">
                {playlists?.items?.map((playlist) => (
                <Link to={`/playlist/${playlist.id}`} key={playlist.id} className="playlist__track">
                    <SidebarOption title={playlist.name} />
                </Link>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    app:state.app
})

export default connect(mapStateToProps)(Sidebar)
