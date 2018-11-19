var action = {
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "make custom redux",
    complete: false
  }
};

var rmAction = {
  type: "REMOVE_TODO",
  todo: {
    id: 0
  }
};
//NEVER MODIFY STATE

function todo(state, action) {
  if (action.type === "ADD_TODO") {
    return state.concat([action.todo]);
  }
  return state;
}

//default param es6 state arry
// function reducer(state = [], action) {
//   if (action.type === "ADD_TODO") {
//     //not using push it has to be pure
//     return state.concat([action.todo]);
//   }

//   return state;
// }

export function createStore() {
  //application state
  let state;

  let listeners = [];

  const getState = () => state;
  // subricbe returns a function to unsubscribe
  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  let dispatch  = (action) =>{
      //update the state
      //notify the listeners
      state = todo(state,action);
      listeners.forEach((listener)=> listener());
  }

  return {
    getState,
    subscribe,
    dispatch
  };
}
