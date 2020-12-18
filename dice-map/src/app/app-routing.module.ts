import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HowToPlayComponent } from './views/how-to-play/how-to-play.component';
import { NewRoomComponent } from './views/new-room/new-room.component';
import { RoomComponent } from './views/room/room.component';
import { RoomsComponent } from './views/rooms/rooms.component';
import { WaitingRoomComponent } from './views/waiting-room/waiting-room.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'rooms/new', component: NewRoomComponent },
  { path: 'rooms/:id', component: RoomComponent },
  { path: 'waiting/rooms/:id', component: WaitingRoomComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'how-to-play', component: HowToPlayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
