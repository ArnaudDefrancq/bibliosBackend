import { DAO } from "../DAO/DAO.js";
import type { LoansDetails } from "../Schemas/LoansDetailsSchema.js";

export class LoansDetailsService {
    private LoansDetailsDAO: DAO<LoansDetails>;

    constructor() {
        this.LoansDetailsDAO = new DAO('loans_details', 'id_loan');
    }

    public async createLoansDetails(loandDetail: LoansDetails): Promise<number> {
        return await this.LoansDetailsDAO.create(loandDetail);
    }
    
    public async findLoansDetails(options: {where?: string, params?: any[], join?: string}): Promise<LoansDetails[]> {
        return await this.LoansDetailsDAO.find(options);
    }

    public async findLoansDetailsById(id: number): Promise<LoansDetails | null> {
        return await this.LoansDetailsDAO.findById(id);
    }

    public async updateLoansDetails(id: number, loandDetail: Partial<LoansDetails>): Promise<number> {
        return await this.LoansDetailsDAO.update(id, loandDetail);
    }

    public async deleteLoansDetails(id: number): Promise<number> {
        return await this.LoansDetailsDAO.delete(id);
    }
}