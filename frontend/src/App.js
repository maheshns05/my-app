import React, { Component } from 'react';
import './App.css';
import CourseForm from './components/CourseForm/CourseForm';
import CourseList from './components/Course/CourseList';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      courseDeletedMsg: ''
    }

    this.postCourseHandler = this.postCourseHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.editCourseHandler = this.editCourseHandler.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    this.closeMessageHandler = this.closeMessageHandler.bind(this);
  }

  componentDidMount() {
    if (!this.state.courses.length) {
      axios.get(`http://localhost:4000/api/courses`)
        .then(res => {
          this.setState({
            courses: res.data
          })
        }).catch(err => {
          console.log('Error fetching the course');
        })
    }
  }

  deleteHandler(event, courseId) {
    const url = `http://localhost:4000/api/courses/${courseId}`;
    axios.delete(url).then(res => {
      console.log('deleted', res);
      const courses = [...this.state.courses];
      const course = courses.find(course => course._id === courseId);
      const index = courses.indexOf(course);
      courses.splice(index, 1);

      this.setState({
        courseDeletedMsg: res.data.name + ' Course Deleted',
        courses: courses
      });
    }).catch(err => {
      console.log('Error deleting the Course');
    })
  }

  postCourseHandler(courseName) {
    axios.post(`http://localhost:4000/api/courses`, {
      name: courseName
    }).then(res => {
      const courses = [...this.state.courses];
      courses.push(res.data);
      this.setState({
        courses
      })
      console.log(res);
    }).catch(err => {
      console.log('Error posting the course');
    })
  }

  editCourseHandler(event, courseId) {
    const courses = [...this.state.courses];
    const course = courses.find(course => course._id === courseId);
    course.name = event.target.value;
    this.setState({
      courses
    });
  }

  updateHandler(courseId, courseName) {
    const url = `http://localhost:4000/api/courses/${courseId}`;
    axios.put(url, {
      name: courseName
    }).then(res => {
      const courses = [...this.state.courses];
      const course = courses.find(course => course._id === res.data._id);
      course.name = res.data.name;
      this.setState({
        courses
      })
    }).catch(err => {
      console.log('Error updating the course');
    })
  }

  closeMessageHandler() {
    this.setState({
      courseDeletedMsg: ''
    });
  }

  render() {
    let courseListView = null;
    if (this.state.courses.length) {
      courseListView = (
        <CourseList courses={this.state.courses}
          deleteHandler={this.deleteHandler}
          editCourseHandler={this.editCourseHandler}
          updateHandler={this.updateHandler} />
      )
    } else {
      courseListView = (
        <p>Please Add Course</p>
      )
    }

    return (
      <div className="App">
        <div style={{ backgroundColor: 'white', padding: 20 }}>
          { courseListView }
          {this.state.courseDeletedMsg &&
            <p>{this.state.courseDeletedMsg} <span style={{ marginLeft: 20 }} onClick={this.closeMessageHandler}>Close (X)</span></p>}
        </div>
        <div>
          <CourseForm postCourseHandler={this.postCourseHandler} />
        </div>
      </div>
    );
  }
}

export default App;
