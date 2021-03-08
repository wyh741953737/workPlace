import ReactDOM from './react-dom/react-dom';
import Component from './react-dom/Component';


class Test extends Component {
  render() {
    return (
      <div style={{border: '2px solid black'}}>我是类组件</div>
    )
  }
}

function Comp(props) {
  return (
    <div>
      <span style={{margin: '30px'}}>我是函数组件</span>
      <span style={{color: 'red'}}>我又颜色{props.name}</span>
    </div>
  )
}
const jsx = (
  <div style={{border: '1px solid red'}}>
    <h1 style={{fontSize: '20px', color: 'red'}} onClick={() => console.log('全栈')}>全栈</h1>
    <a href="http://www.baidu.com">百度</a>
    <Comp />
  </div>
)
ReactDOM.render(<Test />, document.getElementById('root'))
ReactDOM.render(jsx, document.getElementById('root'))

