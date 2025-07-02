import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Not Found",
  description: "The page you are looking for does not exist.",
  robots: {
    index: false,
    follow: false
  }
}

export default function LocaleNotFound() {
  // Redirect to the 404 page
  redirect("/404")
}
