import { Ticket } from '@api/ticket/ticket.entity';

export class TicketDeleteReplyMessage {
  ticket: Ticket;
  transactionHash?: string;
  errorData?: string;

  constructor(data: Partial<TicketDeleteReplyMessage>) {
    Object.assign(this, data);
  }
}
