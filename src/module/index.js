import userRoutes from './user/user.route';
import companyRoutes from './company/company.route';
import skillRoutes from './skill/skill.route';
import roleRoutes from './role/role.route';
import jobRoutes from './job/job.route';
import adminRoutes from './admin/admin.route';

export default app => {
  app.use('/users', userRoutes);
  app.use('/admins', adminRoutes);
  app.use('/company', companyRoutes);
  app.use('/skills', skillRoutes);
  app.use('/roles', roleRoutes);
  app.use('/jobs', jobRoutes);
};
