"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SymptomsService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var SymptomsService = /** @class */ (function () {
    function SymptomsService(http) {
        this.http = http;
        this.symptom = "http://127.0.0.1:5000/get_all_symptoms";
    }
    SymptomsService.prototype.ngOnInit = function () {
    };
    SymptomsService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return rxjs_1.of(result);
        };
    };
    SymptomsService.prototype.readAllSymps = function () {
        var x = this.http.get(this.symptom[0]);
        console.log(x);
        console.log(x);
        return this.http.get(JSON.parse(this.symptom[0]))
            .pipe(operators_1.catchError(this.handleError('getSymptoms', [])));
    };
    SymptomsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SymptomsService);
    return SymptomsService;
}());
exports.SymptomsService = SymptomsService;
