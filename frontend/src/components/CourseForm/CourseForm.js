import React, { Component } from "react";
import styles from './CourseForm.module.css';

class CourseForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        }

        this.onTextChangeHandler = this.onTextChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        if(this.state.name)
            this.props.postCourseHandler(this.state.name);
            this.setState({
                name: ''
            })
    }

    onTextChangeHandler(event) {
        this.setState({
            name: event.target.value
        });
    }

    render() {
        return (
            <form id={styles.courseForm} onSubmit={this.onSubmitHandler}>
                <div>Add Course</div>
                <div><input type="text" value={this.state.name} onChange={this.onTextChangeHandler}/></div>
                <div className={styles.submitContainer}><button type="Submit">Submit</button></div>
            </form>
        )
    }
}

export default CourseForm;