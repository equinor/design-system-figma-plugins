const props: { [key: string]: string } = {
  strokeTopWeight: 'borderTopWidth',
  strokeRightWeight: 'borderRightWidth',
  strokeBottomWeight: 'borderBottomWidth',
  strokeLeftWeight: 'borderLeftWidth',
  strokes: 'borderColor',
  itemSpacing: 'gap',
}

const pascalToKebab = (str: string) => str.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase()

const replaceProp = (propName: string) => {
  return props[propName] ?? propName
}

export async function replacePropNameWithCSS(propName: string): Promise<string> {
  return Promise.resolve(replaceProp(propName)).then(pascalToKebab)
}
