import prisma from '../../../../lib/prisma'
import util from 'util'

export default async function handle(req, res) {
    const { mid } = req.query
    switch (req.method) {
        case "GET": 
            res.end()
            break;
        case "POST":
            res.end()
            break;
        case "DELETE":
            res.end()
            break;
        case "PUT":
            const machineToUpdate = await prisma.machine.findFirst({
                where: {
                    id: Number(mid)
                }
            })
            var machine = await prisma.machine.update({
                where: {
                    id: Number(mid)
                },
                data: {
                    pumpname: null,
                    time: null,
                    active: false
                }
            })

            var pump = await prisma.pump.findFirst({
                where: {
                    name: machineToUpdate.pumpname
                }
            })

            await prisma.pump.update({
                where: {
                    id: Number(pump.id)
                },
                data: {
                    active: false
                }
            })

            // const payload = {
            //     sender: "23727415",
            //     message: pump.stopcode,
            //     recipients: [
            //         { msisdn: "+45" + pump.number },
            //     ],
            // };

            // const apiToken = `hzWHQavUTHe6c0D6QaLyElvkCYp6c4Wbr5nYw6RVHV1pQCsNSMZnv204wYsNFqF_`;
            // const encodedAuth = Buffer.from(`${apiToken}:`).toString("base64");

            // const resp = await fetch("https://gatewayapi.com/rest/mtsms", {
            //     method: "post",
            //     body: JSON.stringify(payload),
            //     headers: {
            //         Authorization: `Basic ${encodedAuth}`,
            //         "Content-Type": "application/json",
            //     },
            // });
            // const json = await resp.json()
            
            // console.log(util.inspect(json, {showHidden: false, depth: null}));

            // if (resp.ok) {
            //     console.log("congrats! messages are on their way!");
            // } else {
            //     console.log("oh-no! something went wrong...");
            // }

            var machines = await prisma.machine.findMany()
            res.send(machines)
            break;
    }    
}
