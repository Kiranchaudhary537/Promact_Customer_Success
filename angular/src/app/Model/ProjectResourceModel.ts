// project-allocation.model.ts
import { Project } from './ProjectModel';

export interface projectResourceModel extends Project {
  id?: string;
  projectId: string;
  project?: Project;
  allocationPercentage: number;
  start: Date;
  end: Date;
  role: string;
  comment:string,
}
