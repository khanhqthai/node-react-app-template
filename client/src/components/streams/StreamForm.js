import React from 'react';
import {Field, reduxForm} from 'redux-form';


//NOTE TO FUTURE SELF: 
//move this function inside the functional component
//and figure how to only have it load once, and not have it
//re-render 
const renderInput = ({input, label, meta})=>{
    // console.log(meta);
    const renderError = (meta)=>{
        if(meta.touched && meta.error){
            return(
                <div className="ui error message">
                    <div className="header">
                        {meta.error}    
                    </div>    
                </div>
            );
        }
    }
    const className = `${meta.touched && meta.error ? 'field error' : 'field'}`;
    return (
        <div className={className}>
            <label>{label}</label>
            <input {...input} autoComplete="off" />
            {renderError(meta)}
        </div>
        
    );
}

const StreamForm = (props)=>{ 
    const onSubmit = (formValues)=>{
        props.onSubmit(formValues);
    }
    
    return (
            <form onSubmit={props.handleSubmit(onSubmit)} className="ui form error">
            <Field 
                name="title" 
                component={renderInput} 
                label="Enter Title"
                
                />
            <Field 
                name="description" 
                component={renderInput} 
                label="Enter Description"
               
                /> 
                <button className="ui button primary">Submit</button>
            </form>
    
    );
}

const validate = (formValues)=>{
    const errors = {};
    if(!formValues.title){
        errors.title = "Please enter title";
    }

    if(!formValues.description){
        errors.description = "Please enter description";
    }

    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate: validate 
})(StreamForm);