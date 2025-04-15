export default (request: any) => `

New request received on HexHive

Request data
---
${JSON.stringify(request, null, 2)}

`