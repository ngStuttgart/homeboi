import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingPostDto } from './dto/booking.post.dto';
import { getRepository } from 'typeorm';
import { BookingEntity } from '../entities/booking.entity';
import { UserEntity } from '../entities/user.entity';
import { ProductEntity } from '../entities/product.entity';
import { RatingEntity } from '../entities/rating.entity';
import { RatingPostDto } from './dto/rating.post.dto';

@Injectable()
export class BookingService {

  public async getAllBookings(): Promise<BookingEntity[]> {
    return getRepository(BookingEntity).find({ relations: ['user', 'product', 'rating'] });
  }

  public async createNewBooking(createBookingDto: BookingPostDto, user: UserEntity): Promise<BookingEntity> {
    const bookingRepository = getRepository(BookingEntity);
    // Todo: Check if booking already exists for date and product
    const booking = new BookingEntity();
    booking.user = user.userId as any;
    booking.product = createBookingDto.productId as any;
    booking.end = createBookingDto.end;
    booking.start = createBookingDto.start;
    await this.setProductAvailable(createBookingDto.productId, false);
    return await bookingRepository.save(booking);
  }

  public async handBackBooking(bookingId: string): Promise<boolean> {
    const success = (await getRepository(BookingEntity).update({ id: bookingId }, { end: new Date() })).affected === 1;
    if (success) {
      const productId = (await getRepository(BookingEntity).findOne({
        where: { id: bookingId },
        relations: ['product']
      })).product.id;
      await this.setProductAvailable(productId, true);
      return true;
    } else {
      throw new NotFoundException();
    }
  }

  public async deleteBooking(bookingId: string) {
    const deleteResult = await getRepository(BookingEntity).delete(bookingId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException();
    }
  }

  public async createRatingForBooking(bookingId: string, ratingPostDto: RatingPostDto, userId: string): Promise<RatingEntity> {
    const rating = new RatingEntity();
    rating.value = ratingPostDto.value;
    rating.description = ratingPostDto.description;
    rating.booking = bookingId as any;
    rating.user = userId as any;
    const result = await getRepository(RatingEntity).save(rating);
    await getRepository(BookingEntity).update({ id: bookingId }, { rating: result });
    const user = await getRepository(UserEntity).findOne({ userId });
    user.ratings = [...user.ratings, result];
    await getRepository(UserEntity).save(user);
    return result;
  }

  private async setProductAvailable(productId: string, available: boolean): Promise<void> {
    await getRepository(ProductEntity).update({ id: productId }, { available });
  }
}
