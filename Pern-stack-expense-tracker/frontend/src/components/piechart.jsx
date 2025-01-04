import React from 'react'
import Title from './title';
import { ResponsiveContainer, Tooltip } from 'recharts';


const COLORS=["#0088FE","#FFBB28","FF8042","00C49F"];

const DoughnutChart = ({dt}) => {
const data=[
    {name:"Income",value:Number(dt?.income)},
    {name:"Expense",value:Number(dt?.expense)},

]

  return (
    <div className='w-full md:w-1/3 flex flex-col items-center bg-gray-50 dark:bg-transparent'>
        <Title title="Summary"/>
        <ResponsiveContainer width={"100%"} height={500}>
            <PieChart width={500} height={400}>
                <Tooltip/>
                

            </PieChart>

        </ResponsiveContainer>
      
    </div>
  )
}

export default DoughnutChart
