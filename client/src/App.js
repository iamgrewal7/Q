import React, { useState } from 'react';
import gql from 'graphql-tag';
import './App.css';
import { useQuery, useMutation } from '@apollo/react-hooks';

const GET_QUEUE = gql`
  query GetQueue {
    queue {
      id,
      popDate,
      appendDate,
      user {
        name
      }
    }
  }
`;

const ADD_ITEM = gql`
  mutation AddItem($name: String!, $categoryId: ID!) {
    addItem(name: $name categoryId: $categoryId){
      id
    }
  }
`;

const POP_ITEM = gql`
  mutation PopItem($id: ID!, $categoryId: ID!){
    popItem(id: $id, categoryId: $categoryId){
      id
    }
  }
`


const Header = () => (<h1 id='header'>Q</h1>)

const CustomForm = () => {
  const [addItem, { data }] = useMutation(ADD_ITEM);
  let input;
  return (
    <form 
      onSubmit={e => {
        e.preventDefault();
        addItem({variables: {name: input.value, categoryId: 1}});
        input.value = '';
      }}
    >
      <input
        ref={node => {input = node;}}
        id='nameInput' type="text" name="name" placeholder="Your Name" />
      <input id='button' type="submit" value="Join" />
    </form>
  )
}

const Item = (props) => {
  const [popItem, { data }] = useMutation(POP_ITEM);
  console.log(props)
  return (
    <div className='item'>
      <div id='info'>
        <p>Name: {props.queue.user.name}</p>
        <p>Joining Time: {props.queue.appendDate}</p>
        {/* <p>Time : {props.queue.topDate}</p> */}
        <p>Leaving Time: {props.queue.popDate}</p>
      </div>
      <div id='pop' onClick={() => popItem({variables: {id: props.queue.id, categoryId: 1}})}>Pop</div>
    </div>
  )
}


export default function App() {
  const [state, setState] = useState({});

  const { data,loading, error } = useQuery(GET_QUEUE);
  if (loading) return <h1>loading</h1>;
  if (error) return <h1>Error</h1>;
  if (data != state) setState(data);
  return (
    <div className='app'>
      <div className="head">
        <Header />
        <CustomForm />
      </div>
      {Object.keys(state).length > 0 ? state.queue.map(q => (<Item queue={q}/>)) : <h1>Empty</h1>}
    </div>
  );
}
