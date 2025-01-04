import React from "react";
import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer
} from "recharts"
import Title from "./title"

export const Chart =({data})=>{
    return (
        <div className="flex-1 w-full">
            <Title title="Transaction Activity" />
            <ResponsiveContainer width={"100%"} height={500} className={mt-5}>
                <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" padding={{left:30, right:30}} />
                </LineChart>
                <Tooltip/>
                <Line
                type="monotone"
                dataKey="income"
                stroke="#8884d8"
                activeDot={{r: 8}}
                
                />
                <YAxis />
                <Legend />

            </ResponsiveContainer>

        </div>
    )
}