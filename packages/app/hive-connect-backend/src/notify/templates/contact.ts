export default (contact: any) => `

New contact received on HexHive

Contact data
---
${JSON.stringify(contact, null, 2)}

`