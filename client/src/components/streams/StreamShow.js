import React from 'react';
import { connect } from 'react-redux';

import { fetchStream } from '../../actions';


// const StreamShow = ({match,fetchStream, stream})=>{
    
//     const videoRef = useRef();
    
//     useEffect(()=>{
//         console.log(stream);
//         const { id } = match.params;
//         fetchStream(id);
//         buildPlayer(id);
//     },[fetchStream, match.params]);

    
    
//     const buildPlayer = (id)=>{
        
//         if(!stream){
//             return;
//         }
//         if(stream){
            
//             if (window.flvjs.isSupported()) {
//                 // const videoElement = document.getElementById('videoElement');
//                 const flvPlayer = window.flvjs.createPlayer({
//                     type: 'flv',
//                     url: `http://localhost:8000/live/${id}.flv`
//                 });
//                 flvPlayer.attachMediaElement(videoRef.current);
//                 flvPlayer.load();
//             }
//         }
//     }
    

//     const renderStream = ()=>{
//         if(!stream){
//             return <div>Loading...</div>
//         }
//         return (
//             <>
//                 <div className="ui segment">
//                 <video  ref={videoRef} controls style={{width: '100%' }}>  </video>

//                 </div>
//                 <div>
//                     <h3>{stream.title}</h3>
//                 </div>
//                 <div>
//                     {stream.description}
//                 </div>
//             </>
//         );
//     }

//     return(
//         <div>{renderStream()}</div>
//     );
// }

class StreamShow extends React.Component{
    constructor(props){
        super(props);

        this.videoRef = React.createRef();
    }
    
    componentDidMount(){
        const { id } = this.props.match.params; 
        this.props.fetchStream(id);

    }


    render(){
        
        const renderStream = ()=>{
            const {stream} = this.props;

            if(!this.props.stream){
                return <div>Loading...</div>
            }
            return (
                <>
                    <div className="ui segment">
                    <video ref={this.videoRef}  controls style={{width: '100%' }}>  </video>
    
                    </div>
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
}


const mapStateToProps = (state, ownProps)=>{
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);