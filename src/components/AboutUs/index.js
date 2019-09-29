import React from "react";
import './css/Cards.css';



class AboutUs extends React.Component{

  constructor(props){
    super(props)
    var Chris = [0,0,0]
    var Gyuwon = [0,0,0]
    var Shubhendra = [0,0,0]
    var Brian = [0,0,0]
    var Nithin = [0,0,0]
    var totalIssues = 0
    this.state = {
      Chris: Chris,
      Gyuwon: Gyuwon,
      Shubhendra: Shubhendra,
      Brian: Brian,
      Nithin: Nithin,
      totalIssues
    };

  }

  componentDidMount() {
    this.grabCommits();
    this.grabIssues();

}

async grabIssues(){
  fetch("https://gitlab.com/api/v4/projects/14463226/issues?per_page=100&page=1")
    .then(res => res.json())
    .then(res => {
      res.forEach(issue => {
        if(issue.closed_by != null){
          switch (issue.closed_by){
            case "Christopher Chasteen":
              this.state.Chris[1] +=1
              break;
              
            case "Shubhendra Trivedi":
              this.state.Shubhendra[1]+=1
              break;

            case "Gyuwon Kim":
                this.state.Gyuwon[1]+=1
                break;
            case "Brian Dyck":
                this.state.Brian[1]+=1
                break;
            case "Nithin Pingili":
              this.state.Nithin[1]+=1
              break;
            default:

          }
        }
      });
    })
}

async grabCommits(){
  fetch("https://gitlab.com/api/v4/projects/14463226/repository/commits")
      .then(res => res.json())
      .then(res => {
        res.forEach(commit => {
          switch (commit.committer_name){
            case "Christopher Chasteen":
              this.state.Chris[0] +=1
              break;
              
            case "Shubhendra Trivedi":
              this.state.Shubhendra[0]+=1
              break;

            case "Gyuwon Kim":
                this.state.Gyuwon[0]+=1
                break;
            case "Brian Dyck":
                this.state.Brian[0]+=1
                break;
            case "Nithin Pingili":
              this.state.Nithin[0]+=1
              break;
            default:
          }
        });
        this.setState(this.state)
      })

}

  render(){

    const {
      Chris,
      Gyuwon,
      Shubhendra,
      Brian,
      Nithin
    } = this.state

    return (
      <div>
        <h1 className="title">About Us page</h1>
        <div className="cardRow">
          <div className="card" style={{width: "18rem", marginRight: ".5rem"}}>
            <img src="/images/cornField.jpg" className="card-img-top" alt="Card Background"/>
            <div className="card-body">
              <h5 className="card-title">Christopher Chasteen</h5>
              <p className="card-text">Commits: {Chris[0]}</p>
              <p className="card-text">Issues Closed: {Chris[1]}</p>
              <p className="card-text">Unit Tests: {Chris[2]}</p>
            </div>
          </div>

          <div className="card" style={{width: "18rem", marginRight: ".5rem"}}>
            <img src="/images/cornField.jpg" className="card-img-top" alt="Card Background"/>
            <div className="card-body">
              <h5 className="card-title">Gyuwon Kim</h5>
              <p className="card-text">Commits: {Gyuwon[0]}</p>
              <p className="card-text">Issues Closed: {Gyuwon[1]}</p>
              <p className="card-text">Unit Tests: {Gyuwon[2]}</p>
            </div>
          </div>

          <div className="card" style={{width: "18rem", marginRight: ".5rem"}}>
            <img src="/images/cornField.jpg" className="card-img-top" alt="Card Background"/>
            <div className="card-body">
              <h5 className="card-title">Shubhendra Trivedi</h5>
              <p className="card-text">Commits: {Shubhendra[0]}</p>
              <p className="card-text">Issues Closed: {Shubhendra[1]}</p>
              <p className="card-text">Unit Tests: {Shubhendra[2]}</p>
            </div>
          </div>
        </div>

        <div className="cardRow">
        <div className="card" style={{width: "18rem", marginRight: ".5rem"}}>
            <img src="/images/cornField.jpg" className="card-img-top" alt="Card Background"/>
            <div className="card-body">
              <h5 className="card-title">Brian Dyck</h5>
              <p className="card-text">Commits: {Brian[0]}</p>
              <p className="card-text">Issues Closed: {Brian[1]}</p>
              <p className="card-text">Unit Tests: {Brian[2]}</p>
            </div>
          </div>

          <div className="card" style={{width: "18rem", marginRight: ".5rem"}}>
            <img src="/images/cornField.jpg" className="card-img-top" alt="Card Background"/>
            <div className="card-body">
              <h5 className="card-title">Nithin Pingili</h5>
              <p className="card-text">Commits: {Nithin[0]}</p>
              <p className="card-text">Issues Closed: {Nithin[1]}</p>
              <p className="card-text">Unit Tests: {Nithin[2]}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;