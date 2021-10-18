export class Customer {
    constructor(
        public customerNumber: string,
        public userName: string,
        public deleted: boolean,
        public gender: string,
        public title: string,
        public firstName: string,
        public lastName: string,
        public birthdate: Date,
        public ssn: string,
        public email: string,
        public occupation: string,
        public password: string
    ) { }
}

export const KEYS = ['customerNumber', 'userName', 'deleted', 'gender', 'title',
    'firstName', 'lastName', 'birthdate', 'ssn', 'email', 'occupation', 'password'];
