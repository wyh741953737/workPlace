function  render(vnode, container) {
    const node = createNode(vnode);
    container.appendChild(node);
}

function createNode(vnode) {
    let node;
    const { type } = vnode;
    if(typeof type === 'string') {
        node = updateHostComponent(vnode);
    } else if(typeof type == 'function') {
        node = type.prototype.isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode);
    } else {
        node = updateTextComponent(vnode);
    }

    return node;
}

function  updateHostComponent(vnode) {
    const { type, props } = vnode;
    const node = document.createElement(type);
    updateNode(node, props);
    reconcileChildren(node, props.children);
    return node;
}

function updateClassComponent(vnode) {
    const { type, props} = vnode;
    const instance = new type(props);
    const vvnode = instance.render();
    const node = createNode(vvnode);
    return node;
}

function updateFunctionComponent(vnode) {
    const { type, props } = vnode;
    const vvnode = type(props);
    const node  = createNode(vvnode);
    return node;
}

function updateTextComponent(vnode) {
    const node = document.createTextNode(vnode);
    return node;
}

function reconcileChildren(parentNode, children) {
    const newChildren = Array.isArray(children) ? children : [children];
    for(let i = 0; i<newChildren.length;i++) {
        let child = newChildren[i];
        render(child, parentNode)
    }
}

function updateNode(node, nextVal) {
    Object.keys(nextVal).filter(item => item !== 'children').forEach(k => node[k] = nextVal[k])
}



export default {
    render,
}

