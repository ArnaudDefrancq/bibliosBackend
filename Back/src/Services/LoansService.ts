import { DAO } from "../DAO/DAO.js";
import type { Loans } from "../Schemas/LoansSchema.js";

export class LoansService {
    private loanDAO: DAO<Loans>;

    constructor() {
        this.loanDAO = new DAO('loans', 'id_loan');
    }

    public async createLoan(Loan: Loans): Promise<number> {
        return await this.loanDAO.create(Loan);
    }
    
    public async findLoan(options: {where?: string, params?: any[], join?: string}): Promise<Loans[]> {
        return await this.loanDAO.find(options);
    }

    public async findLoanById(id: number): Promise<Loans | null> {
        return await this.loanDAO.findById(id);
    }

    public async updateLoan(id: number, Loan: Partial<Loans>): Promise<number> {
        return await this.loanDAO.update(id, Loan);
    }

    public async deleteLoan(id: number): Promise<number> {
        return await this.loanDAO.delete(id);
    }
}