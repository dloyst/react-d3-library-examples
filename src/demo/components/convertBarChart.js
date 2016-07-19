import React from 'react';
import node from './../d3-examples/barChart';
import rd3 from 'react-d3-library';
import BarChart from './d3Components/BarChart';

// export default class extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { d3: '' };
//   }

//   componentDidMount() {
//     this.setState({ d3: node });
//   }

//   render() {
//     return (
//       <div>
//         <BarChart data={this.state.d3} />
//       </div>
//     )
//   }
// };

export default () => <div><BarChart data={node} /></div>
