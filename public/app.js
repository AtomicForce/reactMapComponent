import React from 'react';
import { render } from 'react-dom';
import ProductMap from './components/productMap.js';


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            orders: [
                {order_id: '123', purchase_date: '2016-05-01', product: 'Tennis ball', paid: '8.99', fees: '4.25', cogs: '2.25', profit: '2.49', quantity: 1, shipping_address: '273 S 152ND AVE', shipping_city: 'GOODYEAR', shipping_state: 'AZ', shipping_postal_code: '85338-2957'},
                {order_id: '124', purchase_date: '2016-05-01', product: 'Tennis ball', paid: '8.99', fees: '4.25', cogs: '2.25', profit: '2.49', quantity: 1, shipping_address: '15607 Pypers Pointe Dr.', shipping_city: 'Chesterfield', shipping_state: 'VA', shipping_postal_code: '23838'},
                {order_id: '125', purchase_date: '2016-05-01', product: 'Tennis ball', paid: '8.99', fees: '4.25', cogs: '2.25', profit: '2.49', quantity: 1, shipping_address: '434 N. 22nd Place', shipping_city: 'Mesa', shipping_state: 'Arizona', shipping_postal_code: '85213-7602'},
                {order_id: '126', purchase_date: '2016-05-01', product: 'Tennis ball', paid: '8.99', fees: '4.25', cogs: '2.25', profit: '2.49', quantity: 1, shipping_address: '910 BELLAIRE AVE', shipping_city: 'EVANSVILLE', shipping_state: 'IN', shipping_postal_code: '47711-5342'},
                {order_id: '127', purchase_date: '2016-05-02', product: 'Tennis ball', paid: '8.99', fees: '4.25', cogs: '2.25', profit: '2.49', quantity: 1, shipping_address: '535 e papago dr', shipping_city: 'Tempe', shipping_state: 'Az', shipping_postal_code: '85281'},
                {order_id: '128', purchase_date: '2016-05-03', product: 'Tennis ball', paid: '8.99', fees: '4.25', cogs: '2.25', profit: '2.49', quantity: 1, shipping_address: '301 E 16TH ST', shipping_city: 'WOLFFORTH', shipping_state: 'TEXAS', shipping_postal_code: '79382-2841'},
                {order_id: '129', purchase_date: '2016-05-03', product: 'Tennis ball', paid: '8.99', fees: '4.25', cogs: '2.25', profit: '2.49', quantity: 1, shipping_address: '12558 Council Oak Dr', shipping_city: 'Waldorf', shipping_state: 'MD', shipping_postal_code: '20601-4508'},
                {order_id: '133', purchase_date: '2016-05-01', product: 'Tennis racquet', paid: '18.99', fees: '4.25', cogs: '2.25', profit: '12.49', quantity: 1, shipping_address: '1288 GINGERWOOD DR', shipping_city: 'MILPITAS', shipping_state: 'CA', shipping_postal_code: '95035-2428'},
                {order_id: '134', purchase_date: '2016-05-01', product: 'Tennis racquet', paid: '18.99', fees: '4.25', cogs: '2.25', profit: '12.49', quantity: 1, shipping_address: 'C/O SEANE MARREN 15 JOHN JAY PL', shipping_city: 'RYE', shipping_state: 'NY', shipping_postal_code: '10580-2222'},
                {order_id: '135', purchase_date: '2016-05-01', product: 'Tennis racquet', paid: '18.99', fees: '4.25', cogs: '2.25', profit: '12.49', quantity: 1, shipping_address: '2408 BACK CREEK VALLEY RD', shipping_city: 'HEDGESVILLE', shipping_state: 'WV', shipping_postal_code: '25427-6355'},
                {order_id: '136', purchase_date: '2016-05-02', product: 'Tennis racquet', paid: '18.99', fees: '4.25', cogs: '2.25', profit: '12.49', quantity: 1, shipping_address: '1668 BALTIMORE ANNAPOLIS BLVD', shipping_city: 'ARNOLD', shipping_state: 'MD', shipping_postal_code: '21012-2542'},
                {order_id: '137', purchase_date: '2016-05-02', product: 'Tennis racquet', paid: '18.99', fees: '4.25', cogs: '2.25', profit: '12.49', quantity: 1, shipping_address: '8421 WOODLEAF BLVD', shipping_city: 'WESLEY CHAPEL', shipping_state: 'FLORIDA', shipping_postal_code: '33544-2641'},
                {order_id: '138', purchase_date: '2016-05-03', product: 'Tennis racquet', paid: '18.99', fees: '4.25', cogs: '2.25', profit: '12.49', quantity: 1, shipping_address: '2367 Lime Rock Road', shipping_city: 'Birmingham', shipping_state: 'Alabama', shipping_postal_code: '35216'},
                {order_id: '139', purchase_date: '2016-05-03', product: 'Tennis racquet', paid: '18.99', fees: '4.25', cogs: '2.25', profit: '12.49', quantity: 1, shipping_address: '14414 W ALMERIA RD', shipping_city: 'GOODYEAR', shipping_state: 'AZ', shipping_postal_code: '85395-7503'},
                {order_id: '140', purchase_date: '2016-05-03', product: 'Tennis racquet', paid: '18.99', fees: '4.25', cogs: '2.25', profit: '12.49', quantity: 1, shipping_address: '2502 BRANDON RD', shipping_city: 'UPPER ARLINGTON', shipping_state: 'OH', shipping_postal_code: '43221-3302'},
                {order_id: '141', purchase_date: '2016-05-03', product: 'Tennis racquet', paid: '18.99', fees: '4.25', cogs: '2.25', profit: '12.49', quantity: 1, shipping_address: '1854 EUCLID ST APT 101', shipping_city: 'SANTA MONICA', shipping_state: 'CA', shipping_postal_code: '90404-4698'},
                {order_id: '142', purchase_date: '2016-05-03', product: 'Tennis racquet', paid: '18.99', fees: '4.25', cogs: '2.25', profit: '12.49', quantity: 1, shipping_address: '661 ROCKHURST DR', shipping_city: 'BIRMINGHAM', shipping_state: 'AL', shipping_postal_code: '35209-3156'},
                {order_id: '143', purchase_date: '2016-05-03', product: 'Tennis racquet', paid: '18.99', fees: '4.25', cogs: '2.25', profit: '12.49', quantity: 1, shipping_address: '1016 SHALIMAR DR', shipping_city: 'HIGH POINT', shipping_state: 'NC', shipping_postal_code: '27262-4533'}
            ]
        };
    }

    render() {
        return (
            <div>
                <ProductMap orders={this.state.orders} />
            </div>
        );
    }
}

render(<App />, document.getElementById('app'));
