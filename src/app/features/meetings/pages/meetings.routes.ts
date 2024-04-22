import { Routes } from '@angular/router';

export const meeting_routes: Routes = [
    {
        path: 'create',
        loadComponent: () =>
          import('./create-meeting/create-meeting.component').then(
            (m) => m.CreateMeetingComponent
          ),
      },
]