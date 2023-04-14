import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent implements OnInit {
  availableSeats = 80;
  seatsToBook = 0;
  errorMsg = '';
  bookingSuccess = '';
  coachFull = false;
  seats: { seatNumber: number; booked: boolean }[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  bookSeats() {
    if (this.seatsToBook > 0) {
      if (this.seatsToBook > 7) {
        this.errorMsg = 'You can book up to 7 seats at a time.';
      } else {
        this.errorMsg = '';
        let bookked = false;
        let bookedSeats: number[] = [];
        // Check for consecutive available seats in one row
        // for (let i = 0; i < 80; i += 7) {
        //   if (this.checkConsecutiveSeats(i, this.seatsToBook)) {
        //     this.availableSeats -= this.seatsToBook;
        //     this.bookingSuccess = `Seats booked successfully in row ${Math.floor(
        //       i / 7
        //     ) + 1}`;
        //     booked = true;
        //     break;
        //   }
        // }

        for (let i = 0; i < 80; i += 7) {
          if (this.checkConsecutiveSeats(i, this.seatsToBook)) {
            for (let j = i; j < i + this.seatsToBook; j++) {
              this.seats[j].booked = true;
              bookedSeats.push(j + 1);
            }
            this.availableSeats -= this.seatsToBook;
            break;
          }
        }

        if (bookedSeats.length === 0) {
          // Check for nearby available seats
          for (let i = 0; i < 80; i++) {
            if (this.checkNearbySeats(i, this.seatsToBook)) {
              for (let j = i; j < i + this.seatsToBook; j++) {
                this.seats[j].booked = true;
                bookedSeats.push(j + 1);
              }
            }
          }
        }
        if (!bookked) {
          // Check for nearby available seats
          for (let i = 0; i < 80; i++) {
            if (this.checkNearbySeats(i, this.seatsToBook)) {
              this.availableSeats -= this.seatsToBook;
              this.bookingSuccess = `Seats booked successfully in nearby seats.`;
              bookked = true;
              break;
            }
          }
        }
        if (!bookked) {
          this.errorMsg = 'No seats available.';
        }
      }
    }
  }

  checkConsecutiveSeats(start: number, numSeats: number): boolean {
    // Check if consecutive seats are available in one row
    for (let i = start; i < start + numSeats; i++) {
      if (i >= 80 || i % 7 === 3) {
        return false;
      }
    }
    return true;
  }

  checkNearbySeats(start: number, numSeats: number): boolean {
    // Check if nearby seats are available
    for (let i = start; i < start + numSeats; i++) {
      if (i >= 80 || this.checkConsecutiveSeats(i - (i % 7), numSeats)) {
        return false;
      }
    }
    return true;
  }

  stopBooking() {
    this.coachFull = true;
  }
}

