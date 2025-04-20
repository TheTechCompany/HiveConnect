export default (contact: any) => `

New contact received on HexHive

Contact data
---
${Object.keys(contact).filter((a) => a != 'id' && a != 'organisation').map((key) => {
    return `${key}: ${contact[key]}`
}).join('\n')}
`