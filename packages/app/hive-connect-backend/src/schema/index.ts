
export default `


    type Query {
        contacts : [Contact]
        companies: [Company]
        orders: [Order]
        requests: [Request]
    }

    type Mutation {
        createContact(input: ContactInput): Contact
        updateContact(id: ID, input: ContactInput): Contact
        deleteContact(id: ID): Contact

        createCompany(input: CompanyInput): Company
        updateCompany(id: ID, input: CompanyInput): Company
        deleteCompany(id: ID): Company

        createRequest(input: RequestInput): Request
        updateRequest(id: ID, input: RequestInput): Request
        deleteRequest(id: ID): Request

        createOrder(input: OrderInput): Order
        updateOrder(id: ID, input: OrderInput): Order
        deleteOrder(id: ID): Order
    }

    input ContactInput {
        id: ID
        name: String
        email: String
        address: String
    }

    type Contact {
        id : ID
        name: String
        email: String
        address: String

        orders: [Order]
        request: [Request]

        companyHistory: [CompanyRelationship]
    }

    type CompanyRelationship {
        id: ID
        company: Company
        contact: Contact
        start: DateTime
        end: DateTime
    }

    input CompanyInput {
        id: ID
        name: String
    }

    type Company {
        id: ID
        name: String

        contacts: [CompanyRelationship]
    }

    input OrderInput {
        status: String
        source: String
        data: JSON
        request: RequestInput
        contact: ContactInput
    }

    type Order {
        id: ID

        humanId: String

        status: String
        
        source: String
        data: JSON

        createdOn: DateTime

        request: Request
        
        contact: Contact
    }

    input RequestInput {
        id: ID

        contact: ContactInput

        source: String
        data: JSON
    }

    type Request {
        id: ID

        humanId: String

        contact: Contact

        source: String

        data: JSON
        
        createdOn: DateTime
    }
`