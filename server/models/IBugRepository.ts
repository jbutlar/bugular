import Bug from '../entities/Bug'

interface IBugRepository {
    getById (id: number): Promise<Bug>
    query (query: string): Promise<Bug[]>
    get (): Promise<Bug[]>
    update (bug: Bug): Promise<Bug>
    create (bug: Bug): Promise<Bug>
    delete (id: number): Promise<boolean>
}

export default IBugRepository