import React, { Component } from "react";
import LegislationSortFilter from "./LegislationSortFilter";
import Legislation from "./Legislation";
import Pages from "../Pages";

import "./css/Legislations.css";

class Legislations extends Component {
  getStatus = enacted => {
    if (enacted != null) {
      return "Enacted";
    }
    return "Pending";
  };

  getEnacted = enacted => {
    if (enacted != null) {
      return enacted;
    }
    return "N/A";
  };

  getBillType = billType => {
    if (billType === "hr") {
      return "House of Representatives";
    }
    return "Senate";
  };

  getParty = sponsor_party => {
    if (sponsor_party === "D") {
      return "Democratic";
    }
    return "Republican";
  };

  state = {
    collapse: true,
    legislations: [],
    metaData: {
      currentPage: 1,
      lastPage: 1
    }
  };

  handleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };

  componentDidMount() {
    const querystring = this.props.location.search;
    const pathname = this.props.location.pathname;
    const url = `https://api.foodmeonce.me${pathname}${querystring}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let legislations = data["data"];
        let metaData = data["metaData"];
        this.setState({ legislations, metaData });
      })
      .catch(console.log);
  }
  render() {
    const legislationsRendered = this.state.legislations.map(
      (legislation, i) => {
        return (
          <a
            key={i}
            href={`/Legislations/Instance/${legislation.id}`}
            className="button-container"
          >
            <Legislation
              name={legislation.short_title}
              year={legislation.introduced_date}
              status={this.getStatus(legislation.enacted)}
              enacted_Year={this.getEnacted(legislation.enacted)}
              houseOfRepresentative={this.getParty(legislation.sponsor_party)}
              billType={this.getBillType(legislation.bill_type)}
              sponsors={legislation.sponsor_name}
            />
          </a>
        );
      }
    );
    return (
      <div className="legislations-model">
        <div className="sorting-container">
          <div className="d-flex flex-row justify-content-between">
            <h3 className="ml-1">Legislations</h3>
            <button
              className="ml-2 btn btn-secondary"
              onClick={this.handleCollapse}
            >
              {this.state.collapse ? "-" : "+"}
            </button>
          </div>
          {this.state.collapse && <LegislationSortFilter />}
        </div>
        <div className="legislations-container d-flex flex-column bd-highlight mb-3">
          <Legislation header />
          {legislationsRendered}
        </div>
        <Pages
          url="/Legislations"
          current={this.state.metaData.currentPage}
          lastPage={this.state.metaData.numPages}
        />
      </div>
    );
  }
}

export default Legislations;
