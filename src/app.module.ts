import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { Book } from './entity/book.entity';
import { BookType } from './entity/type_book.entity';
import { Publisher } from './entity/publisher.entity';
import { Tag } from './entity/tag.entity';
import { Rate } from './entity/rate.entity';
import { BookTypeModule } from './modules/book_type/book_type.module';
import { PublisherModule } from './modules/publisher/publisher.module';
import { BookModule } from './modules/book/book.module';
import { Author } from './entity/author.entity';
import { AuthorModule } from './modules/author/author.module';
import { TagModule } from './modules/tag/tag.module';
import { RateController } from './modules/rate/rate.controller';
import { RateModule } from './modules/rate/rate.module';
import { RateService } from './modules/rate/rate.service';
import { AuthModule } from './modules/auth/auth.module';
import { Customer } from './entity/customer.entity';
import { CustomerType } from './entity/customer_type.entity';
import { Cart } from './entity/cart.entity';
import { CustomerModule } from './modules/customer/customer.module';
import { CartModule } from './modules/cart/cart.module';
import { CartDetail } from './entity/cart_detail.entity';
import { CartDetailModule } from './modules/cart-detail/cart-detail.module';
import { ReceiptInfomationModule } from './modules/receipt-infomation/receipt-infomation.module';
import { ReceiptInformation } from './entity/receipt_information';
import { StaffModule } from './modules/staff/staff.module';
import { Invoice } from './entity/invoice.entity';
import { Promotion } from './entity/promotion.entity';
import { PromotionBook } from './entity/promotion_book.entiti';
import { PromotionCustomer } from './entity/promotion_customer.entity';
import { Staff } from './entity/staff.entity';
import { Status } from './entity/status.entity';
import { StatusInvoice } from './entity/status_invoice.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        Book,
        BookType,
        Publisher,
        Tag,
        Rate,
        Author,
        Customer,
        CustomerType,
        Cart,
        CartDetail,
        ReceiptInformation,
        Invoice,
        Promotion,
        PromotionBook,
        PromotionCustomer,
        Staff,
        Status,
        StatusInvoice,
      ],
      synchronize: true,
    }),
    BookTypeModule,
    PublisherModule,
    BookModule,
    AuthorModule,
    TagModule,
    RateModule,
    AuthModule,
    CustomerModule,
    CartModule,
    CartDetailModule,
    ReceiptInfomationModule,
    StaffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
