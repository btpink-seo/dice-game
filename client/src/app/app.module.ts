import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { PlayRoomComponent } from './views/play-room/play-room.component'
import { DashboardComponent } from './views/dashboard/dashboard.component'
import { NewRoomComponent } from './views/new-room/new-room.component'
import { RoomsComponent } from './views/rooms/rooms.component'
import { HowToPlayComponent } from './views/how-to-play/how-to-play.component'
import { PlayerEditModalComponent } from './components/player-edit-modal/player-edit-modal.component'
import { DashboardButtonComponent } from './components/dashboard-button/dashboard-button.component'
import { DiceComponent } from './components/dice/dice.component'
import { ViewDiceComponent } from './components/view-dice/view-dice.component'
import { LoginComponent } from './views/login/login.component'
import { UserInfoComponent } from './components/user-info/user-info.component'
import { SelectPieceComponent } from './components/select-piece/select-piece.component'
import { HeaderComponent } from './components/header/header.component'
import { ChatComponent } from './components/chat/chat.component'
import { ChatMessageComponent } from './components/chat-message/chat-message.component'
import { PlayerStatusComponent } from './components/player-status/player-status.component'
import { CardComponent } from './components/card/card.component'
import { DiceBoardComponent } from './components/dice-board/dice-board.component'

@NgModule({
  declarations: [
    AppComponent,
    PlayRoomComponent,
    DashboardComponent,
    NewRoomComponent,
    RoomsComponent,
    HowToPlayComponent,
    PlayerEditModalComponent,
    DashboardButtonComponent,
    DiceComponent,
    ViewDiceComponent,
    LoginComponent,
    UserInfoComponent,
    SelectPieceComponent,
    HeaderComponent,
    ChatComponent,
    ChatMessageComponent,
    PlayerStatusComponent,
    CardComponent,
    DiceBoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
