var Button = React.createClass({
    localHandleClick:function(){
        this.props.localHandleClick(this.props.incrementStep);
    },
    render:function(){
        return <button onClick={this.localHandleClick}>+{this.props.incrementStep}</button>
    }
});

var Result = React.createClass({
    render:function(){
        return <div>{this.props.localCounter}</div>
    }
});

var Main = React.createClass({
    getInitialState:function(){
        return {counter:0};
    },
    handleClick:function(incrementStep){
        this.setState({counter:this.state.counter+incrementStep});
    },
    render:function(){
        return <div>
            <Button localHandleClick={this.handleClick} incrementStep={1}/>
            <Button localHandleClick={this.handleClick} incrementStep={5}/>
            <Button localHandleClick={this.handleClick} incrementStep={10}/>
            <Button localHandleClick={this.handleClick} incrementStep={100}/>
            <Result localCounter={this.state.counter}/>
        </div>
    }
});

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);