import React from 'react';
import Select from "../components/Select";
import Chart from "./Chart";
import styles from "./Charts.module.css"

let dataJson = `{
        "metricts": [
            {
                "dt": "2022-05-02T18:09:22.464Z",
                "value": 22.9
            },
            {
                "dt": "2022-06-02T18:09:22.464Z",
                "value": 39.0
            },
            {
                "dt": "2022-07-02T18:09:22.464Z",
                "value": 25.8
            },
            {
                "dt": "2022-08-02T18:09:22.464Z",
                "value": 33.3
            },
            {
                "dt": "2022-09-02T18:09:22.464Z",
                "value": 38.0
            },
            {
                "dt": "2022-09-02T18:09:22.464Z",
                "value": 45.0
            },
            {
                "dt": "2022-10-02T18:09:22.464Z",
                "value": 32.0
            },
            {
                "dt": "2022-10-08T18:09:22.464Z",
                "value": 32.0
            },
            {
                "dt": "2022-10-22T18:09:22.464Z",
                "value": 30.0
            },
            {
                "dt": "2022-11-02T18:09:22.464Z",
                "value": 30.0
            },
            {
                "dt": "2023-01-02T18:09:22.464Z",
                "value": 45
            },
            {
                "dt": "2023-02-02T18:09:22.464Z",
                "value": 38.0
            },
            {
                "dt": "2023-03-02T18:09:22.464Z",
                "value": 42.0
            },
            {
                "dt": "2023-04-02T18:09:22.464Z",
                "value": 43.3
            }
        ]
    }`


class ChartContainer extends React.Component<any, any> {
    constructor(props:any) {
        super(props)
        this.state = {
            data: JSON.parse(dataJson),
            minDt:  new Date(2022, 1, 1),
            maxDt:  null,
            baseTimeInterval: "day",
            intervalTimeTypes: ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
            currentChartType: "Line",
            chartTypes: ["Line", "Column", "Dot"]
        }
    }

    render() {
        const onChangeChartType = (type: string) => {
            this.setState({
                currentChartType: type
            })
        }

        return (
            <div className={styles.chartContainer}>
                <div>
                    {this.state.currentChartType === "Line" &&
                        <Chart id={"chartLine"} chartType={this.state.currentChartType} data={this.state.data}
                               baseTimeInterval={this.state.baseTimeInterval} minDt={this.state.minDt} maxDt={this.state.maxDt}/>}
                    {this.state.currentChartType === "Column" &&
                        <Chart id={"chartColumn"} chartType={this.state.currentChartType} data={this.state.data}
                               baseTimeInterval={this.state.baseTimeInterval} minDt={this.state.minDt} maxDt={this.state.maxDt}/>}
                    {this.state.currentChartType === "Dot" &&
                        <Chart id={"chartDot"} chartType={this.state.currentChartType} data={this.state.data}
                               baseTimeInterval={this.state.baseTimeInterval} minDt={this.state.minDt} maxDt={this.state.maxDt}/>}
                </div>
                <Select value={this.state.chartTypes} onChange={onChangeChartType}/>
            </div>
        )
    }
}

export default ChartContainer

