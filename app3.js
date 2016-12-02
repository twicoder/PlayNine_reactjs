var StarFrame = React.createClass({
    render:function(){
        var stars = [];
        for(var i=0;i<this.props.numberOfStars;i++){
            stars.push(
                <span className="glyphicon glyphicon-star" key={i}></span>
            )
        }
        return <div id="stars-frame">
            <div className="well">
                { stars }
            </div>
        </div>
    }
});

var ButtonFrame = React.createClass({
    render:function(){
        var disabled;
        disabled = (this.props.selectedNumbers.length ===0);
        return <div id="button-frame">
            <div className="well">
                <button className="btn btn-primary btn-lg" disabled={disabled}>=</button>
            </div>
        </div>
    }
});

var AnswerFrame = React.createClass({
    render:function(){
        var props = this.props;
        var selectedNumbers = props.selectedNumbers.map(function(i,index){
           return <span onClick={props.unselectNumber.bind(null,i)} key={index}>{i+1}</span>
        });
        return <div id="answer-frame">
            <div className="well">
                {selectedNumbers}
            </div>
        </div>
    }
});

var NumbersFrame = React.createClass({
    render:function(){
        var maxNumber = 9;
        var numbers = [],className,selectedNumbers=this.props.selectedNumbers;
        var clickNumber = this.props.selectNumber;
        for(var i=0;i<maxNumber;i++){
            className = "number selected-" + (selectedNumbers.indexOf(i)>=0);
            numbers.push(<div className={className} key={i+1} onClick={clickNumber.bind(null,i)}>{i+1}</div>);
        }
        return <div id="numbers-frame">
            <div className="well">
                {numbers}
            </div>
        </div>
    }
});


var Game = React.createClass({
    getInitialState:function(){
        return {
            selectedNumbers:[],
            numberOfStars:Math.floor(Math.random()*9)+1
        };
    },
    selectNumber:function(clickedNumber){
        if(this.state.selectedNumbers.indexOf(clickedNumber)< 0){
            this.setState(
                {selectedNumbers:this.state.selectedNumbers.concat(clickedNumber)}
            );
        }

    },
    unselectNumber:function(clickedNumber){
        var selectedNumbers = this.state.selectedNumbers,indexOfNumber = selectedNumbers.indexOf(clickedNumber);
        selectedNumbers.splice(indexOfNumber,1);
        this.setState(
            { selectedNumbers:selectedNumbers }
        );
    },
    render:function(){
        var selectedNumbers = this.state.selectedNumbers;
        var numberOfStars = this.state.numberOfStars;
        return <div id="game">
            <h2>Play Nine</h2>
            <hr />
            <div className="clearfix">
                <StarFrame numberOfStars={numberOfStars} />
                <ButtonFrame selectedNumbers={selectedNumbers}/>
                <AnswerFrame selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber}/>
            </div>

            <NumbersFrame selectedNumbers={selectedNumbers} selectNumber={this.selectNumber}/>
        </div>
    }
});

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);