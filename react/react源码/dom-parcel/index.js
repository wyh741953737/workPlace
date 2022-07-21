import React from './react';
import ReactDom from './reactDom';

// function Home() {
//     return (
//         <div className="title" style={{color: 'pink', fontWeight: 600,fontSize: '20px', border: '1px solid red'}}>
//             <h1>你好 parcel</h1>
//             <div>
//                 <div style={{border: '1px solid black', color: 'red'}}>我是儿子1</div>
//                 <div style={{border: '1px solid red'}}>我是儿子2</div>
//             </div>
//         </div>
//     )
// }

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            number: 1,
        }
    }
    componentWillMount() {
        console.log('组件将要加载')
    }
    componentDidMount() {
        console.log('组件挂载完成')
    }
    componentWillReceiveProps(props) {
        console.log('组件将要接收props')
    }
    componentWillUpdate() {
        console.log('组件将要更新')
    }
    componentDidUpdate() {
        console.log('组件更新完成')
    }
    componentWillUnMount() {
        console.log('组件将要卸载')
    }

    render() {
        return (
            <div className="title" style={{color: 'pink', fontWeight: 600,fontSize: '20px', border: '1px solid red'}}>
                <h1>你好 parcel</h1>
                <div>
                    <div>{this.state.number}</div>
                    <button onClick={() => this.setState({number: this.state.number + 1})}>点击</button>
                </div>
            </div>
        )
    }
}
const title = 'homeTitle'

ReactDom.render(<Home name="title" />, document.getElementById('root'))


/***
 * 核心：组件化开发
 * 为什么调用render方法必须引入React
 * react中组件分为哪些组件？    
 * 
 */
