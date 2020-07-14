import IBugRepository from '../models/IBugRepository';
import IBugService from '../services/IBugService';
import Bug from '../entities/Bug'

class BugService implements IBugService {
  
  private readonly repo: IBugRepository
  
  constructor (bugRepo: IBugRepository)
  {
    this.repo = bugRepo;
  }

  getById = async(id: number): Promise<Bug> => this.repo.getById(id);
  query = async(query: string): Promise<Bug[]> => this.repo.query(query);
  get = async(): Promise<Bug[]> => this.repo.get();
  update = async(bug: Bug): Promise<Bug> => this.repo.update(bug);
        
}

export default BugService;