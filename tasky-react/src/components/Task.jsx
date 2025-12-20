import React from 'react';

const Task = (props) => {
    
    return (
        <div className="card" style={{backgroundColor: props.done ? 'lightgrey' : '#5bb4c4'}}>
            <p class="title">{props.title} </p>
            <p>Due: {props.deadline} </p>
            <p class="desc">{props.description}</p>
            <p class="priority" style={{backgroundColor: props.priority == "High" ? 'red' : (props.priority == "Medium" ? 'yellow' : 'green')}}>{props.priority}</p>
            <button onClick={props.markDone} className='doneButton'>Done</button>
            <button className='deleteButton' onClick={props.deleteTask}>Delete</button>
        </div>
        
    )
}

export default Task;