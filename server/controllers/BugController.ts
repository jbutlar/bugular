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
          
          this.service.get().then(bugs => res.send(bugs as Bug[])).catch(err => next(err))

        },async(req, res, next) => {
            
              if (!req.query.id) return next()

              this.service.getById(req.query.id).then(bug => res.send(bug as Bug)).catch(err => next(err));
          
          },async(req, res, next) => {

            this.service.query(`${req.query.query}`).then(bugs => res.send(bugs as Bug[])).catch(err => next(err));
          
          });
        this.BugRouter.post('/', (req, res, next) => {
          console.log('hey from post : ', req.body);
          if (!res.headersSent) res.setHeader('Content-Type', 'application/json');
        
           let queryParams = req.body.bug;
           let bugId = isNaN(parseInt(queryParams)) ? 0 : queryParams;
           
        
        });
        
        this.BugRouter.delete('/:id', (request, response, next) => {
        
        })
        
        this.BugRouter.put('/:id', (request, response, next) => {
          const body = request.body
        
          const note = {
            content: body.content,
            important: body.important,
          }
        
        })

  }

}

export default BugController;