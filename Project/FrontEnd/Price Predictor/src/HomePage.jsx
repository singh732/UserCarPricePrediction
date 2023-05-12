import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Select from 'react-dropdown-select';
import {getModelName, getFuelType, getBrandName, getDriveTrain, getTransmissionType, getBodyType} from'./commonFunctions.jsx';
import axios from "axios";

export default class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            predictedPrice: 0,
            isLoading: false
        };
        this.carModel = [];
        this.carBrand = [];
        this.transmission = [];
        this.driveTrain = [];
        this.fuelType = [];
        this.bodyType = [];
    }

    setVariableValues = (value, variableName) => {
        switch (variableName) {
            case "carModel":
                this.carModel = value
                break;
            case "carBrand":
                this.carBrand = value
                break;
            case "transmission":
                this.transmission = value
                break;
            case "driveTrain":
                this.driveTrain = value
                break;
            case "fuelType":
                this.fuelType = value
                break;
            case "bodyType":
                this.bodyType = value
                break;

            default:
                break;
        }
    }
    fetchedPredictionData = () =>{
        let me = this;
        console.log(this.refs);
        let data = {}

        if(this.refs.mileage.value) {
            data.kilometres = parseInt(this.refs.mileage.value)
        }

        if(this.refs.cylinder.value) {
            data.cylinder = parseInt(this.refs.cylinder.value)
        }

        if(this.refs.modelYear.value) {
            data.year = parseInt(this.refs.modelYear.value)
        }

        if((this.carModel).length) {
            data.name = this.carModel[0].id
        }
        if((this.carBrand).length) {
            data.brand = this.carBrand[0].id
        }
        if((this.transmission).length) {
            data.transmission = this.transmission[0].id
        }
        if((this.bodyType).length) {
            data.body_type = this.bodyType[0].id
        }
        if((this.driveTrain).length) {
            data.drive_train = this.driveTrain[0].id
        }
        if((this.fuelType).length) {
            data.fuel_type = this.fuelType[0].id
        }
        this.setState({
            isLoading: true
          },()=> {
            this.refs.customPopUp.open()
          });

          axios
            .post("http://127.0.0.1:8000/getPredictedPrice", data)
            .then(function(response) {
                me.setState({
                    isLoading: false,
                    predictedPrice: Math.round(response.data)
                });
                console.log(response.data);
            })
            .catch(function(error) {
                me.refs.customPopUp.close()
                alert("Something Went Wrong")
            });
        
    }

    render() {
        let modelOptions = getModelName();
        let brandName = getBrandName();
        let fuelType = getFuelType();
        let driveTrain = getDriveTrain();
        let transmissionType = getTransmissionType();
        let bodyType = getBodyType();
        return (
            <div className='main-container'>
                <div className='main-car-theme'>
                    <div className='image-text'>
                        <div className='title-heading'>
                            SELL YOUR CAR AT A BEST PRICE
                        </div>
                        <div className='sub-heading sub-heading-1'>
                            MOST-RELIABLE
                        </div>
                        <div className='sub-heading sub-heading-2'>
                            PRICE
                        </div>
                        <div className='sub-heading sub-heading-3'>
                            PREDICTOR
                        </div>
                        <div className='predict-upper-button'>
                            PREDICT PRICE
                        </div>
                    </div>
                </div>
                <div className="predict-input-tile">
                    <div className='title-head'> PREDICT YOUR CAR PRICE</div>
                    <div className='input-grids'>
                        <table className='input-table'>
                            <tr>
                                <td>
                                    <Select
                                        ref="carModel"
                                        placeholder={"Car Model"}
                                        options={modelOptions}
                                        dropdownPosition="auto"
                                        labelField={"value"} 
                                        valueField={"id"}
                                        dropdownHeight={"300px"}
                                        searchBy={"value"}
                                        color={"#5BAD5D"}
                                        closeOnSelect={true}
                                        onChange={(values) => this.setVariableValues(values,"carModel")}
                                    />
                                </td>
                                <td>
                                    <Select
                                        ref="carBrand"
                                        placeholder={"Car Brand"}
                                        options={brandName}
                                        dropdownPosition="auto"
                                        labelField={"value"} 
                                        valueField={"id"}
                                        dropdownHeight={"300px"}
                                        searchBy={"value"}
                                        color={"#5BAD5D"}
                                        closeOnSelect={true}
                                        onChange={(values) => this.setVariableValues(values,"carBrand")}
                                    />
                                </td>
                                <td><input ref={"modelYear"} type="number" id="modelyear" name="modelyear" className='input-element changePlaceHolder numberInput' placeholder='Model Year'></input></td>
                            </tr>
                            <tr>
                                <td>
                                    <Select
                                        ref="fuelType"
                                        placeholder={"Fuel Type"}
                                        options={fuelType}
                                        dropdownPosition="auto"
                                        labelField={"value"} 
                                        valueField={"id"}
                                        dropdownHeight={"300px"}
                                        searchBy={"value"}
                                        color={"#5BAD5D"}
                                        closeOnSelect={true}
                                        onChange={(values) => this.setVariableValues(values,"fuelType")}
                                    />
                                </td>
                                <td>
                                    <Select
                                        ref="driveTrain"
                                        placeholder={"Drive Train"}
                                        options={driveTrain}
                                        dropdownPosition="auto"
                                        labelField={"value"} 
                                        valueField={"id"}
                                        dropdownHeight={"300px"}
                                        searchBy={"value"}
                                        color={"#5BAD5D"}
                                        closeOnSelect={true}
                                        onChange={(values) => this.setVariableValues(values,"driveTrain")}
                                    />
                                </td>
                                <td>
                                    <Select
                                        ref="transmissionType"
                                        placeholder={"Transmission"}
                                        options={transmissionType}
                                        dropdownPosition="auto"
                                        labelField={"value"} 
                                        valueField={"id"}
                                        dropdownHeight={"300px"}
                                        searchBy={"value"}
                                        color={"#5BAD5D"}
                                        closeOnSelect={true}
                                        onChange={(values) => this.setVariableValues(values,"transmission")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Select
                                        ref="bodyType"
                                        placeholder={"Body Type"}
                                        options={bodyType}
                                        dropdownPosition="auto"
                                        labelField={"value"} 
                                        valueField={"id"}
                                        dropdownHeight={"300px"}
                                        searchBy={"value"}
                                        color={"#5BAD5D"}
                                        closeOnSelect={true}
                                        onChange={(values) => this.setVariableValues(values,"bodyType")}
                                    />
                                </td>
                                <td><input ref={"cylinder"} type="number" id="cylinder" name="cylinder" className='input-element changePlaceHolder numberInput' placeholder='Car Cylinder'></input></td>
                                <td><input ref={"mileage"} type="number" id="mileage" name="mileage" className='input-element changePlaceHolder numberInput' placeholder='Kilometers'></input></td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <button className='predict-lower-button' onClick={this.fetchedPredictionData}>
                                        PREDICT PRICE
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <Popup
                    ref="customPopUp"
                    position="right center"
                    closeOnDocumentClick
                >
                    <div>
                    <h2 style={{textAlign:"center"}}>Price Prediction</h2>
                    {
                        this.state.isLoading ?
                        <div style={{width:"100%"}}>
                            <div class="loader"></div>
                        </div>
                        :
                        <p style={{textAlign:"center"}}>We Analyzed with several factors according to your given input.The Most accurate price we predicted is <b>${this.state.predictedPrice}</b>.</p>
                    }
                    </div>
                </Popup>
            </div>
        )
    }
}