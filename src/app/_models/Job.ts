import { CompanyProfile } from './CompanyProfile';

export class Job{
    id: string;
    jobTitle: string;
    jobDescription: string;
    industry: string;
    position: string;
    educationAttainment: string;
    salaryRange: string;
    employmentType: string;
    vacancies: number;
    additionalQualifications: string;
    applicationStartDate: Date;
    applicationEndDate: Date;
    company_profile: CompanyProfile;
    companyLogo: any;
    companyName: any;
    jobId: any;
    pwd: any;
}