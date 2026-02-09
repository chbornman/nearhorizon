import * as migration_20260209_041417_initial from './20260209_041417_initial';

export const migrations = [
  {
    up: migration_20260209_041417_initial.up,
    down: migration_20260209_041417_initial.down,
    name: '20260209_041417_initial'
  },
];
