import React, {useState} from 'react';
import './App.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";

// const item = {
//   id: v4(),
//   name: "Clean the house"
// }

// const item2 = {
//   id: v4(),
//   name: "Wash the car"
// }

function App() {
  const [text, setText] = useState("")
  const [text1, setText1] = useState("")
  const [upform, setUpForm] = useState(false)
  const [upid, setUpId] = useState("")
  const [upkey, setUpKey] = useState("")
  const [state, setState] = useState({
    "todo": {
      title: "Todo",
      items: []
    },
    "Doing": {
      title: "Doing",
      items: []
    },
    "done": {
      title: "Done",
      items: []
    }
  })

  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState(prev => {
      prev = {...prev}
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)


      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
  }

  const addItem = () => {
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: text
            },
            ...prev.todo.items
          ]
        }
      }
    })

    setText("")
  }

  const addItem1 = () => {

    if (upkey === "todo") {
      var todos = state.todo.items

    todos.map(item => {
      if (item.id === upid) {
        item.name = text1
      }
    })
    } else if (upkey === "Doing") {
      var todos = state.Doing.items

    todos.map(item => {
      if (item.id === upid) {
        item.name = text1
      }
    })
    }
    
          // const removedArr = [...todos].filter(todo => todo.id !== id);

  

     
    console.log("text",text1,upid,upkey)
   
    setText1("")
    setUpForm(false)
  }

  const deleteTodo = (id, key) => {
    
    if (key === "todo") {
var todos = state.todo.items
           const removedArr = [...todos].filter(todo => todo.id !== id);

          setState(prev => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: removedArr
        }
      }
    })
  
    } else if (key === "Doing") {

      var todos = state.Doing.items
           const removedArr = [...todos].filter(todo => todo.id !== id);

          setState(prev => {
      return {
        ...prev,
        Doing: {
          title: "Doing",
          items: removedArr
        }
      }
    })
      
    }
    console.log("hello",state.todo.items,key)

  }

  const updateTodo = (id, key) => {
    console.log(id, key)
    setUpId(id)
    setUpKey(key)
    setUpForm(true)
  }

  return (
    <>
      { !upform ?<div style={{marginLeft:"40%"}} >
        <input style={{ margin:"20px", height:"40px",width:"300px", border:"3px solid blue"}} type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <button style={{backgroundColor:"blue",border:"none",color:"white",padding: "12px", borderRadius:"4px", textAlign: "center",textDecoration: "none",display: "inline-block",fontSize: "16px",margin: "4px 2px",cursor: "pointer"}} onClick={addItem}>Add</button>
      </div>:<div style={{marginLeft:"40%"}} >
        <input style={{ margin:"20px", height:"40px",width:"300px", border:"3px solid green"}} type="text" value={text1} onChange={(e) => setText1(e.target.value)}/>
        <button style={{backgroundColor:"green",border:"none",color:"white",padding: "12px", borderRadius:"4px", textAlign: "center",textDecoration: "none",display: "inline-block",fontSize: "16px",margin: "4px 2px",cursor: "pointer"}} onClick={addItem1}>Update</button>
      </div>  }
      

      
      


    <div className="App " style={{padding:"3%", background:"rgb(140, 87, 190)"}}>
      


      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return(
            <div key={key} className={"column"}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      {data.items.map((el, index) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided, snapshot) => {
                             
                              return(
                                <div
                                 
                                  className={`item ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el.name}
                                 
                                     {key ==="done"? '':<button onClick={() => deleteTodo(el.id,key)} style={{position: "absolute",marginLeft:"180px",background:"blueviolet",color:"white",width:"40px" ,height:"40px"}}>X</button>}
                                     {key ==="done"? '':<button onClick={() => updateTodo(el.id,key)} style={{position: "absolute",marginLeft:"140px",background:"blueviolet",color:"white",width:"40px" ,height:"40px"}}>Edit</button>}

                                  {console.log("key",el.id)}
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
      </div>
      
      </>
  );
}

export default App;
