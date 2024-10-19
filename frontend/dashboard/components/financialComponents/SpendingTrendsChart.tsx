import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Transaction } from '../../types/financialTypes';
interface SpendingTrendsChartProps {
  transactions: Transaction[];
  timePeriod: string;
}

interface SpendingDataPoint {
  date: Date;
  amount: number;
}

const SpendingTrendsChart: React.FC<SpendingTrendsChartProps> = ({
  transactions,
  timePeriod,
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Prepare data by mapping transactions to { date, amount } format
    const spendingData: SpendingDataPoint[] = transactions.map(
      (transaction) => ({
        date: new Date(transaction.date), // Ensure this is a Date object
        amount: transaction.amount,
      })
    );

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Clear any existing SVG content
    d3.select(chartRef.current).selectAll('*').remove();

    const svg = d3
      .select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define scales for x (time) and y (amount)
    const x = d3
      .scaleTime()
      .domain(d3.extent(spendingData, (d) => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(spendingData, (d) => d.amount) as number])
      .range([height, 0]);

    // Create the line generator
    const line = d3
      .line<SpendingDataPoint>()
      .x((d) => x(d.date)) // Access date for x-axis
      .y((d) => y(d.amount)) // Access amount for y-axis
      .curve(d3.curveMonotoneX);

    // Append the x-axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Append the y-axis
    svg.append('g').call(d3.axisLeft(y));

    // Append the line path
    svg
      .append('path')
      .datum(spendingData) // Bind data
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);
  }, [transactions, timePeriod]);

  return (
    <div className='p-4 bg-white shadow-md rounded-md'>
      <h3 className='text-lg font-semibold mb-4'>
        Spending Trends ({timePeriod})
      </h3>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default SpendingTrendsChart;
