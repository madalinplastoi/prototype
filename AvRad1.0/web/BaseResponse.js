function BaseResponse(){
    this.isSuccess = false;
    this.message = '';
    this.value = null;
}

BaseResponse.prototype.setIsSuccess = function(isSuccess){
    this.isSuccess = isSuccess;
}

BaseResponse.prototype.setMessage = function(message){
    this.message = message;
}

BaseResponse.prototype.setValue = function(value){
    this.value = value;
}

module.exports = BaseResponse;