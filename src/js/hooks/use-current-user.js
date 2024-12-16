
import { useContext } from 'react';

import { AppContext } from '../global/context';

/**
 * Uses the currently logged in user.
 *
 * @example
 * <code>
 *     let [ user, syncUser ] = useCurrentUser();
 * </code>
 *
 * @returns {Object}
 */
export function useCurrentUser() {

	let contextData = useContext(AppContext) || {};
	let { user, syncUser } = contextData;

	return [user, syncUser];
}

export function useCurrentProject() {

	let contextData = useContext(AppContext) || {};
	let { project, syncProject } = contextData;

	return [project, syncProject];
}

export function useContentHeight() {
	let { contentHeight } = useContext(AppContext);
	return contentHeight;
}

export function useUserPermission() {
	let { userPermission } = useContext(AppContext);
	return userPermission;
}

export function useContentWidth() {
	let { contentWidth } = useContext(AppContext);
	return contentWidth;
}
