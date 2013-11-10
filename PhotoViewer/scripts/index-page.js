/// <reference path="entities.js" />
/// <reference path="photo-viewer.js" />

function Page() {
    var self = this;

    //In this POC we assume this is initialized when page loads and does not change over time (we load image from somewhere: disk/file/http get from db/etc.). 
    //If this not changes it means we don't need it defined as an observable array!!! http://knockoutjs.com/documentation/observableArrays.html 
    //We use simple Javascript array. 
    self.ImageCollection1 = [];

    //This is a plugin instance; page component will only open/close the plugin. As we pass all images to the plugin we don't need to declare this as observable!!!
    //We will use instead a simple Javascript object.
    self.PhotoViewer = new PhotoViewerPlugin();

    self.init = function (images1) {
        if (images1 != null) {
            for (var i in images1)
            {
                var vm = new ImageViewModel();
                vm.init(images1[i]);
                self.ImageCollection1.push(vm);
            }
        };
    };

    self.OpenGallery = function (item) {
        self.PhotoViewer.open(self.ImageCollection1, self.ImageCollection1.indexOf(item));
    };
};