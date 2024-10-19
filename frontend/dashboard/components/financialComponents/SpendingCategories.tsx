import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SpendingCategoriesProps {
    transactions: Transaction[];
    timePeriod: string;
}

const SpendingCategories: React.FC<SpendingCategoriesProps> = ({ transactions, timePeriod }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Aggregate transaction amounts by category
        const categoryData = transactions.reduce((acc: any, transaction: Transaction) => {
            const category = transaction.category[0]; // Get the main category
            if (acc[category]) {
                acc[category] += transaction.amount;
            } else {
                acc[category] = transaction.amount;
            }
            return acc;
        }, {});

        const data = Object.keys(categoryData).map(category => ({
            category,
            amount: categoryData[category],
        }));

        const width = 200;
        const height = 200;
        const radius = Math.min(width, height) / 2;

        // Clear previous chart (if exists)
        d3.select(chartRef.current).selectAll("*").remove();

        const svg = d3.select(chartRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // Create the pie chart layout
        const pie = d3.pie<{ category: string; amount: number }>()
            .value(d => d.amount); // Use amount as the value for pie chart

        const arc = d3.arc<any>()
            .innerRadius(0)
            .outerRadius(radius);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // Create arcs
        svg.selectAll('path')
            .data(pie(data)) // Pass processed data to the pie function
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d: any, i: number) => color(i.toString()));

    }, [transactions, timePeriod]);

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h3 className="text-lg font-semibold mb-4">Spending by Category ({timePeriod})</h3>
            <svg ref={chartRef}></svg>
        </div>
    );
};

export default SpendingCategories;
