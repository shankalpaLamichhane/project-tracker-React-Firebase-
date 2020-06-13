import React,{useEffect, useState} from 'react';
import Board from 'react-trello';

 const TaskBoard = () => {

  useEffect(()=>{
    
  },[])

  const data = {
    lanes: [
      {
        id: 'lane1',
        title: 'To_Do',
        label: '2/2',
        cards: [
          {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins'},
          {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}},
          {id: 'Card3', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}},
          {id: 'Card4', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}},
          {id: 'Card5', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}},
        ]
      },
      {
        id: 'lane2',
        title: 'In_Progress',
        label: '0/0',
        cards: []
      },
      {
        id: 'lane3',
        title: 'Review',
        label: '0/0',
        cards: []
      },
      {
        id: 'lane4',
        title: 'Done',
        label: '0/0',
        cards: []
      }
    ]
  }


  // const data = {
  //   lanes: [
  //     {
  //       id: 'To_Do',
  //       title: 'To_Do',
  //       label: '2/2',
  //       cards: []
  //     },
  //     {
  //       id: 'In_Progress',
  //       title: 'In_Progress',
  //       label: '0/0',
  //       cards: []
  //     },
  //     {
  //       id: 'Review',
  //       title: 'Review',
  //       label: '0/0',
  //       cards: []
  //     },
  //     {
  //       id: 'Done',
  //       title: 'Done',
  //       label: '0/0',
  //       cards: []
  //     }
  //   ]
  // }

  const tasks = [
  {
    id:'Card1',
    name: 'Write Blog',
    status:'To_Do',
    assignee: '',
    project: '',
    description: '',
    deadline: new Date()
  },
  {
    id:'Card2',
    name: 'Pay Rent',
    status:'To_Do',
    assignee: '',
    project: '',
    description: '',
    deadline: new Date()
  },
  {
    id:'Card3',
    name: 'Pay Rent',
    status:'In_Progress',
    assignee: '',
    project: '',
    description: '',
    deadline: new Date()
  },
  {
    id:'Card4',
    name: 'Pay Rent',
    status:'Review',
    assignee: '',
    project: '',
    description: '',
    deadline: new Date()
  },
  {
    id:'Card5',
    name: 'Pay Rent',
    status:'Done',
    assignee: '',
    project: '',
    description: '',
    deadline: new Date()
  },
  ]

  const [state,setState] = useState(tasks)

  function onHandleDragEnd(e,sourceLaneId,targetLaneId,position,cardDetails){
    console.log("handle Drag End"+e+" source lane id = "+sourceLaneId+" targetLaneId = "+targetLaneId+
    " position = "+position+" card details = "+JSON.stringify(cardDetails));
  }

  
  return (
      
    <Board data={data}
           style={{ fontFamily: 'Verdana',background:'rgba(255,255,255,0.2)'}} className="boardContainer"
           laneStyle={{width:'25%'}}
           cardStyle={{width:'50px'}}
           handleDragEnd={onHandleDragEnd}
           />
           
  );
}

export default TaskBoard;
