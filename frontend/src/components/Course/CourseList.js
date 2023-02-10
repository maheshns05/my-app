import React, { Component } from "react";
import Course from "./Course";
import styles  from "./CourseList.module.css";

class CourseList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table>
                <tbody>
                {this.props.courses.map((course) => {
                    return (
                        <Course key={course._id} 
                            deleteHandler={this.props.deleteHandler} 
                            editCourseHandler={this.props.editCourseHandler} 
                            updateHandler={this.props.updateHandler}
                            {...course}/>
                    )
                })}
                </tbody>
            </table>
        )
    }
}

export default CourseList;