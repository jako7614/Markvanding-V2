import prisma from '../../../lib/prisma'

export default async function handle(req, res) {

  switch (req.method) {
    case "GET": 
        var pumps = await prisma.pump.findMany()
        res.json(pumps)
        break;
    case "POST":
        var pump = req.body;

        await prisma.pump.create({
            data: {
                name: pump.name,
                number: pump.number,
                active: pump.active == 0 ? false : true,
                startcode: pump.startcode,
                stopcode: pump.stopcode
            }
        })

        pumps = await prisma.pump.findMany()
        res.json(pumps)
        break;
    case "DELETE":
        res.end(`Pump: ${pid}`)
        break;
    case "PUT":
        var { pump } = req.body;

        await prisma.pump.update({
            where: { 
                id: Number(pid)
            },
            data: pump
        })

        pumps = await prisma.pump.findMany()
        res.json(pumps)
        break;
}    
}
