export const findCurrentRouteObjectByuseLocation = (list: any[] = [], target: string = ''):any => {
  for (const item of list) {
    if (item.url === target) {
      return item
    }
    if (item.children) {
      const result = findCurrentRouteObjectByuseLocation(item.children, target);
      if (result) return result
    }
  }
}