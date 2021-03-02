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
  save = async(bug: Bug): Promise<Bug> => { //console.log('in server side bugservice' , bug)
    return bug.id > 0 ? this.repo.update(bug) : this.repo.create(bug)
  }
  delete = async(id: number): Promise<boolean> => this.repo.delete(id);
}

export default BugService;