import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingPostDto } from './dto/booking.post.dto';
import { User } from '../shared/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { BookingEntity } from '../entities/booking.entity';

@Controller('bookings')
export class BookingController {

  constructor(private readonly bookingsService: BookingService) {
  }

  @Get('')
  async getAllBookings(): Promise<BookingEntity[]> {
    return this.bookingsService.getAllBookings();
  }

  @Post('')
  async createNewBooking(@Body() createBookingDto: BookingPostDto, @User() user: UserEntity) {
    return this.bookingsService.createNewBooking(createBookingDto, user);
  }

  @Put('hand-back/:id')
  async handBackBooking(@Param('id') bookingId: string): Promise<void> {
    const success = await this.bookingsService.handBackBooking(bookingId);
    if (!success) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  async deleteBooking(@Param('id')bookingId: string) {
    return this.bookingsService.deleteBooking(bookingId);
  }
}
