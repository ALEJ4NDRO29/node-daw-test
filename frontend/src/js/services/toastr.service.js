export default class Toastr {
    constructor(toastr) {
        'ngInject';
        this._toastr = toastr;
    }

    success(msg) {
        this._toastr.success(msg);
    }

    info(msg) {
        this._toastr.info(msg);
    }

    warning(msg) {
        this._toastr.warning(msg);
    }

    error(msg) {
        this._toastr.error(msg);
    }

}