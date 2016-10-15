import React from 'react'

export const App = React.createClass({

  render: function () {
    return  <div className="container">
        {this.props.children}
      </div>
  }
})
