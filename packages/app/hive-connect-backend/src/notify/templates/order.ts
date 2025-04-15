export default (order: any) => `

New order received on HexHive

Order data
---
${JSON.stringify(order, null, 2)}

`