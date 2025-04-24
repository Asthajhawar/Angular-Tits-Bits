import { Component, inject, Injectable } from '@angular/core';
import { TaskComponent } from './tasks/task/task.component';
import {
  CanMatch,
  CanMatchFn,
  GuardResult,
  MaybeAsync,
  RedirectCommand,
  Route,
  Router,
  Routes,
  UrlSegment,
} from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as userRoutes } from './users/users.routes';

// ROUTE GUARDS
const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.5) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

// // CLASS BASED GUARDS
// @Injectable({providedIn:'root'})
// class CanMatchTeamSection implements CanMatch {
//     constructor(private router:Router){}
//     canMatch(route: Route, segments: UrlSegment[]) {
//         const shouldGetAccess = Math.random();
//         if(shouldGetAccess < 0.5){
//             return true;
//         }
//         return new RedirectCommand(this.router.parseUrl('/unauthorized'));
//     }
// }

export const routes: Routes = [
  {
    path: '', // <your-domain>/
    component: NoTaskComponent,
    // redirectTo: '/users/u1',
    // pathMatch: 'full'
    title: 'No task selected',
  },
  //   {
  //     path: 'users/:userId', // <your-domain>/users/<uid>
  //     component: UserTasksComponent,
  //     children: [
  //       {
  //         path: '',
  //         redirectTo: 'tasks',
  //         pathMatch: 'full',
  //       },
  //       {
  //         path: 'tasks', // <your-domain>/users/<uid>/tasks
  //         component: TasksComponent,
  //       },
  //       {
  //         path: 'tasks/new',
  //         component: NewTaskComponent,
  //       },
  //     ],
  //   },
  {
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    children: userRoutes,
    canMatch: [dummyCanMatch],
    data: {
      message: 'Hello!',
    },
    resolve: {
      userName: resolveUserName,
    },
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
