const priorities = ['low', 'medium', 'high']

export const nameToValue = name => priorities.indexOf(name)

export const valueToName = value => priorities[value]