
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Number of students and instructors registered by month',
		},
	},
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const data = {
	labels,
	datasets: [
		{
			label: 'Student',
			// data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
			data: [300, 400, 250, 450, 350, 200, 500, 400, 300, 450, 350, 500],
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
		{
			label: 'Instructor',
			// data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
			data: [50, 75, 100, 60, 80, 90, 40, 50, 70, 60, 80, 90],
			backgroundColor: 'rgba(53, 162, 235, 0.5)',
		},
	],
};

export function UserChart() {
	return <Bar options={options} data={data} />;
}
