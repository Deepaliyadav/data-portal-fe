/**
 * Gets the owner document of an HTML element.
 */
export function getOwnerDocument(node) {
	return node?.ownerDocument ?? document;
}
