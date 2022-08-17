import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  switch (req.method) {
    case "GET": 
        var machines = await prisma.machine.findMany()
        res.json(machines)
        break;
    case "POST":
        var machine = req.body;
        await prisma.machine.create({
            data: {
                id: Number(machine.id),
                active: machine.active == 0 ? false : true,
                nozzle: machine.nozzle,
                model: machine.model
            }
        })

            var machines = await prisma.machine.findMany()
            res.json(machines)
            break;
    case "DELETE":
        res.end(`Machine: ${mid}`)
        break;
    case "PUT":
        const { id, time } = req.body
        var machine = await prisma.machine.update({
            where: {
                id: id
            },
            data: {
                time: new Date(time)
            }
            
        })

        var machines = await prisma.machine.findMany()
        res.json(machines)
        
        break;
}    
}