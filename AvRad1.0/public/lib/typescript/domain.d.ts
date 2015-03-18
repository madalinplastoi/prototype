declare module 'domain' {
    class User {
        public Id:string;
        public Name:string;
        public Email:string;
        public Username:string;
        public Password:string;
        public RememberMe:boolean;
        public LastAccessOn:string;

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