import React from 'react'

export default React.createClass({

  render: function () {
    return  <div className="app-container">
        {this.props.children}
      </div>
  }
})