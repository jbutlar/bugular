import Bug from '../entities/Bug'

interface IBugService {
    getById (id: number): Promise<Bug>
    query (query: string): Promise<Bug[]>
    get (): Promise<Bug[]>
    save (bug: Bug): Promise<Bug>
    delete (id: number): Promise<boolean>
}

export default IBugService