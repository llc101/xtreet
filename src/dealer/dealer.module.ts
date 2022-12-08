import { Module } from '@nestjs/common';
import { DealerService } from './dealer.service';
import { DealerController } from './dealer.controller';

@Module({
  providers: [DealerService],
  controllers: [DealerController],
})
export class DealerModule {}
