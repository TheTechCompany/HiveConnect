export default (order: any) => `

New order received on HexHive

Order data
---
${Object.keys(order).filter((a) => a != 'id' && a != 'organisation').map((key) => {
    return `${key}: ${order[key]}`
}).join('\n')}
`