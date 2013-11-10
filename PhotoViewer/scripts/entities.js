//It is highly debatable if we need to declare ImageModel properties as observable!!! Is the image model editable? Can something change in the lifetime of an image?
//I want you to think of what means observable in terms of client-side performance. There are many situation when we don't need to use observable instead simple
//Javascript objects.

function ImageModel() {
    var self = this;
    self.Id = ko.observable();
    self.Link = ko.observable();
    self.init = function (data) {
        self.Id(data.Id);
        self.Link(data.Link);
    };
};

function ImageViewModel() {
    var self = this;
    self.Model = ko.observable(new ImageModel());
    self.init = function (data) {
        var img = new ImageModel();
        img.init(data);
        self.Model(img);
        self.IsSelected(false);
    };
    self.IsSelected = ko.observable();
};