import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { SingleDatePicker} from 'react-dates';




export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt)   : moment(),
            calendarFocused: false,
            errorMsg: ''
        };
    }
    

    onDescriptionChange = (e) => {
        const description = e.target.value;  //put it in a const because referencing target in setState does not work
        this.setState(()=> ({description: description}));
        
    }

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(()=> ({note: note}));
    }

    onAmountChanged = (e) =>  {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
        this.setState(()=> ({amount: amount}));
        }
    }


    onDateChange = (createdAt) => {
      if(createdAt) {
        this.setState(()=> ({createdAt: createdAt})  )
      }

    };

    onFocusChange = ({focused}) => 
    {
        this.setState(()=> ({calendarFocused: focused}))

    };

    onSubmit = (e) => {
      e.preventDefault();
      if(!this.state.description || !this.state.amount) {
          this.setState(()=> ({errorMsg: "Pelase provide description and amount"}));
          //set error state equal to please provide desc and amount
      }
      else
      {
        this.setState(()=> ({errorMsg: ""}));
          this.props.onSubmit({
              description: this.state.description,
              amount: parseFloat(this.state.amount,10) * 100,
              createdAt:  this.state.createdAt.valueOf(),
              note: this.state.note
          })
      }

     



    }
    render () {
        return (
             
              <form className="form" onSubmit={this.onSubmit}>
              {this.state.errorMsg && <p className="form__error">{this.state.errorMsg}</p>}
              <input 
              className="text-input"
                type = "text"
                placeholder = "Description"
                autoFocus 
                value={this.state.description}
                onChange={this.onDescriptionChange}/>
              <input
                type="text"
                className="text-input"
                placeholder="Amount"
                value={this.state.amount}
                onChange={this.onAmountChanged} />
              <SingleDatePicker
                date = {this.state.createdAt}
                onDateChange={this.onDateChange}
                focused={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={(day) => false} />  
              
                <textarea
                className="textarea"
                placeholder="Add a note for your expense (optional)"
                value={this.state.note} 
                onChange={this.onNoteChange}>
                
                </textarea>
                <div>
                  <button className="button">Save Expense</button>
                </div>
              </form>
              
        )
    }
}
