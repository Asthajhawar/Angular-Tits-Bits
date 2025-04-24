import { Component, computed, DestroyRef, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  // // userId = input.required<string>();
  // // @Input({required:true}) userId!:string;
  // userName = '';
  // private usersService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  // // userName = computed(
  // //   () => this.usersService.users.find((u) => u.id === this.userId())?.name
  // // );
  // // set userId(uid:string){....}

  // ngOnInit(): void {
  //   console.log(this.activatedRoute);
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.userName =
  //         this.usersService.users.find((u) => u.id === paramMap.get('userId'))
  //           ?.name || '';
  //     },
  //   });

  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }

  // RESOLVING ROUTE RELATED DYNAMIC DATA
  userName = input.required<string>();
  message = input.required<string>();

  // ACCESS ROUTE DATA WITHOUT INPUTS
  // private activatedRoute = inject(ActivatedRoute);

  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next: data => {
  //       console.log(data);
  //     }
  //   })
  // }
}
// RESOLVING ROUTE RELATED DYNAMIC DATA
export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
  return userName;
};

// // RESOLVING ROUTE RELATED DYNAMIC DATA BY CLASS METHOD
// @Injectable({providedIn:'root'})
// export class UserNameResolver implements Resolve<string>{
//   constructor(private userService:UsersService){}
//   resolve(activatedRoute:ActivatedRouteSnapshot,state:RouterStateSnapshot){
//     const userName = this.userService.users.find((u)=>u.id === activatedRoute.paramMap.get('userId')?.name || "");
//     return userName;
//   }
// }

// RESOLVE TITLE
export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  routerState
) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks";
};
