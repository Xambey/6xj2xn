import { zip, of, from, combineLatest, merge, concat, forkJoin } from 'rxjs';
import { map, tap, scan, delay, switchMap, flatMap, share, reduce, concatMap, combineAll, mergeAll } from 'rxjs/operators';

let age$ = of<number>(27, 25, 29);
let name$ = of<string>('Foo', 'Bar', 'Beer');
let isDev$ = of<boolean>(true, true, false);

// zip(age$, name$, isDev$).pipe(
//   // tap(([age, name, isDev]) => { 
//   //   console.log({ age, name, isDev });
//   // }),
// )
// .subscribe(x => console.log(x));

var dtos = [1, 2, 3, 4];
var t = from(dtos);

forkJoin(
  // t.pipe(
  //   concatMap(x => of(x)),
  //   scan((g, v) => {;
  //       return g.pipe(
  //         flatMap(x => of(v)),
  //         tap((f) => console.log('here ' + f))
  //       );
      
  //     }, of({})
  //   ),
  //   concatMap(x => x)
  // ),
  dtos.map(x => of(x).pipe(
    tap(dto => console.log('dto ' + dto)),
    flatMap(x => {
      const system_actions = from(["one action", "two action", "three action"]);
      return forkJoin(
        system_actions.pipe(
          tap(f => 'before scan ' + f),
          switchMap(x => of(x).pipe(
            scan((g, v) => {;
            return g.pipe(
                flatMap(x => of(v)),
                tap((f) => console.log('system action - ' + f))
              );
            }, of({})
            )
          )),
          switchMap(x => x)
        )
      ).pipe(
        switchMap(x => x),
        tap(v => console.log(`after zip: ${JSON.stringify(v)}`))
      )
    })
  ),
  )
)
.subscribe(value => {
  console.log(`Subscribe: ${JSON.stringify(value)}`);
})

// outputs
// { age: 27, name: 'Foo', isDev: true }
// { age: 25, name: 'Bar', isDev: true }
// { age: 29, name: 'Beer', isDev: false }