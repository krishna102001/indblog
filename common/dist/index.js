"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdateInput = exports.blogCreateInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    name: (0, zod_1.string)(),
    email: (0, zod_1.string)().email(),
    password: (0, zod_1.string)().min(6).max(20),
});
exports.signinInput = zod_1.z.object({
    email: (0, zod_1.string)().email(),
    password: (0, zod_1.string)(),
});
exports.blogCreateInput = zod_1.z.object({
    title: (0, zod_1.string)(),
    content: (0, zod_1.string)(),
});
exports.blogUpdateInput = zod_1.z.object({
    title: (0, zod_1.string)().optional(),
    content: (0, zod_1.string)().optional(),
});
