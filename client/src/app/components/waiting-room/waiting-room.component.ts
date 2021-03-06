import { Component, Input, OnInit, HostListener } from '@angular/core'
import { Room, Player } from '../../types'
import { I18nService } from '../../services/i18n.service'

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss'],
})
export class WaitingRoomComponent implements OnInit {
  @Input() callBackShuffle: () => void
  @Input() callBackStart: () => void
  @Input() room: Room
  @Input() player: Player
  @Input() startBtnDisableClass: string

  positions = ['left-top', 'right-top', 'left-bottom', 'right-bottom']
  infinityBadge: string
  itemBadge: string
  scrambleBadge: string
  isMobile: boolean

  constructor(public i18n: I18nService) {}

  ngOnInit(): void {
    //
    this.isMobile = document.documentElement.clientWidth < 769
    this.infinityBadge = this.room.mode.infinity ? 'infinity' : 'limited'
    this.itemBadge = 'item'
    this.scrambleBadge = this.room.mode.scramble ? 'scramble' : 'normal'
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = document.documentElement.clientWidth < 769
  }
}
