export class FICUser {
    constructor(
        public cpNumber: string,
        public ficUser: string,
        public deleted: boolean,
        public gender: string,
        public title: string,
        public firstName: string,
        public lastName: string,
        public birthdate: Date,
        public ssn: string,
        public email: string,
        public occupation: string,
        public ficPassword: string
    ) { }
}

export const KEYS = ['cpNumber', 'ficUser', 'deleted', 'gender', 'title',
    'firstName', 'lastName', 'birthdate', 'ssn', 'email', 'occupation', 'ficPassword'];
