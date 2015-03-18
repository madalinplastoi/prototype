///<reference path='../../lib/typescript/jquery/jquery.d.ts'/>

declare var $:JQueryStatic;

export class AjaxUtils {
    static ajaxLoad(elmName:string):void {
        $(elmName).append('<div id="loading">Loading...</div>');
    }

    static ajaxDone(elmName:string):void {
        $("#loading").remove();
    }

    static doJSONPostWithLoad(model:any, url:string, successFunction:(data)=>void, errorFunction:(error)=>void):void {
        $.ajax({
            url: url,
            type: 'POST',
            data: ko.mapping.toJSON(model),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                AjaxUtils.ajaxLoad("html");
            },
            success: function (data) {
                if (successFunction) successFunction(data);
            },
            error: function (error) {
                if (errorFunction) errorFunction(error);
            },
            complete: function () {
                AjaxUtils.ajaxDone("html");
            }
        });
    }

    static doJSONGetWithLoad(url:string, successFunction:(data)=>void, errorFunction:(error)=>void):void {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            beforeSend: function () {
                AjaxUtils.ajaxLoad("html");
            },
            success: function (data) {
                if (successFunction) successFunction(data);
            },
            error: function (error) {
                if (errorFunction) errorFunction(error);
            },
            complete: function () {
                AjaxUtils.ajaxDone("html");
            }
        });
    }
}