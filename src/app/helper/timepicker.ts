import * as moment from 'moment';

export const generateTimesInterval = (start: number, end: number, minutesInterval: number): Array<string> => {
    const times = [];

    for (let hour = start; hour <= end; hour++) {
        for (let minute = 0; minute < 60; minute += minutesInterval) {
            times.push(moment({ hour, minute }).format('HH:mm'));
        }

    }

    return times;
};
