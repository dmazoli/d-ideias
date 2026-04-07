export class Idea {
  id: number;
  authorRegister: number;
  improvementSuggestion: string;
  currentProcess: string;
  howToImplement: string;
  expectedBenefits: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    authorRegister: number,
    improvementSuggestion: string,
    currentProcess: string,
    howToImplement: string,
    expectedBenefits: string,
    upvotes: number,
    downvotes: number,
    createdAt: Date | string,
    updatedAt: Date | string,
  ) {
    this.id = id;
    this.authorRegister = authorRegister;
    this.improvementSuggestion = improvementSuggestion;
    this.currentProcess = currentProcess;
    this.howToImplement = howToImplement;
    this.expectedBenefits = expectedBenefits;
    this.upvotes = upvotes;
    this.downvotes = downvotes;
    this.createdAt = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
    this.updatedAt = typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt;
  }
}
