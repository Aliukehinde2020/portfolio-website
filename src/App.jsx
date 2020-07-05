import React from 'react';
import logo from './Aliukehinde.png'
import './App.css';

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      newItem: "",
      oldItem:"",
      itemId:null,
      list: []
    }
    // this.addItem = this.addItem.bind(this);
    // this.deleteItem = this.deleteItem.bind(this);
    // this.updateInput = this.updateInput.bind(this);
  }

   addItem=()=>{
    const todoValue = this.state.newItem;
   
    if(todoValue){
      
      const newItem ={
        id: Date.now(),
        value: todoValue,
        isDone:false
      };
   
      this.setState({
        list:[...this.state.list, newItem],
        newItem: ""
      });
     
      
    }
  }

   deleteItem = (id)=> {
    const list =    [...this.state.list];
    const updatedList = list.filter(item => item.id !== id);
    this.setState({
      list: updatedList,
      newItem:"",
      oldItem:"",
      itemId:""
    });
  }
  

  updateItem = ()=>{
     const item = this.state.list.find(x=>x.value===this.state.itemId);
  
     if(item !==undefined)
     {
      
       item.value = this.state.oldItem;
       const lists = this.state.list.filter(x=>x.id!==item.id);
      this.setState({...this.state,list:[...lists,item],itemId:null,oldItem:""})
     }
    
  }

   updateInput = ( input,isAdd)=>{
     if(isAdd)
     {
        this.setState({...this.state,newItem:input})
     }else{
      this.setState({...this.state,newItem:"",oldItem:input})
     }
    
  }

  editInput = ( input)=>{
    this.setState({...this.state,newItem:"",itemId:input,oldItem:input})
   
 }
  render () {
    return (
      <div className='main-container'>
        <img src={logo} className='logo' width='120' height='30' alt='logo' />
        <div className='navbar'>
          <ul>
            <li>Profile</li>
            <li>Portfolio</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className='container'>
         
          <p>add an item...</p>
          <br/>
          <input
          type='text'
          className='input-text'
          required
          value={this.state.newItem||this.state.oldItem}
          onChange={e =>this.updateInput(e.target.value,this.state.oldItem==="")}
          />
        {
          this.state.oldItem===""?
          <button
          className='btn'
          onClick={()=> this.addItem()}
          disabled={!this.state.newItem.length}
          >POST</button>
          :
          <button
          className='btn'
          onClick={()=> this.updateItem()}
          disabled={!this.state.oldItem.length}
          >Update</button>
        }
          
   
        </div>
          <div className="lists">
            {this.state.list.map(item=> {
              return (
                <div className="item-card" key={item.id}>
                  <p class="text">{item.value}</p>
                  <p><button className='btn' onClick={()=>this.editInput(item.value)}>EDIT</button>
                  <button className='btn' onClick={()=>this.deleteItem(item.id)}>DELETE</button>
                  </p>
                
                </div>
              )
            })}
          </div>
        
      </div>
    );
  }
}



export default App;