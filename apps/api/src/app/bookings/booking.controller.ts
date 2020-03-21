import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingPostDto } from './dto/booking.post.dto';
import { User } from '../shared/user.decorator';
import { UserEntity } from '../entities/user.entity';

@Controller('bookings')
export class BookingController {

  constructor(private readonly bookingsService: BookingService) {
  }

  @Post('')
  async createNewBooking(@Body() createBookingDto: BookingPostDto, @User() user: UserEntity) {
    return this.bookingsService.createNewBooking(createBookingDto, user);
  }

  @Delete(':id')
  async deleteBooking(@Param('id')bookingId: string) {
    return this.bookingsService.deleteBooking(bookingId);
  }
}
