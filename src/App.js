// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import '@gooddata/react-components/styles/css/main.css';
import 'react-dropdown/style.css';
import './App.css';

import { ColumnChart } from '@gooddata/react-components';

const grossProfitMeasure = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/6877';
const dateAttributeInMonths = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2142';
const dateAttribute = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2180';

const monthOptions = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December' ];
const yearOptions = [ '2015', '2016', '2017' ];

const defaultMonth = monthOptions[0];
const defaultYear = yearOptions[1];

class App extends Component {

    constructor(props) {
	super(props)

	this.state = {
	    selectedMonth: defaultMonth,
	    selectedYear: defaultYear
	}
    }

    getMonthFilter() {
	// index of month (starting with 1)
	const selectedMonth = monthOptions.indexOf(this.state.selectedMonth) + 1;
	const selectedYear = this.state.selectedYear;

	// https://stackoverflow.com/questions/222309/calculate-last-day-of-month-in-javascript
	const lastDay = new Date(selectedYear, selectedMonth, 0);

	const from = `${selectedYear}-${selectedMonth}-01`
	const to = `${selectedYear}-${selectedMonth}-${lastDay.getDate()}`;

        return {
            absoluteDateFilter: {
                dataSet: {
                    uri: dateAttribute
                },
                from: from,
                to: to
            }

        }
    }

    getMeasures() {
        return [
            {
                measure: {
                    localIdentifier: 'm1',
                    definition: {
                        measureDefinition: {
                            item: {
                                uri: grossProfitMeasure
                            }
                        }
                    },
                    alias: '$ Gross Profit'
                }
            }
        ]
    }

    getViewBy() {
        return {
            visualizationAttribute:
            {
                displayForm: {
                    uri: dateAttributeInMonths
                },
                localIdentifier: 'a1'
            }
        }
    }

    changeMonth(item) {
	// very simple validation
	if (monthOptions.indexOf(item.value) === -1) {
	    alert('Invalid month option.');

	    return;
	}

	this.setState(state => ({
	    selectedMonth: item.value
	}));
    }

    changeYear(item) {
	// very simple validation
	if (yearOptions.indexOf(item.value) === -1) {
	    alert('Invalid year option.');

	    return;
	}

	this.setState(state => ({
	    selectedYear: item.value
	}));
    }

    render() {
        const projectId = 'xms7ga4tf3g3nzucd8380o2bev8oeknp';
        const filters = [this.getMonthFilter()];
        const measures = this.getMeasures();
        const viewBy = this.getViewBy();

        return (
            <div className="App">
                <h1>$ Gross Profit in month
		  <Dropdown
		      className="App-dropdown"
		      controlClassName="App-dropdown-control"
		      options={monthOptions}
		      onChange={this.changeMonth.bind(this)}
		      value={this.state.selectedMonth}
		  />
		  <Dropdown
		      className="App-dropdown"
		      controlClassName="App-dropdown-control"
		      options={yearOptions}
		      onChange={this.changeYear.bind(this)}
		      value={this.state.selectedYear}
		  />
		</h1>
                <div>
                    <ColumnChart
                        measures={measures}
                        filters={filters}
                        projectId={projectId}
                    />
                </div>
                <h1>$ Gross Profit - All months</h1>
                <div>
                    <ColumnChart
                        measures={measures}
                        viewBy={viewBy}
                        projectId={projectId}
                    />
                </div>
            </div>
        );
    }
}

export default App;
