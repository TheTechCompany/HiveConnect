import { PrismaClient } from "@prisma/client";
import e from "cors";
import { nanoid } from 'nanoid'

export default (prisma : PrismaClient) => ({

    Mutation: {
        createContact: async (root: any, args: any, context: any) => {
            return await prisma.contact.create({
                data: {
                    id: nanoid(),
                    name: args.input.name,
                    address: args.input.address,
                    email: args.input.email,
                    organisation: context?.jwt?.organisation
                }
            })
        },
        updateContact: async (root: any, args: any, context: any) => {
            return await prisma.contact.update({
                where: {
                    id: args.id,
                    organisation: context?.jwt?.organisation
                },
                data: {
                    name: args.input.name,
                    address: args.input.address,
                    email: args.input.email,
                }
            })
        },
        deleteContact: async (root: any, args: any, context: any) => {
            return await prisma.contact.delete({
                where: {
                    id: args.id,
                    organisation: context?.jwt?.organisation
                }
            })
        },

        createRequest: async (root: any, args: any, context: any) => {

            let contactInfo : any = {};
            if(args.input.contact?.id){
                contactInfo = {connect: {id: args.input.contact?.id}}
            }else{
                contactInfo = {create: {data: {id: nanoid(), ...args.input.contact}}}
            }

            const count = await prisma.request.count({
                where: {
                    organisation: context?.jwt?.organisation
                }
            })
            
            return await prisma.request.create({
                data: {
                    id: nanoid(),
                    humanId: `R-${((count || 0) + 1)}`,
                    data: args.input.data,
                    source: args.input.source,
                    contact: contactInfo,
                    organisation: context?.jwt?.organisation
                }
            })
        },
        updateRequest: async (root: any, args: any, context: any) => {
            return await prisma.request.update({
                where: {
                    id: args.id,
                    organisation: context?.jwt?.organisation
                },
                data: {              
                    data: args.input.data,
                    source: args.input.source,
                }
            })
        },
        deleteRequest: async (root: any, args: any, context: any) => {
            return await prisma.request.delete({
                where: {
                    id: args.id,
                    organisation: context?.jwt?.organisation
                }
            })
        },

        createOrder: async (root: any, args: any, context: any) => {

            let contactInfo : any = {};
            if(args.input.contact?.id){
                contactInfo = {connect: {id: args.input.contact?.id}}
            }else{
                contactInfo = {create: {data: {id: nanoid(), ...args.input.contact}}}
            }

            const count = await prisma.order.count({
                where: {
                    organisation: context?.jwt?.organisation
                }
            })

            return await prisma.order.create({
                data: {
                    id: nanoid(),  
                    humanId: `O-${((count || 0) + 1)}`,
                    data: args.input.data,
                    source: args.input.source,
                    status: args.input.status,
                    contact: contactInfo,
                    organisation: context?.jwt?.organisation
                }
            })
        },
        updateOrder: async (root: any, args: any, context: any) => {
            return await prisma.order.update({
                where: {
                    id: args.id,
                    organisation: context?.jwt?.organisation
                },
                data: {
                    data: args.input.data,
                    source: args.input.source
                }
            })
        },
        deleteOrder: async (root: any, args: any, context: any) => {
            return await prisma.order.delete({
                where: {
                    id: args.id,
                    organisation: context?.jwt?.organisation
                }
            })
        },
        createCompany: async (root: any, args: any, context: any) => {
            return await prisma.company.create({
                data: {
                    id: nanoid(),
                    name: args.input.name,
                    organisation: context?.jwt?.organisation
                }
            })
        },
        updateCompany: async (root: any, args: any, context: any) => {
            return await prisma.company.update({
                where: {
                    id: args.id,
                    organisation: context?.jwt?.organisation
                },
                data: {
                    name: args.input.name,
                }
            })
        },
        deleteCompany: async (root: any, args: any, context: any) => {
            return await prisma.company.delete({
                where: {
                    id: args.id,
                    organisation: context?.jwt?.organisation
                }
            })
        }
    },
    Query: {
        contacts: async (root: any, args: any, context: any) => {
            return await prisma.contact.findMany({
                where: {
                    organisation: context?.jwt?.organisation
                }
            })
        },
        companies: async (root: any, args: any, context: any) => {
            return await prisma.company.findMany({
                where: {
                    organisation: context?.jwt?.organisation
                }
            })
        },
        orders: async (root: any, args: any, context: any) => {
            return await prisma.order.findMany({
                where: {
                    organisation: context?.jwt?.organisation
                },
                include: {
                    contact: true
                }
            })
        },
        requests: async (root: any, args: any, context: any) => {
            return await prisma.request.findMany({
                where: {
                    organisation: context?.jwt?.organisation
                },
                include: {
                    contact: true
                }
            })
        },
    }
})