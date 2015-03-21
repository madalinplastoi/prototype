declare module 'domain' {
    class User {
        public _id:string;
        public name:string;
        public email:string;
        public username:string;
        public password:string;
        public rememberMe:boolean;
        public lastAccessOn:Date;

        constructor();
    }
    class Article {
        public Id:string;
        public Title:string;
        public Text:string;
        public Url:string;
        public Active:boolean;
        public CreatedOn:string;

        constructor();
    }
}