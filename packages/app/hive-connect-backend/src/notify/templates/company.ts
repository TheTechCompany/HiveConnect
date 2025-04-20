export default (company: any) => `

New company received on HexHive

Company data
---
${Object.keys(company).filter((a) => a != 'id' && a != 'organisation').map((key) => {
    return `${key}: ${company[key]}`
}).join('\n')}
`