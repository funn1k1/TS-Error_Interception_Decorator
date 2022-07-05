"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class UserService {
    constructor() {
        this.users = 1000;
    }
    getUsersInDatabase() {
        throw new Error('Some error');
    }
}
__decorate([
    Catch({ rethrow: true })
], UserService.prototype, "getUsersInDatabase", null);
function Catch({ rethrow } = { rethrow: true }) {
    return (target, _, descriptor) => {
        const oldMethod = descriptor.value;
        descriptor.value = (...args) => {
            try {
                return oldMethod === null || oldMethod === void 0 ? void 0 : oldMethod.apply(target, args);
            }
            catch (err) {
                if (err instanceof Error) {
                    console.log(err.message);
                    if (rethrow) {
                        throw err;
                    }
                }
            }
        };
    };
}
console.log(new UserService().getUsersInDatabase());
