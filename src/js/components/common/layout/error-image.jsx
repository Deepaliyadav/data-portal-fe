
import React from 'react';
import Button from 'antd/es/button';
import { useNavigate } from 'react-router-dom';

function ErrorImage({ image, innerComponent, type, styling }) {
	const navigate = useNavigate();

	let goToHome = () => {
		navigate('/');
	};

	let reload = () => {
		window.location.reload();
	};

	return (
		<div style={{ height: innerComponent ? '100%' : 'calc(100% - 70px)', textAlign: 'center' }}>
			<img style={{
				margin: 'auto',
				display: 'block',
				marginTop: innerComponent ? '0px' : '70px',
				...styling
			}} src={image}></img>
			{
				!innerComponent && type === 'error' &&
				<Button type='primary' style={{ marginTop: '15px' }} onClick={reload}>Refresh</Button>
			}
			{
				!innerComponent && type !== 'error' &&
				<Button type='primary' style={{ marginTop: '15px' }} onClick={goToHome}>Go To Home</Button>
			}

		</div>
	);
}

export default ErrorImage;
