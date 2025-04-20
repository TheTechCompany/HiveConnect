export default (request: any) => `

New request received on HexHive

Request data
---
${Object.keys(request).filter((a) => a != 'id' && a != 'organisation').map((key) => {
    return `${key}: ${request[key]}`
}).join('\n')}
`