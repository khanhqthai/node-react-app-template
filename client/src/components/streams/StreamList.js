import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { fetchStreams } from '../../actions';

const StreamList = ({streams, fetchStreams, currentUserId, isSignedIn})=>{
    useEffect(()=>{
        // console.log('hello');
        // console.log(props);
        fetchStreams();
    },[fetchStreams]);
    
    const renderAdmin = (stream)=>{
        if(stream.userId === currentUserId){
            return <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
                        Edit
                    </Link>
                    <Link to={`streams/delete/${stream.id}`} className="ui button negative">
                        Delete
                    </Link>
                    
                </div>
        }
        return <div></div>
    }
    const renderList = ()=>{
        return streams.map(stream => {
                return (
                    <div className="item" key={stream.id}>
                        {renderAdmin(stream)}
                        <i className="large middle aligned icon camera"></i>
                        <div className="content">
                            <Link to={`/streams/${stream.id}`} className="header">
                                {stream.title}  
                            </Link>
                            <div className="description">
                                {stream.description}
                            </div>
                        </div>
                        
                    </div>
                );
            });  
    };
    const renderCreate = ()=>{
        if(isSignedIn){
            return (
                <div style={{textAlign: 'right'}}>
                    <Link to="/streams/new" className="ui button primary">Create Stream</Link>
                </div>
            );
        }

    }
    return(
        <div className="ui content">
           
            <h1>Streams</h1>
            <div className="ui celled list">
                {renderList()}
            </div>
            {renderCreate()}
        </div>
    );
}

const mapStateToProps = (state)=>{
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect (mapStateToProps, {fetchStreams})(StreamList);