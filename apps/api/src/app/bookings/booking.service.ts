import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingPostDto } from './dto/booking.post.dto';
import { getRepository } from 'typeorm';
import { BookingEntity } from '../entities/booking.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class BookingService {

  constructor() {
  }

  public async getAllBookings(): Promise<BookingEntity[]> {
    return getRepository(BookingEntity).find();
  }

  public async createNewBooking(createBookingDto: BookingPostDto, user: UserEntity): Promise<BookingEntity> {
    const bookingRepository = getRepository(BookingEntity);
    // Todo: Check if booking already exists for date and product
    const booking = new BookingEntity();
    booking.user = user.userId as any;
    booking.product = createBookingDto.productId as any;
    booking.end = createBookingDto.end;
    booking.start = createBookingDto.start;
    return await bookingRepository.save(booking);
  }

  public async handBackBooking(bookingId: string): Promise<boolean> {
    return (await getRepository(BookingEntity).update({ id: bookingId }, { end: new Date() })).affected === 1;
  }

  public async deleteBooking(bookingId: string) {
    const deleteResult = await getRepository(BookingEntity).delete(bookingId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException();
    }
  }
}
