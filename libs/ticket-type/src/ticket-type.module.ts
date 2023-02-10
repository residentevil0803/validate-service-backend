import { Module } from '@nestjs/common';
import { TicketTypeRepository } from './ticket-type.repository';
import { TicketTypeService } from './ticket-type.service';

@Module({
  providers: [TicketTypeRepository, TicketTypeService],
})
export class TicketTypeModule {}
