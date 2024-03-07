// project-allocation.model.ts
import { Project } from './ProjectModel';

export interface projectResourceModel extends Project {
  id?: string;
  projectId: string;
  project?: Project;
  allocationPercentage: number;
  start: string;
  end: string;
  role: string;
  comment?:string,
}
