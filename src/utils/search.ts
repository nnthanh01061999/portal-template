export const removeAccents = (str: string): string => {
  if (str)
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")

  return str
}

export const vietnameseIgnoreSearching = (
  value?: string | string[],
  keyword?: string
) => {
  if (Array.isArray(value)) {
    return !!value.find((item) =>
      removeAccents(item || "")
        .toLocaleLowerCase()
        .includes(removeAccents(keyword || "").toLocaleLowerCase())
    )
  }
  return removeAccents(value || "")
    .toLocaleLowerCase()
    .includes(removeAccents(keyword || "").toLocaleLowerCase())
}
