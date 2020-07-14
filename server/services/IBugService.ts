import Bug from '../entities/Bug'

interface IBugService {
    getById (id: number): Promise<Bug>
    query (query: string): Promise<Bug[]>
    get (): Promise<Bug[]>
    update (bug: Bug): Promise<Bug>
}

export default IBugService