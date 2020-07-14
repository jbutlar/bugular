import BugRepository from '../models/BugRepository'
import BugController from '../controllers/BugController'
import BugService from '../services/BugService'

function BugProvider(c) {
    
    c.service('BugRepository', c => new BugRepository(c.Database));
    c.service('BugService', c => new BugService(c.BugRepository));
    c.service('BugController', c => new BugController(c.BugService))

};

export default BugProvider