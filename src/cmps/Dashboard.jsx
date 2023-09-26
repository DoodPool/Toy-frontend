import { React, useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { toyService } from '../services/toy.service';

ChartJS.register(ArcElement, Tooltip, Legend);


export function Dashboard() {

    const [pricesPerLabel, setPricesPerLabel] = useState(null)
    const labels = toyService.getLabels()

    useEffect(() => {
        toyService.getPricesPerLabel()
            .then(arr => {
                console.log(arr)
                setPricesPerLabel(arr)
                // console.log('pricesPerLabel', pricesPerLabel)
            })
    }, [])


    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of Votes',
                data: pricesPerLabel,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <section style={{ maxWidth: '30vw', margin: 'auto' }}>
            <Doughnut data={data} />
        </section>
    )
}
