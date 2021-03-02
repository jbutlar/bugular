import expressRouter from 'express';
import IBugService from '../services/IBugService';
import Bug from '../entities/Bug'

class BugController {
  
  private BugRouter: any
  private readonly service: IBugService

  constructor (bugService: IBugService)
  {
    this.service = bugService;
    this.BugRouter = expressRouter();
    this.setRoutes();
  }

  routes = () => this.BugRouter;

  setRoutes() {
        this.BugRouter.get('/', async(req, res, next) => {

          if (!res.headersSent) res.setHeader('Content-Type', 'application/json');
          
          if (Object.keys(req.query).length > 0) return next()
          

          //console.log('about to hit service')
          this.service.get().then(bugs => res.send(bugs as Bug[])).catch(err => next(err))

        },async(req, res, next) => {
            
              if (!req.query.id) return next()

              this.service.getById(req.query.id).then(bug => res.send(bug as Bug)).catch(err => next(err));
          
          },async(req, res, next) => {

            this.service.query(`${req.query.query}`).then(bugs => res.send(bugs as Bug[])).catch(err => next(err));
          
          });
        this.BugRouter.post('/', (req, res, next) => {
          //console.log('hey from post : ', req.body);
          if (!res.headersSent) res.setHeader('Content-Type', 'application/json');
        
           let body = req.body;
           //let bugId = isNaN(parseInt(queryParams)) ? 0 : queryParams;
           this.service.save(body).then(bug => res.send(bug as Bug)).catch(err => next(err));
           
        
        });
        
        this.BugRouter.delete('/', (req, res, next) => {
          this.service.delete(req.query.id).then(success => res.send(success)).catch(err => next(err));
        })
        
        this.BugRouter.put('/:id', (req, res, next) => {
          //console.log('made it to put in controller ', req.body)
          const body = req.body
        
          this.service.save(body).then(bug => res.send(bug as Bug)).catch(err => next(err));
        
        })

  }

}

export default BugController;