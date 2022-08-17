import prisma from '../../../../lib/prisma'

export default async function handle(req, res) {
    const mid = Number(req.query.mid)

    switch (req.method) {
        case "GET": 
            res.end(`Machine: ${mid}`)
            break;
        case "POST":            
            const { text } = req.body;
        
            var now = new Date()   

            await prisma.machine.update({
                where: { id: mid },
                data: {
                    maintenances: {
                        create: [
                            { time: now, note: text }
                        ]
                    }
                }
            })

            var machine = await prisma.machine.findUnique({
                where: {
                    id: Number(mid)
                },
                include: {maintenances: true}
            })
            res.json(machine)
            break;
        case "DELETE":
            var { id } = req.body;

            await prisma.machine.update({
                where: {
                  id: mid,
                },
                data: {
                    maintenances: {
                        deleteMany: [{ id: id }],
                    },
                },
            })

            var machine = await prisma.machine.findUnique({
                where: {
                    id: Number(mid)
                },
                include: {maintenances: true}
            })
            res.json(machine)
            break;
        case "PUT":
            var note = req.body;

            await prisma.machine.update({
                where: {
                  id: mid,
                },
                data: {
                    maintenances: {
                        update: [{
                            where: {
                                id: note.id
                            },
                            data: {
                                note: note.note
                            }
                        }],
                    },
                },
            })

            var machine = await prisma.machine.findUnique({
                where: {
                    id: Number(mid)
                },
                include: {maintenances: true}
            })
            res.json(machine)
            break;
    }    
}