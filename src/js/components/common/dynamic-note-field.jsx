import React from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import InfoIcon from 'src/icons/info-icon';

import style from './common.module.scss';

function DynamicNoteField({ data = {}, extraStyle = {} }) {

	return (
		<div className={style['desc-note-field']} style={{ backgroundColor: data.bgColor, borderColor: data.borderCC || '#D5E9FD', ...extraStyle }}>
			{data.showIcon && <Icon className={style['descIcon']} component={InfoIcon} />}
			<div className={style['text']} style={data.showIcon ? { width: 'calc(100% - 30px)', margin: 'auto' } : {}}>
				{data?.text}
			</div>
		</div>
	);
}

export default DynamicNoteField;

