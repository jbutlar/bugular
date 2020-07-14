import mysql from 'mysql';

class Database {

    private readonly config: any;
    private connection: any;

    constructor(dbConfig: any)
    {
        this.config = dbConfig;
    }
    
    connect = () => mysql.createConnection(this.config);

    executeQuery = (sql: string) =>
    {
        if(!this.connection) this.connection = this.connect();
        
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results)
            })
        });
    }

}

export default Database