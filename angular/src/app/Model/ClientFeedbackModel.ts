export interface ClientFeedback {
  id?: string;
  projectId: string;
  dateReceived: Date;
  feedbackType: FeedbackType;
  detailedFeedback: string;
  actionTaken: boolean;
  closureDate?: Date;
}

export enum FeedbackType {
  Positive="Positive",
  Negative="Negative"
}
