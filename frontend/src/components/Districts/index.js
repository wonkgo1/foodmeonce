import React, { Component } from "react";

import DistrictSortFilter from "./DistrictSortFilter";
import District from "./District";
import Pages from "../Pages";

import "./css/Districts.css";

class Districts extends Component {
  state = {
    collapse: true,
    districts: [],
    metaData: {
      currentPage: 1,
      numPages: 1
    }
  };

  handleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };
  getName = (state, districtNum) => {
    if (districtNum === "00") {
      return state + " At Large Congressional District ";
    }
    return state + " Congressional District " + districtNum;
  };

  componentDidMount() {
    const querystring = this.props.location.search;
    let page = 1;
    if (querystring !== "") {
      const parsedQuerystring = querystring.substring(1);
      const queries = parsedQuerystring.split("&");
      queries.forEach(query => {
        const keyValue = query.split("=");
        if (keyValue.length > 1 && keyValue[0] === "page") {
          page = keyValue[1];
        }
      });
    }
    const url = "https://api.foodmeonce.me/Districts?page=" + page;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let districts = data["data"];
        let metaData = data["metaData"];
        this.setState({ districts, metaData });
      })
      .catch(console.log);
  }
  render() {
    let districtsRendered;
    if (this.state.districts.length > 0)
      districtsRendered = this.state.districts.map((district, i) => {
        return (
          <a
            key={i}
            href={`/Districts/Instance/${district.id}`}
            className="button-container"
          >
            <District
              name={this.getName(
                district.state,
                district.congressional_district
              )}
              population={district.population}
              medianIncome={district.mean_income}
              avgAge={district.median_age}
              genderRatio={district.gender_ratio}
              representative={district.full_name}
              senators={district.senators}
              peoplePerSquareMile={district.peoplePerSquareMile}
              povertyRate={district.povertyRate}
              numHouseholds={district.numHouseholds}
              id={district.id}
              wikipedia={district.wikipedia}
            />
          </a>
        );
      });
    return (
      <div className="districts-model">
        <div className="sorting-container">
          <div className="d-flex flex-row justify-content-between">
            <h3 className="ml-1">Districts</h3>
            <button
              className="ml-2 btn btn-secondary"
              onClick={this.handleCollapse}
            >
              {this.state.collapse ? "-" : "+"}
            </button>
          </div>
          {this.state.collapse && <DistrictSortFilter />}
        </div>
        <div className="districts-container d-flex justify-content-center flex-column bd-highlight mb-3">
          <District header />
          {districtsRendered}
        </div>
        <Pages
          url="/Districts"
          current={this.state.metaData.currentPage}
          lastPage={this.state.metaData.numPages}
        />
      </div>
    );
  }
}

export default Districts;
