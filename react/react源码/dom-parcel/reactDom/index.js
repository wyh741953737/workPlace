import Component from '../Component';

const ReactDom = {
    render
}

function render(vNode, container) {
    return container.appendChild(_render(vNode));
}


// 创建组件的方法：
// 1, 判断是类组件还是函数组件
// 2, 如果是类组件，直接调用comp函数实例化一个对象
// 3, 如果是函数组件，通过类组件实例化一个对象(对象中含有constructor，生命周期，render方法，render方法执行返回一个jsx)
// 4, 修改实例化的函数组件的构造器
// 5, 给实例化对象添加render方法，方法执行comp的constructor方法
// 6, 将实例化对象返回
function createComponent(comp, props) {
    let inst;
    // 如果是类组件
    if(comp.prototype && comp.prototype.render) {
        inst = new comp(props);
        console.log('inst',inst) // 有base， props， state，__proto__:生命周期，render
    } else {
        // 如果是函数组件，将函数组件扩展成类组件
        inst = new Component(props);
        inst.constructor = comp;
        inst.render = function() {
            return this.constructor(props);
        }
    }
    return inst;
}

export function renderComponent(comp) {
    let base;
    const renderer = comp.render(); // comp上面有render方法，执行后生成一个jsx
    base = _render(renderer);    // 调用_render得到创建的dom对象
    if(comp.base && comp.componentWillUpdate) { // 如果已经挂载
        comp.componentWillUpdate();
    }

    if(comp.base) { 
        if(comp.componentDidUpdate) comp.componentDidUpdate();
    } else if(comp.componentDidMount) {
        comp.componentDidMount();
    }
    // 节点替换
    if(comp.base && comp.base.parentNode) { // 如果已经挂载，并且有父节点
        comp.base.parentNode.replaceChild(base, comp.base) // 通过父节点，替换子节点
    }
    comp.base = base;
}


function setComponentProps(comp, props) {
    // 如果comp上面没有base说明还没有被渲染，执行render之前的方法：componentWillMount，有base说明已经渲染完，组件内部发生变化：componentWillReceiveProps
    if(!comp.base) {
        if(comp.componentWillMount) comp.componentWillMount();
    } else if(comp.componentWillReceiveProps) { // 还有其他生命周期方法
        comp.componentWillReceiveProps();
    }
    comp.props = props; // 给comp添加props，之后调用render方法真正渲染
    renderComponent(comp);
}

// 1, 调用render方法，判断vNode类型，是对象还是函数，
// 2，如果是函数，调用createComponent方法生成一个jsx
// 3, 调用setComponentProps给组件设置属性
// 4, 将生成的节点返回


function _render(vNode) {
    console.log(vNode)
    if(vNode === undefined || vNode === null || vNode === 'boolean') vNode = '';
    if(typeof vNode === 'number')  vNode = String(vNode);

    if(typeof vNode === 'string') {
        return document.createTextNode(vNode);
    }
    const { tag, attrs } = vNode;

    if(typeof tag === 'function') {
        // 1.创建组件
        const comp = createComponent(tag, attrs);
        // 2.设置组件属性
        setComponentProps(comp, vNode.attrs);
        // 3.组件渲染的节点对象返回
        return comp.base;
    }
    const dom = document.createElement(tag);
    if(attrs) {
        Object.keys(attrs).forEach(key => {
            const value = attrs[key];
            setAttribute(dom, key, value)
        })
    }

    if(vNode.children) {
        vNode.children.forEach(child => render(child, dom))
    }
    return dom;
}

function setAttribute(dom, key, value) {
    if(key === 'className') {
        key = 'class'
    }
    // 如果是事件
    if(/on\w+/.test(key)) { // 事件，以on开头
        key = key.toLowerCase();
        dom[key] = value || '';
    } else if(key === 'style') { 
        if(!value || typeof value === 'string') {
            dom.style.cssText = value || '';
        } else if(value && typeof value === 'object') {
            for(let k in value) { // key是属性名

                if(typeof value[k] === 'number') {
                    dom.style[k] = value[k]+'px'
                } else {
                    dom.style[k] = value[k]
                }
            }
        }
    } else { // 否则是classNAme，style以外的其他属性
        if(key in dom) { // 如果有属性
            dom[key] = value || ''
        } 
        if(value) { // 如果有值
            dom.setAttribute(key, value)
        } else { // 否则没值，移除
            dom.removeAttribute(key)
        }
    }
}

export default ReactDom;




// 1. 调用render方法，传入vNode和attrs
// 2. 调用_render方法，判断是不是一函数，如果是，调用createComponent方法创建出组件
// 3. 判断函数是类组件还是函数组件，如果是类组件，通过函数对象comp创建一个实例，如果是函数组件，通过Component创建一个实例，并修改构造器，在实例对象上添加render方法，小于comp上面的constructor方法返回一个对象
// 4，给对象添加属性，调用render方法去渲染组件
// 5
// 6
// 7

