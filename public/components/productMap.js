import React from 'react';
import $ from 'jquery';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

export default class ProductMap extends React.Component {
    constructor() {
        super();

        this.state = {
            startDate: moment(),
            endDate: moment(),
            fetchPinPosition: false
        };

        this.changeProduct = this.changeProduct.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.filterOrders = this.filterOrders.bind(this);
        this.generatePins = this.generatePins.bind(this);
    }

    changeProduct(event) {
        this.setState({
            selectedProduct: event.target.value,
            filteredProducts: [],
            markers: []
        });
    }

    handleChangeStart(date) {
        var tmp = this.filterOrders(date, this.state.endDate);

        this.setState({
            startDate: date,
            filteredProducts: tmp,
            markers: []
        });

        this.generatePins(tmp);
    }

    handleChangeEnd(date) {
        var tmp = this.filterOrders(this.state.startDate, date);

        this.setState({
            endDate: date,
            filteredProducts: tmp,
            markers: []
        });

        this.generatePins(tmp);
    }

    filterOrders(startDate = this.state.startDate, endDate = this.state.endDate) {
        var self = this;
        var startDateObj = new Date(startDate.format('L'));
        var endDateObj = new Date(endDate.format('L'));

        return this.props.orders.filter((order) => {
            var orderDate = new Date(order.purchase_date);
            orderDate.setHours(0,0,0,0);

            return order.product === self.state.selectedProduct && startDateObj <= orderDate && orderDate <= endDateObj;
        });
    }

    generatePins(filter) {
        var self = this;
        var latlng = [];
        var filteredProductsLength = filter.length - 1;

        filter.forEach((product, i) => {
            var address = product.shipping_address + ' ' + product.shipping_city;
            $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false', null, function (data) {
                if (data.results[0]) {
                    var p = data.results[0].geometry.location;
                    latlng.push({position: {lat: p.lat, lng: p.lng}, key: i,});

                    if (i === filteredProductsLength) {
                        self.setState({'markers': latlng});
                    }
                }
            });
        });
    }

    render() {
        return (
            <div>
                {(() => {
                    if (this.props.orders) {
                        return (
                            <div>
                                {/* Select for products */}
                                <select onChange={this.changeProduct}>
                                    <option value=''></option>
                                    {(() => {
                                        return this.props.orders.map((order, i) => {
                                            return <option key={i} value={order.product}>{order.product}</option>;
                                        });
                                    })()}

                                </select>

                                {/* Date Picker */}
                                {(() => {
                                    if (this.state.selectedProduct) {
                                        return (
                                            <div>
                                                <DatePicker
                                                    selected={this.state.startDate}
                                                    startDate={this.state.startDate}
                                                    endDate={this.state.endDate}
                                                    onChange={this.handleChangeStart} />
                                                <DatePicker
                                                    selected={this.state.endDate}
                                                    startDate={this.state.startDate}
                                                    endDate={this.state.endDate}
                                                    onChange={this.handleChangeEnd} />
                                            </div>
                                        );
                                    }
                                })()}

                                {/* Table of filtered products */}
                                <table>
                                    <thead>
                                        <tr>

                                            {(() => {
                                                if (this.state.filteredProducts && this.state.filteredProducts.length) {
                                                    return Object.keys(this.state.filteredProducts[0]).map((product, i) => {
                                                        return <th key={i}>{product}</th>;
                                                    });
                                                }
                                            })()}

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {(() => {
                                            if (this.state.filteredProducts) {
                                                return this.state.filteredProducts.map((product, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            {(() => {
                                                                return Object.keys(product).map((el, i) => {
                                                                    return <td key={i}>{product[el]}</td>;
                                                                });
                                                            })()}
                                                        </tr>
                                                    );
                                                });
                                            }
                                        })()}

                                    </tbody>
                                </table>

                                {/* Map with pins */}
                                {(() => {
                                    if (this.state.markers && this.state.markers.length) {
                                        return <GoogleMapLoader
                                            containerElement={<div style={{height: 400}} />}
                                            googleMapElement={
                                                <GoogleMap
                                                  defaultZoom={1}
                                                  defaultCenter={{lat: 0, lng: 0}}
                                                >
                                                {this.state.markers.map((marker) => {
                                                    return (
                                                        <Marker {...marker} />
                                                    );
                                                })}
                                                </GoogleMap>
                                            }
                                        />;
                                    }
                                })()}

                            </div>
                        );
                    } else {
                        return (
                            <div>
                                Please pass orders
                            </div>
                        );
                    }
                })()}
            </div>
        );
    }
}
