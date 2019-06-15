import React from 'react'

export default (props: any) => (
  <input
    {...props}
    style={{
      ...((props && props.style) || {}),
      borderRadius: 4,
      border: '1px solid black',
      padding: 8,
      margin: 8,
      flex: 1,
      display: 'block',
    }}
  />
)
