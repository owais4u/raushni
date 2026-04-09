import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import memberRoutes from './routes/members';
import donationRoutes from './routes/donations';
import eventRoutes from './routes/events';
import projectRoutes from './routes/projects';
import expenseRoutes from './routes/expenses';
import crowdFundingRoutes from './routes/crowdfunding';
import internshipRoutes from './routes/internships';
import activityRoutes from './routes/activities';
import enquiryRoutes from './routes/enquiries';
import newsRoutes from './routes/news';
import designationRoutes from './routes/designations';
import beneficiaryRoutes from './routes/beneficiaries';
import auditRoutes from './routes/audit';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/crowdfunding', crowdFundingRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/designations', designationRoutes);
app.use('/api/beneficiaries', beneficiaryRoutes);
app.use('/api/audit', auditRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});