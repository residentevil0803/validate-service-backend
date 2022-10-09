import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TicketProvider } from './ticket-provider.entity';

@Injectable()
export class TicketProviderRepository extends Repository<TicketProvider> {
  constructor(private readonly dataSource: DataSource) {
    super(TicketProvider, dataSource.manager);
  }

  async findById(id: number) {
    return this.findOne({ where: { id } });
  }

  async findMany(id: number) {
    return this.find({ where: { id } });
  }
}