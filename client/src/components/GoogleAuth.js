// OAuth Client ID: 735763399547-bct1frboambv0eabj4jcg5fp6e5kdnlb.apps.googleusercontent.com
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';


const GoogleAuth = ({signIn,signOut, isSignedIn})=>{
    useEffect(()=>{
        // console.log("use effect ran");
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId: '735763399547-bct1frboambv0eabj4jcg5fp6e5kdnlb.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                const auth = window.gapi.auth2.getAuthInstance();
                onAuthChange(auth.isSignedIn.get());
                auth.isSignedIn.listen(onAuthChange);
            });
        });
        const onAuthChange = (isSignedIn)=>{
            const auth = window.gapi.auth2.getAuthInstance();
            if(isSignedIn){
                signIn(auth.currentUser.get().getId());
            }else{
                signOut();
            }
        }
    },[signIn,signOut]);


    
    const onSignInOutClick = async ()=>{
        const auth = window.gapi.auth2.getAuthInstance();
        
        try{
            if(isSignedIn){
                await auth.signOut();
                // console.log("signed out!");
            }else{
                await auth.signIn();
                // console.log("signed in!");       
            }
        }catch(err){
            console.log(`error: ${err.error}`);
        }
    }

    return (
        <div>
            <button className="ui red icon google button" 
                    onClick={onSignInOutClick}> 
                    <i className="google icon" />
                    { isSignedIn ? ' Sign Out' : ' Sign in with Google'} 
            </button>
        </div>
    );
}

const mapStateToProps = (state)=>{
    return {
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(
    mapStateToProps,
    {signIn,signOut}
)(GoogleAuth);