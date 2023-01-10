
import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/services/data-types';
export const SetUser = createAction('[user] Set user', props<{ user: User }>());
