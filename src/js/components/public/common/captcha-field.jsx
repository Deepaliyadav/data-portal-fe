import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'react-final-form';
import classNames from 'classnames';
import { api } from 'src/js/api';
import { SyncOutlined } from '@ant-design/icons';

import InputField from '../../common/form/input-field';

import style from './captcha-field.module.scss';

function CaptchaField({ id, image, text, form, requestApi, capchahorizontalStyle, containerClassName }) {

	let { input: idInput } = useField(id, {});
	let { input: imageInput } = useField(image);

	if (!idInput.value || !imageInput.value) {
		return null;
	}
	let request = requestApi ? requestApi : api.captchaRefresh;
	const refreshCaptcha = () => {
		request({ 'captcha_id': idInput.value })
			.then(response => {
				if (response.data && response.data.d) {
					form.resetFieldState(text);
					form.batch(() => {
						form.change(text, '');
					});
					imageInput.onChange('data:image/png;base64,' + response.data.d);
				}
			});
	};

	return (
		<>
			{capchahorizontalStyle ?
			    <div className={classNames(containerClassName, style.captchaHorizentalContainer)}>
					<div className={style.imgContainer}>
						<img src={imageInput.value} />
						<SyncOutlined style={{ fontSize: '20px' }} onClick={refreshCaptcha} />
					</div>
					<div className={style.captchaRightContainer}>
						<div className={style.msgContainer}>
							<h6>Type the letters you see in the image.</h6>
						</div>
						<InputField
							name={text}
							type='text'
							placeholder='Enter captcha'
							required={true} />
					</div>
				</div>
				:
				<div className={style.captchaContainer}>
					<div className={style.imgContainer}>
						<img src={imageInput.value} />
						<SyncOutlined style={{ fontSize: '20px' }} onClick={refreshCaptcha} />
					</div>
					<div className={style.msgContainer}>
						<h6>Type the letters you see in the image.</h6>
					</div>
					<InputField
						name={text}
						type='text'
						placeholder='Enter captcha'
						required={true}
					/>
				</div>
			}
		</>
	);
}

CaptchaField.propTypes = {
	id: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	form: PropTypes.object.isRequired,
	requestApi: PropTypes.func,
	capchahorizontalStyle: PropTypes.bool,
	containerClassName: PropTypes.string
};

export default CaptchaField;

