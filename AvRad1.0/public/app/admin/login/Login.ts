///<reference path='../../../lib/typescript/jquery/jquery.d.ts'/>
///<reference path='../../../lib/typescript/knockout/knockout.d.ts'/>
///<reference path='../../../lib/typescript/toastr/toastr.d.ts'/>
///<reference path='../../../lib/typescript/knockout/knockout.mapping.d.ts'/>
///<reference path='../../../lib/typescript/domain.d.ts'/>
///<reference path='../../utils/AjaxUtils.ts'/>

import AjaxUtils = require('./../../utils/AjaxUtils');
import domain = require('domain');

declare var $: JQueryStatic;
declare var ko: KnockoutStatic;
declare var toastr: Toastr;

export class Login {
    public vm:KnockoutObservable<domain.User>;

    constructor() {
        debugger;
        var m = new domain.User();
        this.vm = ko.observable(ko.mapping.fromJS(m));
    }

    doLogin():void {
        //@todo: impl validation
        AjaxUtils.AjaxUtils.doJSONPostWithLoad(this.vm(), '/login',
            (data:any)=> {
                //@todo: handle success
                toastr.success(JSON.stringify(data),'Success');
            },
            (error:any)=> {
                toastr.error(error.statusText, 'Server response error', {closeButton: true, timeOut: 0, extendedTimeOut: 0});
            })
    }

    activate() {
        ko.applyBindings(this, document.getElementById('page-wrapper'))
    }
}
