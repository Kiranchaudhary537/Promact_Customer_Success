export interface MeetingMinute {
  id?: string;
  projectId: string;
  meetingDate: Date;
  moMLink: string;
  comments: string;
  duration: number;
}
