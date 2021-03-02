import mysql from 'mysql';
class Database {

    private readonly config: any;
    private connection: any;

    constructor(dbConfig: any)
    {
        console.log('this is the config', dbConfig)
        this.config = dbConfig;
    }
    
    createConnection = () => mysql.createConnection(this.config);

    executeQuery = (sql: string) =>
    {
        //console.log('it made it to execQuery and sql is', sql)
        if(!this.connection) {
            this.connection = this.createConnection()
            this.connection.connect( err => {
                if (err) {
                  //console.log('we actually connected this time ', err);
                }
              })
        }
        
        return new Promise<any>((resolve, reject) => {
            this.connection.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                return reject(err)
            }

                return resolve(results)
            
            })
        });
    }

}

export default Database