import User from '../entities/User'

interface IUserService {
    getById (id: number): Promise<User>
    query (query: string): Promise<User[]>
    get (): Promise<User[]>
    update (bug: User): Promise<User>
}

export default IUserService