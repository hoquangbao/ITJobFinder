import { Router } from 'express';
// import validate from 'express-validation';
import * as companyController from './company.controller';
import { authJwt } from '../../service/passport';
import { roleEmployer } from '../../service/role';
// import companyValidation from './company.validate';

const routes = new Router();

routes.post('/create_company', companyController.createCompany);
routes.get('/get_company/:createdBy', authJwt, companyController.getCompany);
routes.get('/', authJwt, companyController.getListCompany);
routes.get('/:id', authJwt, roleEmployer, companyController.getCompanyDetail);
routes.patch('/:id', authJwt, roleEmployer, companyController.updateCompany);
routes.delete('/:id', authJwt, roleEmployer, companyController.deleteCompany);

export default routes;
