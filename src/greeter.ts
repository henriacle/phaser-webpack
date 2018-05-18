import Person from './person.interface';
import * as phaser from 'phaser';

class Student {
    fullName: string;
    constructor(
        public firstName: string,
        public middleName: string,
        public lastName: string
    ) {
        this.fullName = firstName + " " + middleName + " " + lastName;
    }

    greeter() {
        return `Hello ${this.firstName} ${this.lastName}`;
    }
}

export default Student;