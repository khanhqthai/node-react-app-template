import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

const StreamDelete = ({stream, match, fetchStream,deleteStream})=>{
    useEffect(()=>{
        fetchStream(match.params.id);
    },[fetchStream, match.params.id]);
    
    const renderActions = ()=>{
        return (
            <div>
                <div className="ui negative button" onClick={()=> deleteStream(match.params.id)}>Delete</div>
                <Link to="/" className="ui cancel button" >
                    Cancel
                </Link>
            </div>
        );
    }

    const renderContent = ()=>{
        if(!stream){
            return 'Are you sure you want to delete this stream?'
        }
        return (
            <>
                <div>Are you sure you want to delete the stream:</div> 
                <div>{stream.title} - {stream.description}</div>
                 
            </>
        );
    };

    return(
            <Modal 
                title="Delete Stream"
                content={renderContent()}
                actions={renderActions()}
                onDismiss={()=>{history.push('/')}}
            />
    );
};

const mapToStateProps = (state,ownProps)=>{
    
    return {
        stream: state.streams[ownProps.match.params.id]
    }
};

export default 
connect(
    mapToStateProps,
    {fetchStream,deleteStream}
    )(StreamDelete);