import IBugRepository from './IBugRepository';
import Database from '../utils/Database'
import Bug from '../entities/Bug'
 
class BugRepository implements IBugRepository {
    
    private readonly db: Database;
    constructor (db: Database) {
       this.db = db
    }

    getById = async(id: number):Promise<Bug> => {
            try {
               const bug = await this.db.executeQuery(`SELECT * FROM bugs where id = ${id}`) as Bug
               return bug;
            }
            catch(err)
            {
               return err
            }

    }        
    query = async(query: string):Promise<Bug[]> =>  {
            try {
               const bugs = await this.db.executeQuery(`SELECT * FROM bugs where INSTR(descrip, '${query}') > 0`) as Bug[]
               return bugs;
            }
            catch(err)
            {
                return err;
            }
    }
    get = async():Promise<Bug[]> => {
            
      try {
         const bugs = await this.db.executeQuery('SELECT * FROM bugs') as Bug[]
         return bugs;
      }
      catch(err)
      {
          return err;
      }
   }
   update = async(bug: Bug):Promise<Bug> => {
            
      try {
         const bugs = await this.db.executeQuery('SELECT * FROM bugs where id 1') as Bug
         return bugs;
      }
      catch(err)
      {
          return err;
      }
   }

  
}

  export default BugRepository