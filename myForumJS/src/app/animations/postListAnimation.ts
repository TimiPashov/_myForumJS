import {
    animate,
    query,
    stagger,
    style,
    transition,
  } from '@angular/animations';

export function listAnimation(){
    return [
        transition('* <=> *', [
          query(
            ':enter',
            [
              style({ opacity: 0, transform: 'scale(0.7)' }),
              stagger(80, [
                animate(
                  '250ms ease-in',
                  style({ opacity: 1, transform: 'scale(1)' }),
                ),
              ]),
            ],
            { optional: true },
          ),
        ]),
      ]
}