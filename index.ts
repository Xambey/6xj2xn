import { zip, of, from } from 'rxjs';
import { map, tap, scan, delay, switchMap, flatMap, share, reduce, concatMap } from 'rxjs/operators';

let age$ = of<number>(27, 25, 29);
let name$ = of<string>('Foo', 'Bar', 'Beer');
let isDev$ = of<boolean>(true, true, false);

// zip(age$, name$, isDev$).pipe(
//   // tap(([age, name, isDev]) => { 
//   //   console.log({ age, name, isDev });
//   // }),
// )
// .subscribe(x => console.log(x));

var arr = [1, 2, 3, 4];
var t = from(arr);

zip(
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
  ...arr.map(x => of(x).pipe(

    flatMap(x => {
      const arr2 = from([5,6]);
      return zip(
        arr2.pipe(
          tap(f => 'here arr2 before scan ' + f),
          scan((g, v) => {;
            return g.pipe(
              flatMap(x => of(v)),
              tap((f) => console.log('here arr 2' + f))
            );
           }, of({})
          ),
          flatMap(x => x)
        )
      )
    }),
    flatMap(x => x)
  ),
  )
)
.pipe(
  tap(v => console.log('last pipe ')),
  tap(v => console.log(v)),
)
.subscribe(value => {
  console.log(value);
})

// outputs
// { age: 27, name: 'Foo', isDev: true }
// { age: 25, name: 'Bar', isDev: true }
// { age: 29, name: 'Beer', isDev: false }