import prisma from '../../lib/prisma'

export default async function handle(req, res) {
    if (req.method == "POST") {
        const { pwd } = req.body

        if (pwd == process.env.NEXT_PUBLIC_PWD) {
            res.status(200)
        } else {
            res.status(401)
        }
    }   
    
    res.end()
}