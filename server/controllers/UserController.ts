import expressRouter from 'express';
import IUserService from '../services/IUserService';
import User from '../entities/User'
import bcrypt from 'bcrypt';

class UserController {
  
  private UserRouter: any
  private readonly service: IUserService

  constructor (userService: IUserService)
  {
    this.service = userService;
    this.UserRouter = expressRouter();
    this.setRoutes();
  }

  routes = () => this.UserRouter;

  setRoutes() {
        this.UserRouter.get('/', async(req, res, next) => {

          if (!res.headersSent) res.setHeader('Content-Type', 'application/json');
          
          if (Object.keys(req.query).length > 0) return next()
          
          this.service.get().then(user => res.send(user as User[])).catch(err => next(err))

        },async(req, res, next) => {
            
              if (!req.query.id) return next()

              this.service.getById(req.query.id).then(user => res.send(user as User)).catch(err => next(err));
          
          },async(req, res, next) => {

            this.service.query(`${req.query.query}`).then(user => res.send(user as User[])).catch(err => next(err));
          
          });
        this.UserRouter.post('/', async (req, res, next) => {
          
          const body = req.body

          const saltRounds = 10
          const passwordHash: string = await bcrypt.hash(body.password, saltRounds)

          const user: User = {
            userName: body.userName,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            passwordHash 
          } as User
          
          if (!res.headersSent) res.setHeader('Content-Type', 'application/json');
        
          let queryParams = req.body.user;
          let userId = isNaN(parseInt(queryParams)) ? 0 : queryParams;
           
        
        });
        
        this.UserRouter.delete('/:id', (request, response, next) => {
        
        })
        
        this.UserRouter.put('/:id', (request, response, next) => {
          const body = request.body

        
        })

  }

}

export default UserController;