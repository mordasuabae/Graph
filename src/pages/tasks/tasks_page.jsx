import React, { useState, useEffect, useContext } from "react";
import "./tasks-page.css"
import {Context} from '../../context/context'
import { ReportsPage } from "../reports/reports_page";

const TasksPage = (props) => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('incomplete');
    // const [description, setDescription] = useState('');

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     // alert("The browser will not reload when the alert box is closed.");
  // };

    const context = useContext(Context)


    useEffect(() => {
      // console.log(context)
    }, [])
    
// console.log(context)




function save(e) {
      e.preventDefault()
    // clear input

    // this is where you want to work
    //1
    var newArray = [...context.tasks]
    console.log('new array', newArray)
    //2
    var newTask = {name: title,status: status, id: crypto.randomUUID()}
    console.log('status',status)
    //3
    newArray.push(newTask)
    //4
    context.setTasks(newArray)

    // context.setTasks([{name : title, status : status}])


}

function edit(e) {
  e.preventDefault()
  console.log(e.target.id)
  var editButtonId = e.target.id
  var input = document.querySelector('input')

  context.tasks.map((task=> {
      if(editButtonId === task.id){
          console.log(task.name)
          input.value = task.name

          var saveChangesButton = document.createElement('button')
          saveChangesButton.innerText = 'savechanges'
          saveChangesButton.setAttribute('savechanges-id',task.id)
          //attach event listener
          saveChangesButton.addEventListener('click',(e) => saveChanges(e))
          //append to form
          var form = document.querySelector('.form')
          form.appendChild(saveChangesButton)
      }
      
  }))
}
function saveChanges(e) {
  e.preventDefault()
  // console.log(e.target.id)
  var saveChangesBtn = e.target
  //get atribute
  var saveChangesBtnId = saveChangesBtn.getAttribute('savechanges-id')
  // console.log('savechanges button id',saveChangesBtnId)//// cant detect id

  var input = document.querySelector('input')
  var select = document.querySelector('select')

  
  context.tasks.map((task)=>{

      if(saveChangesBtnId === task.id ){ 

          // copy new arr
          var newArray = [...context.tasks]
          //2
          //3
          if(saveChangesBtnId === task.id){
            task.name = input.value
            task.id = saveChangesBtnId
            task.status = select.value
          }
          //4
          context.setTasks(newArray)
      }
      console.log(context.tasks)
  })

}


function del(e) {
  e.preventDefault()
  var deletebutton = e.target
  var deletebtnID = deletebutton.id 
  console.log('deletebtnID',deletebtnID)
  console.log('deletebtn',deletebutton)

  // var deletebtnID = e.target.getAttribute('delete-id')
  // console.log('deletebtnID',deletebtnID)
  var valid = []
  context.tasks.map((task)=>{

      if( task.id !== deletebtnID){
        console.log('valid task',task)
        valid.push(task)
        var newArray = [...context.tasks]

        // if(deletebtnID === task.id) {
        //   console.log('delete',task.name)
        //   invalid.push(task)
        // }
      }
    context.setTasks(valid)

  })

}

var newNew = context.tasks.map((task) =>{
  //create li element
  // var li = document.createElement('li')
  // li.innerHTML = task.name + ' ' + '('+ task.status +')'

  // //adding edit button and attaching the task id to it
  var editButton = document.createElement('button')
  editButton.innerText = 'edit'
  editButton.setAttribute('edit-id',task.id)

  var delButton = document.createElement('button')
  delButton.innerText = 'delete'
  delButton.setAttribute('delete-id',task.id)



  return <><li>{task.name + ' ' + '('+ task.status +')'} <button onClick={(e) => edit(e)} id={editButton.getAttribute('edit-id')}>edit</button><button onClick={(e) => del(e)} id={delButton.getAttribute('delete-id')}>delete</button></li>  </>
})


    return (
    <div className="tasks-page" style={{margin:'0 50px'}}>
        <div className="create">
            <p>Create a new task</p>
            <form className="form"  >
              <label>Task title:</label>
              <input 
              className="input"
                type="text" 
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              /><br/>
              <label>Task state:</label>
              <select
              className="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                >
                <option value='complete'>complete</option>
                <option value='incomplete'>incomplete</option>
              </select>
              <button onClick={(e) => save(e)}>Add Task</button>
            </form>
            <div className="reports-page">
              <h1>Tasks</h1>

              <>
              <>
              <ul id="contianer">{newNew}</ul>
              </>
              </>
              
              </div>
            {/* <ReportsPage/> */}
        </div>
    </div>
    )
}

export {TasksPage}
  {/* <label>Task description:</label>
  <textarea
    required
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  ></textarea><br/> */}