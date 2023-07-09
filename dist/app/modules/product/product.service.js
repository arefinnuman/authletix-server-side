"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../handlingError/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const seller_model_1 = require("../seller/seller.model");
const users_model_1 = require("../user/users.model");
const product_constant_1 = require("./product.constant");
const product_model_1 = require("./product.model");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.label = product_constant_1.LabelEnum.Available;
    const product = yield product_model_1.Product.create(payload);
    const result = yield (yield product.populate('category')).populate('seller');
    return result;
});
const getProduct = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: product_constant_1.productSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.PaginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0
        ? {
            $and: andConditions,
        }
        : {};
    const result = yield product_model_1.Product.find(whereConditions)
        .populate('seller')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield product_model_1.Product.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id).populate('seller');
    if (!result) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `Product (${id}) not found`);
    }
    return result;
});
const updateProduct = (id, userEmail, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findOne({ email: userEmail });
    const product = yield product_model_1.Product.findOne({ _id: id });
    if (!product)
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `Product not found`);
    if ((user === null || user === void 0 ? void 0 : user.role) === 'admin') {
        const result = yield product_model_1.Product.findOneAndUpdate({ _id: id }, payload, {
            new: true,
        }).populate('seller');
        return result;
    }
    else {
        if (!user)
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, `User not found`);
        const seller = yield seller_model_1.Seller.findOne({ _id: user === null || user === void 0 ? void 0 : user.seller });
        if (!seller)
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, `Seller not found`);
        const sellerEmail = seller === null || seller === void 0 ? void 0 : seller.email;
        if (sellerEmail === userEmail) {
            const result = yield product_model_1.Product.findOneAndUpdate({ _id: id }, payload, {
                new: true,
            }).populate('seller');
            return result;
        }
        else {
            throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to update this product');
        }
    }
});
const deleteProduct = (id, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findOne({ _id: id });
    if (!product)
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `Product not found`);
    const user = yield users_model_1.User.findOne({ email: userEmail });
    if (!user)
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `User not found`);
    let result;
    if ((user === null || user === void 0 ? void 0 : user.role) === 'admin') {
        result = yield product_model_1.Product.findOneAndDelete({ _id: id }, { new: true });
    }
    else {
        const seller = yield seller_model_1.Seller.findOne({ _id: user === null || user === void 0 ? void 0 : user.seller });
        if (!seller)
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, `Seller not found`);
        const sellerEmail = seller === null || seller === void 0 ? void 0 : seller.email;
        if (sellerEmail === userEmail) {
            result = yield product_model_1.Product.findOneAndDelete({ _id: id }, { new: true });
        }
        else {
            throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to delete this product');
        }
    }
    return result;
});
exports.ProductService = {
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getProduct,
};
