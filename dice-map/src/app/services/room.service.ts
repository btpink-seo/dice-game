import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Room } from '../types';
import { API_ENDPOINT } from '../endpoints';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.http
      .get<Room[]>(`${API_ENDPOINT}/rooms`)
      .pipe(catchError(this.handleError('getRooms', [])));
  }

  getRoom(id: number): Observable<Room> {
    return this.http
      .get<Room>(`${API_ENDPOINT}/rooms/${id}`)
      .pipe(catchError(this.handleError<Room>(`getRoom  id=${id}`)));
  }

  createRoom(room: Room): Observable<Room> {
    return this.http
      .post<Room>(`${API_ENDPOINT}/rooms`, room)
      .pipe(catchError(this.handleError<Room>(`postRoom`)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
