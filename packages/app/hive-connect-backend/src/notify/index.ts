import { PrismaClient } from "@prisma/client";
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import templates from "./templates";

const sesClient = new SESClient({
    
})

export const notify = async (key: string, item: any, prisma: PrismaClient, organisation: string) => {
    const pathways = await prisma.notificationPathway.findMany({
        where: {
            organisation,
            notifyOn: {has: key}
        }
    })

    console.log({templates, key, item});
    let message = (templates as any)[key]?.(item)
    console.log({message});

    await Promise.all(pathways.map(async (pathway) => {
        let emailCommand = new SendEmailCommand({
            Source: 'no-reply@hexhive.io',
            Destination: {
                ToAddresses: [pathway.email]
            },
            Message: {
                Body: {
                    Text: message
                },
                Subject: {
                    Data: `New ${key} in HexHive`,
                }
            }
        })

        await sesClient.send(emailCommand)
    }))

}