"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productFilterableFields = exports.productSearchableFields = exports.BrandName = exports.label = exports.deliveryTime = exports.BrandEnum = exports.LabelEnum = exports.DeliveryTimeEnum = void 0;
/* eslint-disable no-unused-vars */
var DeliveryTimeEnum;
(function (DeliveryTimeEnum) {
    DeliveryTimeEnum["TwoDays"] = "1 day to 3 days";
    DeliveryTimeEnum["AroundWeek"] = "7 days to 8 days";
    DeliveryTimeEnum["AroundMonth"] = "23 days to 28 days";
})(DeliveryTimeEnum = exports.DeliveryTimeEnum || (exports.DeliveryTimeEnum = {}));
var LabelEnum;
(function (LabelEnum) {
    LabelEnum["Available"] = "available";
    LabelEnum["StockOut"] = "stock out";
})(LabelEnum = exports.LabelEnum || (exports.LabelEnum = {}));
var BrandEnum;
(function (BrandEnum) {
    BrandEnum["Nike"] = "nike";
    BrandEnum["Adidas"] = "adidas";
    BrandEnum["Puma"] = "puma";
})(BrandEnum = exports.BrandEnum || (exports.BrandEnum = {}));
exports.deliveryTime = [
    '1 day to 3 days',
    '7 days to 8 days',
    '23 days to 28 days',
];
exports.label = ['available', 'stock out'];
exports.BrandName = ['nike', 'adidas', 'puma'];
exports.productSearchableFields = ['name', 'location'];
exports.productFilterableFields = [
    'searchTerm',
    'id',
    'location',
    'breed',
    'label',
    'category',
];
