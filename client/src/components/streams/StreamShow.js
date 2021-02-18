import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchStream } from '../../actions';


const StreamShow = ({match,fetchStream, stream})=>{
    useEffect(()=>{
        fetchStream(match.params.id);
    },[fetchStream, match.params.id]);

    const renderStream = ()=>{
        if(!stream){
            return <div>Loading...</div>
        }
        return (
            <>
                <div className="ui segment">Player here</div>
                <div>
                    <h3>{stream.title}</h3>
                </div>
                <div>
                    {stream.description}
                </div>
            </>
        );
    }
    return(
        <div>{renderStream()}</div>
    );
}

const mapStateToProps = (state, ownProps)=>{
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);