import React from "react";
import { Redirect } from "react-router-dom";
import District_img from '../../images/us.png';
import "./css/DistrictInstance.css";
import snap_data from '../../Files/snap_data.json';
import tx_21 from '../../images/tx_21.jpg';
import tx_10 from '../../images/tx_10.jpg';
import tx_31 from '../../images/tx_31.png';

class DistrictInstance extends React.Component{
    state = {
        districts: [
            {
              name: "Texas 11th Congressional District",
              population: "782,337",
              medianIncome: "58,983",
              avgAge: "35.2",
              genderRatio: "0.98",
              representative: "K. Michael Conaway",
              senators: "John Cornyn, Ted Cruz",
              peoplePerSquareMile: "136.7",
              povertyRate: "8.7%",
              numHouseholds: "279,550",
              id: "C001062",
              wikipedia: "https://en.wikipedia.org/wiki/Texas%27s_11th_congressional_district"
            },
            {
              name: "Virginia 11th Congressional District",
              population: "798,464",
              medianIncome: "111,279",
              avgAge: "36.7",
              genderRatio: "1.00",
              representative: "Gerald E. Connolly",
              senators: "John Cornyn, Ted Cruz",
              peoplePerSquareMile: "166.9",
              povertyRate: "4.5%",
              numHouseholds: "268,471",
              id: "L000565",
              wikipedia: "https://en.wikipedia.org/wiki/Virginia%27s_11th_congressional_district"
            },
            {
              name: "Iowa 2nd Congressional District",
              population: "783,983",
              medianIncome: "55,239",
              avgAge: "38.0",
              genderRatio: "1.02",
              representative: "Dave Loebsack",
              senators: "John Cornyn, Ted Cruz",
              peoplePerSquareMile: "396.3",
              povertyRate: "8.7%",
              numHouseholds: "313,626",
              id: "C001078",
              wikipedia: "https://en.wikipedia.org/wiki/Iowa%27s_2nd_congressional_district"
            },
          ],
        legislations: {
            Conaway: "Agriculture Improvement Act of 2018",
            Loebsack: "Agriculture Reform, Food, and Jobs Act of 2013",
            Connolly: "Global Partnerships Act of 2013",
        }
    }

    getImage = (district_name) => {
        if(district_name === "Texas 11th Congressional District"){
           return tx_21;
         }
        if(district_name === "Virginia 11th Congressional District"){
          return tx_10;
        }
        if(district_name === "Iowa 2nd Congressional District"){
          return tx_31;
        }
        return District_img;
    }

    getDistrict = (district_name) => {
        for (let i = 0; i < this.state.districts.length; ++i) {
            let district = this.state.districts[i];
            if (district.name === district_name)
                return district;
        }
        return {};
    }

    render(){
    var district_data = this.getDistrict(this.props.match.params.name);
    if (district_data.name == null) {
        return <Redirect to="/error" />
    }

    let temp_state = district_data.name.substring(0, district_data.name.indexOf(' '))
    let selected_district_info = snap_data.find( item => item.State === temp_state && 
        item["Congressional District"].replace(/\D/g, "") === district_data.name.replace(/\D/g, "") )

    var name = district_data.representative.split(" ");
    var firstName = name[0];
    var lastName = name[name.length - 1];
    var rep_image = "https://theunitedstates.io/images/congress/225x275/"+district_data.id+".jpg";
    return (
    <div
            className="district-instance d-flex border border-secondary
                justify-content-center flex-column align-items-center">
            <img className="district-instance-image" src={this.getImage(district_data.name)} alt="us flag" />
            <p className="district-instance-name">{district_data.name}</p>
            <ul>
                <li className="district-instance-desc">
                    <span>Population</span>: {district_data.population}
                </li>
                <li className="district-instance-desc">
                    <span>Average Income</span>: ${district_data.medianIncome}
                </li>
                <li className="district-instance-desc">
                    <span>Average Age</span>: {district_data.avgAge}
                </li>
                <li className="district-instance-desc">
                    <span>Gender Ratio</span>: {district_data.genderRatio}
                </li>
                <li className="district-instance-desc">

                    <span>Senators</span>: {district_data.senators}
                </li>
                <li className="district-instance-desc">

                    <span>Poverty Rate</span>: {district_data.povertyRate}
                </li>
                <li className="district-instance-desc">

                    <span>Households using SNAP</span>: {selected_district_info["Percent of Households with SNAP"] * 100}%
                </li>
                <li className="district-instance-desc">

                    <span>Number of Households</span>: {district_data.numHouseholds}
                </li>
                <li className="district-instance-desc">

                    <span>People per square mile</span>: {district_data.peoplePerSquareMile}
                </li>
                <li className="district-instance-desc">
                    <a href={district_data.wikipedia}>Wikipedia</a>: <a href={`/Representatives/instance/${firstName}/${lastName}`}>{district_data.representative}</a>
                </li>
                <li className="district-instance-desc">
                    <span>Representative</span>: {district_data.representative}
                </li>
                <li className="district-instance-desc">
                    <span>Legislation by Representative</span>:<br/><a href={`/Legislations/instance/${this.state.legislations[lastName]}`}>{this.state.legislations[lastName]}</a>
                </li>
            </ul>
            <img className="rep-image" src={rep_image} alt="us flag"/>
        </div>
        );
      }
    }

export default DistrictInstance;
