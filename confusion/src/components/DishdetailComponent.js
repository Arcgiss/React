import React, { Fragment, Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
	Button, Row, Col, Label, Modal, ModalHeader, ModalBody , FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


function  RenderComments ({comments}){
    const comment = comments.map((comm) => {
        return (
            <> 
           <div>{comm.comment}</div>
           <p></p>
           <div>--{comm.author},{new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comm.date)))}</div> 
           <p></p>
        </>
        );
    })
    
    return(
    <div>
    <h4>Comments</h4>
    {comment}
    </div>
    );}
    
function   RenderDish({dish}){
    
        return (
            
           <Card>
           <CardImg  object src={dish.image} alt={dish.name} />
          <CardBody>
           <CardTitle>{dish.name}</CardTitle>
           <CardText>{dish.description}</CardText>
           </CardBody>
          </Card>
        
           );
       }



class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState(state => ({
			isModalOpen: !state.isModalOpen
		}));
	}


    handleSubmit(values) {
    	
        this.toggleModal();
        console.log('Current State is:' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

	render() {
		return (

			<div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment
				</Button>
	        	<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<FormGroup>
	                            <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control" >
                                
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    
                                </Control.select>
	                        </FormGroup>
							<FormGroup>
	                            <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                     />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                 />
	                        </FormGroup>
							<FormGroup>
	                            <Label htmlFor="comment">Comment</Label>
                                <Control.textarea rows={6} model=".comment" id="comment" name="comment" className="form-control" />
	                        </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
						</LocalForm>
					</ModalBody>
				</Modal>
			
            </div>
               
               
		);
	}
}

const DishDetail = (props) => {
	if (props.dish != null) {
	    return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
            <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
                 </div>
                    
            <div className="col-12 col-md-5 m-1"> 
            <RenderComments comments={props.comments} />
            <br/>
                <CommentForm/>
            </div>
                   
               
            </div>
            </div>
        )
	} else
		return <div></div>;
};

export default DishDetail;