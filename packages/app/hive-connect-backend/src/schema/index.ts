
export default `


    type Query {
    
        contacts(ids: [ID], start: DateTime, end: DateTime): [Contact] @merge(keyField: "id", keyArg: "ids")
        companies(ids: [ID]): [Company] @merge(keyField: "id", keyArg: "ids")
        orders(ids: [ID], start: DateTime, end: DateTime): [Order] @merge(keyField: "id", keyArg: "ids")
        requests(ids: [ID], start: DateTime, end: DateTime): [Request] @merge(keyField: "id", keyArg: "ids")

        notificationPathways: [NotificationPathway]
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

        createNotificationPathway(user: String, email: String, notifyOn: [String]): NotificationPathway
        updateNotificationPathway(user: String, email: String, notifyOn: [String]): NotificationPathway
        deleteNotificationPathway(user: String): NotificationPathway
    }

    input ContactInput {
        id: ID
        name: String
        email: String
        phone: String
        address: String
    }

    type Contact {
        id : ID
        name: String
        email: String
        phone: String
        address: String

        orders: [Order]
        requests: [Request]

        firstContact: DateTime

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

    type NotificationPathway {
        id: ID
        
        user: HiveUser
        
        organisation: HiveOrganisation

        notifyOn: [String]

        createdOn: DateTime
    }
`