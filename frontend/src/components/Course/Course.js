import React, {useState} from 'react';

function Course(props) {
    const [readOnly, setReadOnly] = useState(true);

    const editHandler = () => {
        setReadOnly((prevState) => {
            return !prevState
        });
    }

    return (
        <tr>
            <td>{readOnly ? props.name : <input type='text' value={props.name} onChange={(event) => props.editCourseHandler(event, props._id)}/>}</td>
            <td>{readOnly ? <button type="button" onClick={editHandler}>Edit</button> : <button type="button" onClick={() => { props.updateHandler(props._id, props.name); editHandler(); }}>Enter</button>}<button type="button" onClick={(event) => props.deleteHandler(event, props._id)}>Delete</button></td>
        </tr>
    )
}

export default Course;