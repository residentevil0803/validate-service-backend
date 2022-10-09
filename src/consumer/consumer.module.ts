import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConsumerController } from './consumer.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvHelper } from '@src/common/helpers/env.helper';
import databaseConfig from '@src/config/database.config';
import kafkaConsumerConfig from '@src/config/kafka-consumer.config';
import { validate } from '@src/common/validators/env.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserModule } from '@src/user/user.module';
import { TicketModule } from '@src/ticket/ticket.module';
import kafkaProducerConfig from '@src/config/kafka-producer.config';
import { TicketTransferModule } from '@src/ticket-transfer/ticket-transfer.module';

EnvHelper.verifyNodeEnv();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: EnvHelper.getEnvFilePath(),
      isGlobal: true,
      load: [databaseConfig, kafkaProducerConfig, kafkaConsumerConfig],
      validate: validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get('databaseConfig');

        return {
          ...config,
          namingStrategy: new SnakeNamingStrategy(),
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    TicketModule,
    TicketTransferModule,
  ],
  providers: [ConsumerService],
  controllers: [ConsumerController],
})
export class ConsumerModule {}