import { BandDatabase } from "../data/BandDatabase"
import { InvalidInputError } from "../error/InvalidInputError"
import { UnauthorizedError } from "../error/UnauthorizedError"
import { Band, BandInputDTO } from "./entities/Band"
import { User, UserRole } from "./entities/User"
import { Authenticator } from "../business/services/Authenticator"
import { IdGenerator } from "../business/services/IdGenerator"


export class BandBusiness {
    constructor(
        private bandDatabase: BandDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async newBand(input: BandInputDTO, token: string) {
        const tokenData = this.authenticator.getData(token)

        if (tokenData.role !== UserRole.ADMIN) {
            throw new UnauthorizedError("Only admins can acess this content")
        }

        if (!input.name || !input.musicGenre || !input.responsible) {
            throw new InvalidInputError("Invalid inputs to newBand")
        }

        await this.bandDatabase.createBand(
            Band.toBand({
                ...input,
                id: this.idGenerator.generate()
            })!
        )
    }

    async getBandDetailByIdOrName(input: string): Promise<Band> {
        if (!input) {
            throw new InvalidInputError("invalid input ti getBandDetail")
        }

        return this.bandDatabase.getBandDetailByIdOrName(input)
    }
}

