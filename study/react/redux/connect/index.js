function Counter() {};
function Component() {};

function connect(mapStateToProps, mapDispatchToProps, mergeProps, options={}) {
    return function wrapWithConnect(WrappedComponent) {
        class Connect extends Component {
            constructor(props, context) {
                this.store = props.store || context.store;
                this.stateProps = computeStateProps(this.store, props);
                this.dispatchProps = computeStateProps(this.store, props);
                this.state = {storeState: null}
                this.updateState(); // 对stateProps，dispatchProps，parentProps合并
            }

            shouldComponentUpdate(nextProps, nextState) {
                if(propsChanged || mapStateProductedChange || dispatchPropsChanged) {
                    this.updateState(nextProps);
                    return true;
                }
            }
            componentDidMount() {
                this.store.subscribe(() => {
                    this.setState({
                        storeState: this.store.getState()
                    })
                })
            }
            render() {
                return <WrappedComponent {...this.nextState} />
            }
        }
        Connect.contextTypes = {
            store: stroeShapes
        }
        return Connect;
    }
}


const mapStateToProps = state  => state;
const mapDispatchToProps = dispatch => dispatch;
connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)