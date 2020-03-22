import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingPostDto } from './dto/booking.post.dto';
import { User } from '../shared/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { BookingEntity } from '../entities/booking.entity';
import { NotificationGateway } from '../shared/notification.gateway';
import { NotificationType } from '@homeboi/api-interfaces';
import { RatingPostDto } from './dto/rating.post.dto';
import { RatingEntity } from '../entities/rating.entity';

@Controller('bookings')
export class BookingController {

  constructor(
    private readonly bookingsService: BookingService,
    private readonly notificationGateway: NotificationGateway) {
  }

  @Get('')
  async getAllBookings(): Promise<BookingEntity[]> {
    return this.bookingsService.getAllBookings();
  }

  @Post('')
  async createNewBooking(@Body() createBookingDto: BookingPostDto, @User() user: UserEntity) {
    const bookingResult = await this.bookingsService.createNewBooking(createBookingDto, user);
    if (bookingResult) {
      await this.notificationGateway.sendNotification(bookingResult.product.user.userId, {
        message: `Ihr Objekt ${bookingResult.product.title} wurde gebucht`,
        type: NotificationType.BOOKING,
        date: new Date()
      });
    }
    return bookingResult;
  }

  @Put('hand-back/:id')
  async handBackBooking(@Param('id') bookingId: string, @User() user: UserEntity): Promise<void> {
    const success = await this.bookingsService.handBackBooking(bookingId);
    if (!success) {
      throw new NotFoundException();
    } else {
      await this.notificationGateway.sendNotification(success.product.user.userId, {
        message: `Ihr Objekt ${success.product.title} wurde zurückgeben`,
        type: NotificationType.RETURN_PRODUCT,
        date: new Date()
      });
    }
  }

  @Delete(':id')
  async deleteBooking(@Param('id')bookingId: string) {
    return this.bookingsService.deleteBooking(bookingId);
  }

  @Post(':id/ratings')
  async createRating(@Param('id') bookingId: string, @User() user: UserEntity, @Body() rating: RatingPostDto): Promise<RatingEntity> {
    return await this.bookingsService.createRatingForBooking(bookingId, rating, user.userId);
  }
}
