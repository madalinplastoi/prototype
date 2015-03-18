/// <reference path="../jquery/jquery.d.ts"/>

interface TouchSpinOptions {
    min?: number;
    max?: number;
    step?: number;
    decimals?: number;
    boostat?: number;
    maxboostedstep?: number;
}

interface JQuery {
    TouchSpin(options?:TouchSpinOptions): JQuery;
}