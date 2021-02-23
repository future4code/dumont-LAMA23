import { Request, Response } from "express"
import { BandBusiness } from "../business/BandBusiness"
import { BandDatabase } from "../data/BandDatabase"
import { BaseDatabase } from "../data/BaseDatabase"
import { BandInputDTO } from "../business/entities/Band"
import { Authenticator } from "../business/services/Authenticator"
import { IdGenerator } from "../business/services/IdGenerator"

export class BandController {
    async newBand(req: Request, res: Response) {
        try {
            const input: BandInputDTO = {
                name: req.body.name,
                musicGenre: req.body.musicGenre,
                responsible: req.body.responsible
            }

            const bandBusiness = new BandBusiness(
                new BandDatabase,
                new IdGenerator,
                new Authenticator
            )

            await bandBusiness.newBand(input, req.headers.authorization as string)

            res.sendStatus(200)
        }
        catch(error) {
            res.status(error.CustomErrorCode || 400).send({ message: error.message })
        }
        finally {
            await BaseDatabase.destroyConnection()
        }
    }

    async getBandDetail(req: Request, res: Response) {
        try{
            const input = (req.query.id ?? req.query.name) as string

            const bandBusiness = new BandBusiness (
                new BandDatabase,
                new IdGenerator,
                new Authenticator
            )

            const band = await bandBusiness.getBandDetailByIdOrName(input)

            res.status(200).send(band)
        }
        catch(error){
            res.status(error.CustomErrorCode || 400).send({ message: error.message })
        }
        finally {
            await BaseDatabase.destroyConnection()
        }
    } 
}