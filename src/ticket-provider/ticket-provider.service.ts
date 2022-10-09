import { Injectable } from '@nestjs/common';
import { TicketProvider } from './ticket-provider.entity';
import { TicketProviderRepository } from './ticket-provider.repository';

@Injectable()
export class TicketProviderService {
  constructor(private readonly ticketProviderRepository: TicketProviderRepository) {}

  async findOne(id: number): Promise<TicketProvider> {
    return this.ticketProviderRepository.findById(id);
  }

  async findMany(id: number): Promise<TicketProvider[]> {
    return this.ticketProviderRepository.findMany(id);
  }
}