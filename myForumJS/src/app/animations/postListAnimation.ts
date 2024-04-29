import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export function listAnimation() {
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
  ];
}

export function elementAnimation() {
  return [
    transition('void => *', [
      style({
        height: 0,
        opacity: 0,
        transform: 'scale(0.8)',
        'margin-bottom': 0,
        padding: 0,
      }),
      animate(
        '150ms',
        style({
          height: '*',
          'margin-bottom': '*',
          padding: '*',
        }),
      ),
      animate(70),
    ]),
  ];
}

export function logoAnimation() {
  return trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('1s ease-in', style({ opacity: 1 })),
    ]),
  ]);
}
