var domain = {};
(function (rootNamespace) {
    var User = function () {
        function User() {
            this._id = '';
            this.name = '';
            this.email = '';
            this.username = '';
            this.password = '';
            this.rememberMe = '';
            this.lastAccessOn = new Date();

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

