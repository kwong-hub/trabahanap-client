import { CompanyProfile } from "./CompanyProfile";
import { Role } from "./Role";

export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  token?: string;
  company_profile: CompanyProfile;
  applicantProfile: object;
  hasFinishedProfile: boolean;
}
