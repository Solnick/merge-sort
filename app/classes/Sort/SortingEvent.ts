import { Record } from '../Record';
import { events } from '../../constants';

export interface SortingEvent {
    firstFileRecord: Record;
    secondFileRecord: Record;
    event: events;
}
