export default (company: any) => `

New company received on HexHive

Company data
---
${JSON.stringify(company, null, 2)}

`