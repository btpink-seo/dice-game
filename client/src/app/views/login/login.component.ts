import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { PlayerService } from '../../services/player.service'
import { Player } from '../../types'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  player: Player

  private playerId = localStorage.getItem('pId')

  constructor(private router: Router, private playerService: PlayerService) {
    if (this.playerId) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    this.player = {
      _roomId: 0,
      name: '',
      coordinates: [0, 0],
      piece: faTimes,
      cards: [],
      life: 3,
    }
  }

  onSubmit(form: Player): void {
    this.playerService.createPlayer(form).subscribe((res) => {
      localStorage.setItem('pId', res._id)
      this.router.navigate(['/'])
    })
  }
}