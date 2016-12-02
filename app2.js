var Card = React.createClass({
    getInitialState:function(){
        return {};
    },
    componentDidMount:function(){
        var component = this;
        $.get("https://api.github.com/users/" + this.props.login,function(data){
            component.setState(data);
        })
    },
    render:function(){
        return <div>
            <img src={this.state.avatar_url} width="80px;"/>
            <h3>{this.state.login}</h3>
            <hr/>
        </div>
    }
})

var Form = React.createClass({
    localAddNewLogins:function(e){
        e.preventDefault();
        var loginInput = this.refs.loginName.value;
        this.props.addCard(loginInput);
        this.refs.loginName.value='';
    },
    render:function(){
        return <form onSubmit={this.localAddNewLogins}>
            <input ref="loginName" placeholder="github login" />
            <button>Add</button>
        </form>
    }
});

var Main = React.createClass({
    getInitialState:function(){
        return {logins:[]};
    },
    addCard:function(loginToAdd){
        this.setState({logins:this.state.logins.concat(loginToAdd)});
    },
    render:function(){
        var cards = this.state.logins.map(function(login,index){
            return <Card login={login} key={index}/>;
        })
        return <div>
            <Form addCard={this.addCard}/>
            {cards}
        </div>
    }
});

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);