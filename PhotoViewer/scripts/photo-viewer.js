/// <reference path="entities.js" />

function PhotoViewerPlugin() {
    var self = this;

    self.Photos = ko.observableArray();

    self.init = function (images, selectedIndex) {
        self.Photos(images);
        if (self.Photos() != null && self.Photos() != undefined) self.select(selectedIndex);
        else alert("There are no images to view!");
    };

    self.SelectedImageUrl = ko.computed(function () {
        var selectedImage;
        for (var i in self.Photos()) {
            if (self.Photos()[i].IsSelected()) {
                selectedImage = self.Photos()[i];
                break;
            }
        }
        if (selectedImage != null) return selectedImage.Model().Link();
    });

    self.SelectedImageIndex = ko.computed(function (item) {
        var selectedImage;
        for (var i in self.Photos()) {
            if (self.Photos()[i].IsSelected()) {
                selectedImage = self.Photos()[i];
                break;
            }
        }
        if (selectedImage != null) return self.Photos.indexOf(selectedImage);
        else return -1;
    });

    self.unselect = function () {
        for (var i in self.Photos()) {
            self.Photos()[i].IsSelected(false);
        }
    };

    self.select = function (index) {
        if (index == -1) return;
        if (index > self.Photos().length - 1) return;
        self.unselect();
        self.Photos()[index].IsSelected(true);
    };

    self.canGoNext = ko.computed(function () {
        if (self.SelectedImageIndex() < self.Photos().length - 1) return true;
        else return false;
    });

    self.canGoPrevious = ko.computed(function () {
        if(self.SelectedImageIndex() > 0) return true;
        else return false;
    });

    self.GoNext = function () {
        self.select(self.SelectedImageIndex() + 1);
    };

    self.GoPrevious = function () {
        self.select(self.SelectedImageIndex() - 1);
    };

    self.open = function (images, selectedIndex) {
        $.modal("<div></div>", {
            containerCss: "ChildWindowsBox",
            containerId: "childWindowsWhiteId",
            appendTo: "body",
            minHeight: 610,
            minWidth: 960,
            closeHTML: "<a href='#' class='modalCloseImg' title='Close'></a>",
            onShow: function (dialog) {
                $('#simplemodal-data').load(("modal.html"), function () {
                    self.init(images, selectedIndex);
                    ko.applyBindings(self, document.getElementById("childWindowsWhiteId"));
                });
            },
            onClose: function (dialog) {
                $.modal.close();
            },
        });
    };
};



