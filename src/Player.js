import React from 'react';
import {connect} from 'react-redux';
import Body from './Body';
import Footer from './Footer';
import './Player.css'
import Sidebar from './Sidebar';
import Home from './Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Search from './Search';

function Player({ spotify }) {

    return (
        <Router>
            <div className="player">
                <div className="player__body">
                    {/* Sidebar */}
                    <Sidebar className="flex-02"/>
                    {/* body */}
                    <div className="flex-08">
                    <Switch>
                        <Route path="/home" exact render={(props)=><Home {...props} spotify={spotify}/>}>
                            
                        </Route>

                        <Route path="/search">
                            <Search spotify={spotify}/>
                        </Route>
                        
                        <Route path="/playlist/:playlist_id" exact render={(props)=><Body {...props} spotify={spotify}/>}>
                            
                        </Route>

                    </Switch>
                    </div>
                </div>
                

                {/* Footer */}
                <Footer  spotify={spotify}/>
            </div>
        </Router>
    )
}

export default connect(null, {})(Player)
