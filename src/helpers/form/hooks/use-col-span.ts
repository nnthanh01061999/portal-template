import { Grid } from "antd"

export const useColSpan = (total: number) => {
  const screens = Grid.useBreakpoint()
  switch (total) {
    case 1:
      return 24
    case 2:
      return screens.lg ? 12 : 24
    case 3:
      return screens.lg ? 8 : 24
    case 4:
      return screens.lg ? 6 : 24
    case 6:
      return screens.lg ? 4 : 24
    default:
      return 24
  }
}
