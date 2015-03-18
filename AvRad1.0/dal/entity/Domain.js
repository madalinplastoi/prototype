var domain = {};
(function (rootNamespace) {
    var User = function () {
        function User() {
            this.Id = '';
            this.Name = '';
            this.Email = '';
            this.Username = '';
            this.Password = '';
            this.RememberMe = false;
            this.LastAccessOn = null;

            return this;
        }

        return User;
    }();

    var Article = (function () {
        function Article() {
            this.Id = '';
            this.Title = '';
            this.Text = '';
            this.Url = '';
            this.Active = false;
            this.CreatedOn = null;

            return this;
        }

        return Article;
    })();

    domain.User = User;
    domain.Article = Article;
})(domain || (domain = {}));

if(typeof(exports) !== 'undefined' && exports !== null) {
    exports.domain = domain;
}

