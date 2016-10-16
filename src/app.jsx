import React from 'react'

export const App = React.createClass({

  render: function () {
    return  <div>
        {this.props.children}
      </div>
  }
})
