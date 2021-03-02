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
               const result = await this.db.executeQuery(`SELECT * FROM bugs where id = ${id}`)
                
               return result.length === 1 ? result[0] as Bug : Promise.reject()
                
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

         const store = await this.db.executeQuery('call sumone') 
         //console.log('we made it all the way to bug repo  ', store)
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
         const newBug = await this.db.executeQuery(`update bugs set descrip = '${bug.descrip}' where id = ${bug.id}`)

         return this.getById(bug.id);
      }
      catch(err)
      {
          return err;
      }
   }
   create = async(bug: Bug):Promise<Bug> => {
            
      try {
         const newBug = await this.db.executeQuery(`insert into bugs (descrip) values ('${bug.descrip}')`)
         
         return this.getById(newBug.insertId);
      }
      catch(err)
      {
          return err;
      }
   }
   delete = async (id: number):Promise<boolean> =>
   {
      try {
         
         const newBug = await this.db.executeQuery(`delete from bugs where id = ${id}`)
         
         return true;
      }
      catch(err)
      {
          return false;
      }
   }
   

  
}

  export default BugRepository