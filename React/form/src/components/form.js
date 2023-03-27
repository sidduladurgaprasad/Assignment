import React from 'react';
import axios from 'axios';

class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fullName : "",
            phoneNo  : "",
            emailId  : "",
            date     : "" ,

            fullNameError : false,
            phoneNoError : false,
            emailIdError : false,
            dateError : false
        }
        this.validateForm = this.validateForm.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    validateForm() 
    {
        const firstName = this.state.fullName;
        const emailId   = this.state.emailId;
        const phoneNo   = this.state.phoneNo;
        const date      = this.state.date;

        if(firstName)
            this.setState({fullNameError : false})
        else
            this.setState({fullNameError : true})
        if(phoneNo)
            this.setState({phoneNoError : false})
        else
            this.setState({phoneNoError : true})
        if(emailId)
            this.setState({emailIdError : false})
        else
            this.setState({emailIdError : true})
        if(date)
            this.setState({dateError : false})
        else
            this.setState({dateError : true})

        var formData = {
            firstName : firstName,
            phoneNo   : phoneNo,
            emailId   : emailId,
            date      : date
        }

        console.log("data : ",formData);

        axios.post('http://localhost:3001/user', formData)
            .then(function (response) {
                if(firstName!="" && phoneNo!="" && emailId!="" && date!="")
                {
                    if(phoneNo.length!=10)
                        alert("Enter a valid mobile number.")
                    else
                        alert(response.data.message);
                }
                else 
                    alert("All fields are requried.")
            })
            .catch(function (error) {
            console.log(error);
            });
    }

    onChangeInput(event) {
        const name  = event.target.name;
        const value = event.target.value;
        this.setState({[name] : value})

        console.log("Name : ",name);
        console.log("Value : ",value);
    }

    render() {
        return(    
            <div className="Form">
                <div className="register">
                    <div  className="row">
                        <div  className="col-10 register-right">
                            <h3  className="register-heading">FILL THE FORM FOR APPOINTMENT</h3>
                            <div  className="row register-form">
                                <div className='col-sm-10 offset-sm-1 offset-md-0 col-md-6 col-12'>
                                    <img src='https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2020/02/form-builders-11.webp' width="100%" height="90%"></img>
                                </div>
                                <div className='col-md-6 col-12'>
                                    <div  className="">
                                        <div  className="form-group">
                                            <input type="text"  className="form-control" value={this.state.fullName} name="fullName" style={{border :(this.state.fullNameError) ? "1px solid red" : ""}} placeholder="Full Name *" onChange={(e)=> this.onChangeInput(e)} />
                                        </div>
                                        <div  className="form-group">
                                            <input type="text" minLength="10" maxLength="10" name="phoneNo" style={{border :(this.state.phoneNoError) ? "1px solid red" : ""}} className="form-control" placeholder="Your Phone *" onChange={(e)=> this.onChangeInput(e)} />
                                        </div>
                                    </div>
                                    <div  className="">
                                        <div  className="form-group">
                                            <input type="email"  className="form-control" name='emailId' style={{border :(this.state.emailIdError) ? "1px solid red" : ""}} placeholder="Your Email *" onChange={(e)=> this.onChangeInput(e)} />
                                        </div>
                                        <div  className="form-group">
                                            <input type="date"  className="form-control" name='date' style={{border :(this.state.dateError) ? "1px solid red" : ""}} placeholder="date *" onChange={(e)=> this.onChangeInput(e)} />
                                        </div>
                                    </div>
                                    <div  className="text-center">
                                        <input type="submit"  className="btn"  value="Register" onClick={this.validateForm}/>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form;