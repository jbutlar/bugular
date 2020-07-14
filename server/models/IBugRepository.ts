import Bug from '../entities/Bug'

interface IBugRepository {
    getById (id: number): Promise<Bug>
    query (query: string): Promise<Bug[]>
    get (): Promise<Bug[]>
    update (bug: any): Promise<Bug>
}

export default IBugRepository