import React from 'react';

import data from './1951-delhi.json';
import style from './election.module.scss';

function PreviewDataTable() {
	return (
		<div className={style['election-section']}>
			<h1>Delhi Election 1951</h1>
			<table>
				<tr>
					{data?.columns?.length > 0 &&
                    data.columns.map(cell => {
                    	return (
                    		<th key={cell.key} >{cell.header}&nbsp;</th>
                    	);
                    })
					}
				</tr>
				<>
					{
						data.rows.map((el, i) => {
							return (
								<tr key={i}>
									{/* {el?.length > 0 &&
                                        el.map(cell => {
                                            return (
                                                <td key={cell} >{cell}&nbsp;</td>
                                            );
                                        })
                                    } */}
									<td>{el.constituency}</td>
									<td>{el.noOfSeats}</td>
									<td>{el.candidate}</td>
									<td>{el.sex}</td>
									<td>{el.party}</td>
									<td>{el.votes}</td>
									<td>{el.percentage}</td>
									<td>{el.electors}</td>
									<td>{el.voters}</td>
									<td>{el.pollPercentage}</td>
									<td>{el.validVotes}</td>
								</tr>
							);
						})
					}
				</>
			</table>
		</div>
	);
}

export default PreviewDataTable;
