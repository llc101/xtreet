import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ModeratorModule } from './moderator/moderator.module';
import { ProductsModule } from './products/products.module';
import { StoreModule } from './store/store.module';
import { DealerModule } from './dealer/dealer.module';
import { DealModule } from './deal/deal.module';
import { CategoryModule } from './category/category.module';
import { RuleModule } from './rule/rule.module';
import { RateModule } from './rate/rate.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AdvertModule } from './advert/advert.module';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/Guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModule,
    PrismaModule,
    UserModule,
    ModeratorModule,
    ProductsModule,
    StoreModule,
    DealerModule,
    DealModule,
    CategoryModule,
    RuleModule,
    RateModule,
    FeedbackModule,
    AdvertModule,
    BookingModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
