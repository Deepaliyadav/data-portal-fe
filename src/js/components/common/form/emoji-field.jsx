import React, { useState } from 'react';
// import data from '@emoji-mart/data';
import emojiMartData from '@emoji-mart/data/sets/15/facebook.json';
import PickerEmoji from '@emoji-mart/react';
// import { Picker, Emoji } from 'emoji-mart';
import { Popover } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import Icon from '@ant-design/icons';
import CrossIcon from 'src/icons/cross-icon';
import { useField } from 'react-final-form';

import style from './common.module.scss';

function EmojiField({ name, className, validate, initialValue, onChange, allowClear }) {
	const [showEmoji, setShowEmoji] = useState(false);
	let { input, meta } = useField(name, { validate, initialValue });
	// let handlers = composeInputHandlers(input, rest);
	let validateStatus = meta.touched && meta.error ? 'error' : '';
	let help = meta.touched ? meta.error : '';

	function onEmojiClick(event) {
		input.onChange(event.native);
		if (onChange) {
			onChange(event);
		}
		setShowEmoji(false);
	}
	const onClear = () => {
		input.onChange('');
	};

	return (
		<Form.Item className={className} validateStatus={validateStatus} help={help}>
			<div>
				<Popover
					content={
						<PickerEmoji
							data={emojiMartData}
							onEmojiSelect={onEmojiClick}
							// onClickOutside={() => setEmojiPopup(false)}
							emojiSize={22}
							emojiButtonSize={30}
							maxFrequentRows={3}
							perLine={window?.outerWidth <= 825 ? 8 : 10}
							navPosition='top'
							previewPosition='none'
							theme='light'
							set='native'
							skinTonePosition='search'
						/>
					}
					title={null}
					arrow={false}
					trigger='click'
					placement='rightTop'
					open={showEmoji}
					onOpenChange={() => setShowEmoji(!showEmoji)}
					overlayClassName={style['emoji-popover-overlay']}
				>
					<div className={style['emoji-container']}>
						<div>{input.value}</div>
						{input.value && allowClear
							? <Icon onClick={onClear} component={CrossIcon} className={style['icon']} />
							: <CaretDownOutlined />
						}
					</div>
				</Popover>
			</div>
		</Form.Item>
	);
}

export default EmojiField;
