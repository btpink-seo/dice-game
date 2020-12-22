import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Player } from '../types'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiBaseUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) {}

  createPlayer(player: Player): Observable<Player> {
    return this.http
      .post<Player>(`${this.apiBaseUrl}/players`, player)
      .pipe(catchError(this.handleError<Player>(`postPlayer`)))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      console.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }
}
