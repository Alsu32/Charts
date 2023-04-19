import React, {useEffect, useRef, useState} from 'react';
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import {
    addCursor,
    createDateAxis,
    createMainPanel,
    createStockChart,
    createValueAxis
} from "../utils/createChartFunction";
import {createValueSeries} from "../utils/createValueSeries";
import {createToolbar} from "../utils/createToolbar";
import {createRangeSeries} from "../utils/createRangeSeries";
import styles from "./Charts.module.css"
import Select from "../components/Select";

const Chart = ({chartType, id, data, minDt, maxDt}: LineChartPropsType) => {

    // Define time interval
    const[baseTimeInterval, setBaseTimeInterval] = useState<string>("day")
    let intervalTimeTypes = ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"]

    let chartRoot = useRef<any>(null)
    let chartControlsRoot = useRef<any>(null)

    const onChangeTimeInterval = (type: string) => {
        setBaseTimeInterval(type)
    }


    useEffect(() => {
            if (!chartRoot.current) {
                chartRoot.current = am5.Root.new(id)
                chartRoot.current.data = data.metricts
                chartRoot.current.setThemes([am5themes_Animated.new(chartRoot.current)])

                // Create stock chart
                let stockChart = createStockChart(chartRoot.current)
                let mainPanel = createMainPanel(chartRoot.current, stockChart)

                // Create Y-axis and X-axis
                let valueAxis = createValueAxis(chartRoot.current, mainPanel)
                let dateAxis = createDateAxis(chartRoot.current, mainPanel, baseTimeInterval, minDt, maxDt)

                // Create valueSeries
                let valueSeries = createValueSeries(chartType, chartRoot.current, mainPanel, dateAxis, valueAxis, data)
                stockChart.set("stockSeries", valueSeries)

                // Create Range series
                createRangeSeries(valueSeries, valueAxis, chartType)

                //Add Cursor
                addCursor(mainPanel, chartRoot.current, dateAxis, valueAxis, valueSeries)

                // Add ToolBar
                createToolbar(chartRoot.current, chartControlsRoot.current, stockChart, minDt, maxDt)
            }
        return () => {
            chartRoot.current && chartRoot.current.dispose()
        }
        }, [])

    useEffect(()=>{
        if (chartRoot.current) {
            chartRoot.current.data = data.metricts
        }
    }, [data])

    return (
        <div className={styles.chart}>
            <div>
               {/* <Select value={intervalTimeTypes} onChange={onChangeTimeInterval}/>*/}
                <div ref={chartControlsRoot}></div>
            </div>
            <div id={id} style={{width: "100%", height: "70vh"}}></div>
        </div>

    )
}

export default Chart

// types
type LineChartPropsType = {
    chartType: any
    id: string
    data: any
    minDt: any
    maxDt: any
}