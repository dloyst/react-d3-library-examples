const getStyles = require('./getStyles');
const getAttributes = require('./getAttributes');
const applyD3ReactId = require('./../../utils/applyD3ReactId');

// Maps over all the nodes and extracts all the data relevant to React
// Does not map over child elements of the nodes, this is done in recursive calls from makeChildNodes
module.exports = (nodes) => {
  let extractedData = {state: {}, mappedData: []}

  //Check if nodes is an array otherwise convert html objects into array
  if(!Array.isArray(nodes)) {
    nodes = Array.prototype.slice.call(nodes);
  }

  let mappedData = nodes.map((obj, i) => {
    let output = {};
    let nodeId = {};

    if(obj['__data__']) {
      output['__data__'] = obj['__data__']
    }

    if(obj['__transition__']) {
      output['__transition__'] = obj['__transition__']
    }

    //HTML tag name ...div, g, circle, etc...
    output.tag = obj.localName;

    if(!obj['data-react-d3-id']) {
      nodeId = applyD3ReactId(Array.prototype.slice.call(obj.children), i);
      for(var key in nodeId.state) {
        extractedData.state[key] = nodeId.state[key]
      }
    } else {
      nodeId.children = obj.children;
    }
    // Create an array for all the child nodes
    output.children = nodeId.children;

    // Build the props object to be used in react createElement and convert into react friendly syntax
    output.props = getAttributes(obj.attributes, obj);

    // If styles exits convert the CSSStyleDeclaration into react friendly syntax-
    if(output.props.style) output.props.style = getStyles(output.props.style);

    // Special case for text tags
    if(output.tag === 'text') output.props.textContent = obj.childNodes.length ? obj.childNodes[0].data : '';

    //if(output.tag === 'text') output.props.textContent = obj.childNodes[0].data;

    // output.props['react-d3-id'] = output.tag + '.' + counter + '.' + i;\
    if(!obj['data-react-d3-id']) {
      output['data-react-d3-id'] = output.tag + '.' + i + '.' + 0 + '.' + 0;
      output.props.key = output.tag + '.' + i + '.' + 0 + '.' + 0;
      extractedData.state[output.tag + '.' + i + '.' + 0 + '.' + 0] = {};
    } else {
      output['data-react-d3-id'] = obj['data-react-d3-id'];
      output.props.key = obj['data-react-d3-id'];
    }

    return output;
  });

  extractedData.mappedData = mappedData;
  return extractedData;
}
