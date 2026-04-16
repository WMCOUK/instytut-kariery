import DOMPurify from "isomorphic-dompurify"

/**
 * Sanitize untrusted HTML before injecting via dangerouslySetInnerHTML.
 *
 * Used for user-generated rich-text content (blog descriptions, recruiter
 * profiles, job descriptions) authored via the TipTap editor. TipTap
 * outputs HTML — without sanitization, a malicious user could write
 * <script> or onerror handlers that execute in viewers' browsers.
 *
 * Default config strips all script tags, event handlers, javascript: URLs,
 * and dangerous attributes while preserving common formatting tags
 * (h1-h6, p, ul, ol, li, strong, em, a, img, blockquote, etc.) — exactly
 * what TipTap users would expect to keep working.
 */
export function sanitizeHtml(html) {
	if (!html) return ""
	return DOMPurify.sanitize(html, {
		// Allow rich text tags but block scripts and event handlers
		USE_PROFILES: { html: true },
		// Be extra strict about iframes/objects/embeds
		FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form"],
		FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "onfocus"],
	})
}
