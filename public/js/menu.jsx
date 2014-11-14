/** @jsx React.DOM */

'use strict';

var React = require('react');
var menuActions = require('./actions/menuActions');
var sfoStore = require('./stores/sfostore');

function  getMenuState() {
  return {
    populateWithData: sfoStore.getData()
  };
}

var MenuExample = React.createClass({

    getInitialState: function(){
        return { focused: 0 };
    },

    componentDidMount: function() {
        sfoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        sfoStore.removeChangeListener(this._onChange);
    },

    clicked: function(index){

        // The click handler will update the state with
        // the index of the focused menu entry
        menuActions.select(index);
        this.setState({focused: index});
    },

    render: function() {    

        // Here we will read the items property, which was passed
        // as an attribute when the component was created

        var self = this;

        // The map method will loop over the array of menu entries,
        // and will return a new array with <li> elements.

        return (
            <div>
                <ul>{ this.props.items.map(function(m, index){
        
                    var style = '';
        
                    if(self.state.focused == index){
                        style = 'focused';
                    }
        
                    // Notice the use of the bind() method. It makes the
                    // index available to the clicked function:
        
                    return <li className={style} onClick={self.clicked.bind(self, index)}>{m}</li>;
        
                }) }
                        
                </ul>
                
                <p>Selected: {this.state.populateWithData}</p>
            </div>
        );

    },

    _onChange: function() {
      console.log('getting state back as ' , getMenuState());
      this.setState(getMenuState());
    }
});

// Render the menu component on the page, and pass an array with menu options

React.renderComponent(
    <MenuExample items={ ['Airlines', 'Dining', 'Shopping', 'Things To Do', 'About'] }/>,
    document.body
);
