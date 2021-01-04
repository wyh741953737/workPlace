export function diff(dom, vNode) {
    // 初始化时候，dom是undefined，vNode有了内容 vNode: [{tag: 'div', attrs: {title: 'title'}, children: []}]
    for(let key in dom) {
        if(!(key in vNode)) { // 如果老节点有，新节点没有就删除
            dom.splice()
        }
    }

    for(let key in vNode) {
        if(dom[key] !== vNode[key]) { // 如果节点同，值不同
            dom[key] = vNode[key];
        }
    }

    // 比较属性
    diffAttribute(dom, vNode);
}

function diffAttribute(dom, vNode) {
    const oldAttrs = dom.attributes;
    const newAttrs = vNode.attrs;
    
}

function diffNode() {
    // 节点有文本节点
}