import Container from './Container'
import * as config from '../utils/config';
import BugProvider from '../providers/BugProvider'
import Database from '../utils/Database';


export = () => {
    let container = new Container();
    container.service('config', c => config);
    container.service('Database', c => new Database(c.config.MYSQL_DB_CONFIG));
    
    BugProvider(container);

    return container;
};

