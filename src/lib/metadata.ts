import { Metadata } from "next"

/**
 * Create metadata for a specific page
 * @param title - Page title
 * @param description - Page description
 * @param noIndex - Whether to prevent search engines from indexing this page
 * @returns Metadata object
 */
export function createMetadata({
  title,
  description,
  noIndex = false
}: {
  title?: string
  description?: string
  noIndex?: boolean
}): Metadata {
  return {
    ...(title && { title }),
    ...(description && { description }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    }),
    openGraph: {
      ...(title && { title }),
      ...(description && { description })
    },
    twitter: {
      ...(title && { title }),
      ...(description && { description })
    }
  }
}
