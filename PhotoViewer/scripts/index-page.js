/// <reference path="entities.js" />
/// <reference path="photo-viewer.js" />

function Page() {
    var self = this;

    //In this POC we assume this is initialized when page loads and does not change over time (we load image from somewhere: disk/file/http get from db/etc.). 
    //If this not changes it means we don't need it defined as an observable array!!! http://knockoutjs.com/documentation/observableArrays.html 
    //We use simple Javascript array. 
    //self.ImageCollection1 = [];

    self.AllImages = [];

    //This is a plugin instance; page component will only open/close the plugin. As we pass all images to the plugin we don't need to declare this as observable!!!
    //We will use instead a simple Javascript object.
    self.PhotoViewer = new PhotoViewerPlugin();

    self.init = function (allImages) {
        if (allImages != null) {
            for (var i in allImages)
            {
                var temp = [];
                for (var j in allImages[i]) {
                    var vm = new ImageViewModel();
                    vm.init(allImages[i][j]);
                    temp.push(vm);
                }
                self.AllImages.push(temp);
            }
        };
    };

    self.open = function (images, selected) {
        self.PhotoViewer.open(images, images.indexOf(selected));
    };
};