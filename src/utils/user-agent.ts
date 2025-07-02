export const getBrowser = () => {
  if (typeof navigator === "undefined") return { name: "", version: "" }

  const userAgent = navigator.userAgent

  const match =
    userAgent.match(
      /(firefox|msie|trident|chrome|edg|safari|opr|opera|crios|fxios|samsungbrowser|ucbrowser|qqbrowser)[\/\s]?([\d.]+)/i
    ) || []

  let name = match[1] || ""
  let version = match[2] || ""

  // Xử lý các trình duyệt đặc biệt
  if (/trident/i.test(name)) {
    name = "Internet Explorer"
    const ieVersion = /\brv[ :]+(\d+)/g.exec(userAgent)
    if (ieVersion) version = ieVersion[1]
  }

  if (name.toLowerCase() === "opr" || name.toLowerCase() === "opera") {
    name = "Opera"
  }

  if (name.toLowerCase() === "crios") {
    name = "Chrome (iOS)"
  }

  if (name.toLowerCase() === "fxios") {
    name = "Firefox (iOS)"
  }

  return { name, version }
}
