import { v4 as uuid } from 'uuid';
import { AppDataSource } from '@src/config/datasource';
import { Outbox } from '@src/outbox/outbox.entity';
import { OutboxStatus } from '@src/outbox/outbox.types';

export class OutboxFactory {
  static async create(data?: Partial<Outbox>) {
    const outbox = new Outbox();
    outbox.status = OutboxStatus.Created;
    outbox.operationUuid = uuid();

    return AppDataSource.manager.getRepository(Outbox).save({ ...outbox, ...data });
  }

  static async createMany(quantity: number, data?: Partial<Outbox>) {
    const items = [];

    for (let i = 1; i <= quantity; i++) {
      const outbox = new Outbox();
      outbox.status = OutboxStatus.Created;
      outbox.operationUuid = uuid();

      items.push(await AppDataSource.manager.getRepository(Outbox).save({ ...outbox, ...data }));
    }

    return items;
  }
}