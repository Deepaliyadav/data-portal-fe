import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
// import HC_map from 'highcharts/modules/map';

// // import mapData from './mapData.js'
// HC_map(Highcharts);

const data = [
	['in-py', 10], ['in-ld', 11], ['in-wb', 12], ['in-or', 13],
	['in-br', 14], ['in-sk', 15], ['in-ct', 16], ['in-tn', 17],
	['in-mp', 18], ['in-2984', 19], ['in-ga', 20], ['in-nl', 21],
	['in-mn', 22], ['in-ar', 23], ['in-mz', 24], ['in-tr', 25],
	['in-3464', 26], ['in-dl', 27], ['in-hr', 28], ['in-ch', 29],
	['in-hp', 30], ['in-jk', 31], ['in-kl', 32], ['in-ka', 33],
	['in-dn', 34], ['in-mh', 35], ['in-as', 36], ['in-ap', 37],
	['in-ml', 38], ['in-pb', 39], ['in-rj', 40], ['in-up', 41],
	['in-ut', 42], ['in-jh', 43]
];

function ElectionMap() {
	const [topology, setTopology] = useState();

	async function fetchData() {
		try {
			const response = await fetch(
				'https://code.highcharts.com/mapdata/countries/in/in-all.topo.json'
			);
			const data = await response.json();
			setTopology(data); // Update the state with the fetched data
		} catch (error) {
			console.error('Error fetching topology:', error); // Handle any fetch errors
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	const options = {
		chart: {
			map: topology
		},
		title: {
			text: 'Highcharts Maps basic demo'
		},
		subtitle: {
			text: 'Source map: <a href="https://code.highcharts.com/mapdata/countries/in/in-all.topo.json">India</a>'
		},
		mapNavigation: {
			enabled: true,
			buttonOptions: {
				verticalAlign: 'bottom'
			}
		},
		// colorAxis: {
		//     min: 0
		// },
		colorAxis: {
			min: 0,
			stops: [
				[0, '#EFEFFF'],
				[0.67, '#4444FF'],
				[1, '#000022']
			]
		},
		// tooltip: {
		//   pointFormatter: () => {
		//     return properties['woe-label'].split(',')[0];
		//   }
		// },
		series: [{
			//   mapData: mapData,
			//   dataLabels: {
			//     formatter: function() {
			//       return this.point.properties['woe-label'].split(',')[0];
			//     }
			//   },
			name: 'Random Data',
			data,
			states: {
				hover: {
					color: '#BADA55'
				}
			},
			dataLabels: {
				enabled: true,
				format: '{point.name}'
			}
		}]
	};

	return (
		<div key={JSON.stringify(options)}>
			<h2>Map Chart Example</h2>
			<HighchartsReact
				highcharts={Highcharts}
				constructorType={'mapChart'}
				options={options}
			/>
		</div>
	);
}

export default ElectionMap;
