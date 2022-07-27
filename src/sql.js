"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Sql = void 0;
function makeRawToken(s) {
    function rawToken() {
        return s;
    }
    return rawToken;
}
var DEFAULT = makeRawToken("DEFAULT");
var NULL = makeRawToken("NULL");
var stringFormat = function (s) {
    var varargs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        varargs[_i - 1] = arguments[_i];
    }
    var status = 0;
    var res = [];
    var j = -1;
    for (var i = 0; i < s.length; i++) {
        var c = s[i];
        if (c === "%") {
            if (status === 0) {
                status = 1;
            }
            else if (status === 1) {
                status = 0;
                res.push("%");
            }
        }
        else if (c === "s" && status === 1) {
            j = j + 1;
            res.push(varargs[j]);
            status = 0;
        }
        else {
            res.push(c);
        }
    }
    return res.join("");
};
function _prefixWithV(column) {
    return "V." + column;
}
function _escapeFactory(isLiteral, isBracket) {
    function asSqlToken(value) {
        if ("string" === typeof value) {
            if (isLiteral) {
                return "'" + value.replaceAll("'", "''") + "'";
            }
            else {
                return value;
            }
        }
        else if ("number" === typeof value || "bigint" === typeof value) {
            return String(value);
        }
        else if ("boolean" === typeof value) {
            return value === true ? "TRUE" : "FALSE";
        }
        else if ("function" === typeof value) {
            return value();
        }
        else if (null === value) {
            return "NULL";
        }
        else if (value instanceof Sql) {
            return "(" + value.statement() + ")";
        }
        else if (Array.isArray(value)) {
            if (value.length === 0) {
                throw new Error("empty array as Sql value is not allowed");
            }
            var token = value.map(asSqlToken).join(", ");
            if (isBracket) {
                return "(" + token + ")";
            }
            else {
                return token;
            }
        }
        else {
            throw new Error("don't know how to escape value: " + value + " (" + typeof value + ")");
        }
    }
    return asSqlToken;
}
var asLiteral = _escapeFactory(true, true);
var asToken = _escapeFactory(false, false);
function getCteReturningValues(opts) {
    var e_1, _a, e_2, _b;
    var values = [];
    try {
        for (var _c = __values(opts.columns), _d = _c.next(); !_d.done; _d = _c.next()) {
            var col = _d.value;
            values.push(asToken(col));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (opts.literals) {
        try {
            for (var _e = __values(opts.literals), _f = _e.next(); !_f.done; _f = _e.next()) {
                var e = _f.value;
                values.push(asLiteral(e));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return values;
}
function getReturningToken(opts) {
    if (opts.cteReturning) {
        return " RETURNING " + asToken(getCteReturningValues(opts.cteReturning));
    }
    else if (opts.returning) {
        return " RETURNING " + opts.returning;
    }
    else {
        return "";
    }
}
function assembleSql(opts) {
    var statement;
    if (opts.update) {
        var from = (opts.from && " FROM " + opts.from) || "";
        var where = (opts.where && " WHERE " + opts.where) || "";
        var returning = getReturningToken(opts);
        statement = "UPDATE " + opts.tableName + " SET " + opts.update + from + where + returning;
    }
    else if (opts.insert) {
        var returning = getReturningToken(opts);
        statement = "INSERT INTO " + opts.tableName + " " + opts.insert + returning;
    }
    else if (opts["delete"]) {
        var using = (opts.using && " USING " + opts.using) || "";
        var where = (opts.where && " WHERE " + opts.where) || "";
        var returning = getReturningToken(opts);
        statement = "DELETE FROM " + opts.tableName + " " + using + where + returning;
    }
    else {
        var from = opts.from || opts.tableName;
        var where = (opts.where && " WHERE " + opts.where) || "";
        var group = (opts.group && " GROUP BY " + opts.group) || "";
        var having = (opts.having && " HAVING " + opts.having) || "";
        var order = (opts.order && " ORDER BY " + opts.order) || "";
        var limit = (opts.limit && " LIMIT " + opts.limit) || "";
        var offset = (opts.offset && " OFFSET " + opts.offset) || "";
        statement = "SELECT " + ((opts.distinct && "DISTINCT ") || "") + (opts.select || "*") + " FROM " + from + where + group + having + order + limit + offset;
    }
    return (opts["with"] && "WITH " + opts["with"] + " " + statement) || statement;
}
var Sql = /** @class */ (function () {
    function Sql(tableName) {
        this.tableName = tableName;
    }
    Sql["new"] = function (tableName) {
        return new this(tableName);
    };
    Sql.prototype.toString = function () {
        return this.statement();
    };
    Sql.prototype.error = function (errMsg) {
        if (typeof errMsg == "string") {
            throw new Error(errMsg);
        }
        else if (errMsg instanceof Error) {
            throw errMsg;
        }
        else {
            throw errMsg;
        }
    };
    Sql.prototype._getKeys = function (rows) {
        var e_3, _a, e_4, _b, e_5, _c;
        var columns = [];
        if (rows instanceof Array) {
            var d = {};
            try {
                for (var rows_1 = __values(rows), rows_1_1 = rows_1.next(); !rows_1_1.done; rows_1_1 = rows_1.next()) {
                    var row = rows_1_1.value;
                    try {
                        for (var _d = (e_4 = void 0, __values(Object.keys(row))), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var k = _e.value;
                            if (!d[k]) {
                                d[k] = true;
                                columns.push(k);
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_b = _d["return"])) _b.call(_d);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (rows_1_1 && !rows_1_1.done && (_a = rows_1["return"])) _a.call(rows_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        else {
            try {
                for (var _f = __values(Object.keys(rows)), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var k = _g.value;
                    columns.push(k);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_c = _f["return"])) _c.call(_f);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        return columns;
    };
    Sql.prototype._rowsToArray = function (rows, columns, fallback) {
        var e_6, _a;
        if (fallback === void 0) { fallback = DEFAULT; }
        var c = columns.length;
        var n = rows.length;
        var res = new Array(n);
        for (var r = 0; r < n; r = r + 1) {
            res[r] = new Array(c);
        }
        try {
            for (var _b = __values(columns.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), i = _d[0], col = _d[1];
                for (var j = 0; j < n; j = j + 1) {
                    var v = rows[j][col];
                    if (v !== undefined) {
                        res[j][i] = v;
                    }
                    else {
                        res[j][i] = fallback;
                    }
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return res;
    };
    Sql.prototype._getInsertValuesToken = function (row, columns) {
        var e_7, _a, e_8, _b;
        var valueList = [];
        if (!columns) {
            columns = [];
            try {
                for (var _c = __values(Object.entries(row)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = __read(_d.value, 2), k = _e[0], v = _e[1];
                    columns.push(k);
                    valueList.push(v);
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
        else {
            try {
                for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                    var col = columns_1_1.value;
                    var e = row[col];
                    if (e !== undefined) {
                        valueList.push(e);
                    }
                    else {
                        valueList.push(DEFAULT);
                    }
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (columns_1_1 && !columns_1_1.done && (_b = columns_1["return"])) _b.call(columns_1);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }
        return [asLiteral(valueList), columns];
    };
    Sql.prototype._getBulkInsertValuesToken = function (rows, columns, fallback) {
        if (fallback === void 0) { fallback = DEFAULT; }
        columns = columns || this._getKeys(rows);
        return [this._rowsToArray(rows, columns, fallback).map(asLiteral), columns];
    };
    Sql.prototype._getUpdateSetToken = function (columns, key, tableName) {
        var e_9, _a, e_10, _b, e_11, _c;
        var tokens = [];
        if (typeof key === "string") {
            try {
                for (var columns_2 = __values(columns), columns_2_1 = columns_2.next(); !columns_2_1.done; columns_2_1 = columns_2.next()) {
                    var col = columns_2_1.value;
                    if (col !== key) {
                        tokens.push(col + " = " + tableName + "." + col);
                    }
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (columns_2_1 && !columns_2_1.done && (_a = columns_2["return"])) _a.call(columns_2);
                }
                finally { if (e_9) throw e_9.error; }
            }
        }
        else {
            var sets = {};
            try {
                for (var key_1 = __values(key), key_1_1 = key_1.next(); !key_1_1.done; key_1_1 = key_1.next()) {
                    var k = key_1_1.value;
                    sets[k] = true;
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (key_1_1 && !key_1_1.done && (_b = key_1["return"])) _b.call(key_1);
                }
                finally { if (e_10) throw e_10.error; }
            }
            try {
                for (var columns_3 = __values(columns), columns_3_1 = columns_3.next(); !columns_3_1.done; columns_3_1 = columns_3.next()) {
                    var col = columns_3_1.value;
                    if (!sets[col]) {
                        tokens.push(col + " = " + tableName + "." + col);
                    }
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (columns_3_1 && !columns_3_1.done && (_c = columns_3["return"])) _c.call(columns_3);
                }
                finally { if (e_11) throw e_11.error; }
            }
        }
        return tokens.join(", ");
    };
    Sql.prototype._getSelectToken = function (a, b) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        if (a === undefined) {
            return this.error("augument is required for _get_select_token");
        }
        else if (b === undefined) {
            return asToken(a);
        }
        else {
            var s = asToken(a) + ", " + asToken(b);
            for (var i = 0; i < varargs.length; i = i + 1) {
                s = s + ", " + asToken(varargs[i]);
            }
            return s;
        }
    };
    Sql.prototype._getSelectTokenLiteral = function (first, second) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        if (first === undefined) {
            return this.error("arguments must be provided for _get_select_token_literal");
        }
        else if (second === undefined) {
            if (typeof first === "string") {
                return asLiteral(first);
            }
            else if (first instanceof Array) {
                var tokens = [];
                for (var i = 0; i < first.length; i = i + 1) {
                    tokens[i] = asLiteral(first[i]);
                }
                return asToken(tokens);
            }
            else {
                return asLiteral(first);
            }
        }
        else {
            var s = asLiteral(first) + ", " + asLiteral(second);
            for (var i = 0; i < varargs.length; i = i + 1) {
                var name = varargs[i];
                s = s + ", " + asLiteral(name);
            }
            return s;
        }
    };
    Sql.prototype._getUpdateToken = function (row, columns) {
        var e_12, _a, e_13, _b;
        var kv = [];
        if (!columns) {
            try {
                for (var _c = __values(Object.entries(row)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = __read(_d.value, 2), k = _e[0], v = _e[1];
                    kv.push(k + " = " + asLiteral(v));
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
                }
                finally { if (e_12) throw e_12.error; }
            }
        }
        else {
            try {
                for (var columns_4 = __values(columns), columns_4_1 = columns_4.next(); !columns_4_1.done; columns_4_1 = columns_4.next()) {
                    var k = columns_4_1.value;
                    var v = row[k];
                    kv.push(k + " = " + ((v !== undefined && asLiteral(v)) || "DEFAULT"));
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (columns_4_1 && !columns_4_1.done && (_b = columns_4["return"])) _b.call(columns_4);
                }
                finally { if (e_13) throw e_13.error; }
            }
        }
        return kv.join(", ");
    };
    Sql.prototype._getWithToken = function (name, token) {
        if (token instanceof Sql) {
            return name + " AS (" + token.statement() + ")";
        }
        else if (token !== undefined) {
            return name + " AS " + token;
        }
        else {
            return asToken(name);
        }
    };
    Sql.prototype._getInsertToken = function (row, columns) {
        var _a = __read(this._getInsertValuesToken(row, columns), 2), insertValues = _a[0], insertColumns = _a[1];
        return "(" + asToken(insertColumns) + ") VALUES " + insertValues;
    };
    Sql.prototype._getBulkInsertToken = function (rows, columns) {
        var _a = __read(this._getBulkInsertValuesToken(rows, columns, DEFAULT), 2), insertValuesArray = _a[0], insertColumns = _a[1];
        return "(" + asToken(insertColumns) + ") VALUES " + asToken(insertValuesArray);
    };
    Sql.prototype._setSelectSubqueryInsertToken = function (subQuery, columns) {
        var columnsToken = asToken(columns || subQuery._select || "");
        if (columnsToken !== "") {
            this._insert = "(" + columnsToken + ") " + subQuery.statement();
        }
        else {
            this._insert = subQuery.statement();
        }
    };
    Sql.prototype._setCUDSubqueryInsertToken = function (subQuery) {
        if (subQuery._cteReturning) {
            var cr = subQuery._cteReturning;
            var cteColumns = cr.columns;
            var insertColumns = __spreadArray(__spreadArray([], __read(cteColumns), false), __read(cr.literalColumns), false);
            var CUDSelectQuery = Sql["new"]("d").select(cteColumns).selectLiteral(cr.literals);
            this["with"]("d(" + asToken(cteColumns) + ")", subQuery);
            this._insert = "(" + asToken(insertColumns) + ") " + CUDSelectQuery;
        }
        else if (subQuery._returningArgs) {
            var insertColumns = subQuery._returningArgs.flat();
            var CUDSelectQuery = Sql["new"]("d").select(insertColumns);
            this["with"]("d(" + asToken(insertColumns) + ")", subQuery);
            this._insert = "(" + asToken(insertColumns) + ") " + CUDSelectQuery;
        }
    };
    Sql.prototype._getUpsertToken = function (row, key, columns) {
        var _a = __read(this._getInsertValuesToken(row, columns), 2), valuesToken = _a[0], upsertColumns = _a[1];
        var insertToken = "(" + asToken(upsertColumns) + ") VALUES " + valuesToken + " ON CONFLICT (" + this._getSelectToken(key) + ")";
        if ((Array.isArray(key) && key.length === columns.length) || columns.length === 1) {
            return insertToken + " DO NOTHING";
        }
        else {
            return insertToken + " DO UPDATE SET " + this._getUpdateSetToken(columns, key, "EXCLUDED");
        }
    };
    Sql.prototype._getBulkUpsertToken = function (rows, key, columns) {
        var _a = __read(this._getBulkInsertValuesToken(rows, columns, DEFAULT), 2), insertValuesArray = _a[0], insertColumns = _a[1];
        var insertToken = "(" + asToken(insertColumns) + ") VALUES " + asToken(insertValuesArray) + " ON CONFLICT (" + this._getSelectToken(key) + ")";
        if ((Array.isArray(key) && key.length === columns.length) || columns.length === 1) {
            return insertToken + " DO NOTHING";
        }
        else {
            return insertToken + " DO UPDATE SET " + this._getUpdateSetToken(columns, key, "EXCLUDED");
        }
    };
    Sql.prototype._getUpsertQueryToken = function (rows, key, columns) {
        var columnsToken = this._getSelectToken(columns);
        var insertToken = "(" + columnsToken + ") " + rows.statement() + " ON CONFLICT (" + this._getSelectToken(key) + ")";
        if ((Array.isArray(key) && key.length === columns.length) || columns.length === 1) {
            return insertToken + " DO NOTHING";
        }
        else {
            return insertToken + " DO UPDATE SET " + this._getUpdateSetToken(columns, key, "EXCLUDED");
        }
    };
    Sql.prototype._getJoinExpr = function (a, b, c) {
        if (a === undefined) {
            return this.error("auguments is required for _get_join_expr");
        }
        else if (b === undefined) {
            return a;
        }
        else if (c === undefined) {
            return a + " = " + b;
        }
        else {
            return a + " " + b + " " + c;
        }
    };
    Sql.prototype._getJoinToken = function (joinType, rightTable, conditions) {
        var varargs = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            varargs[_i - 3] = arguments[_i];
        }
        if (conditions !== undefined) {
            return joinType + " JOIN " + rightTable + " ON (" + this._getJoinExpr.apply(this, __spreadArray([conditions], __read(varargs), false)) + ")";
        }
        else {
            return joinType + " JOIN " + rightTable;
        }
    };
    Sql.prototype._getInnerJoin = function (rightTable, conditions) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        return this._getJoinToken.apply(this, __spreadArray(["INNER", rightTable, conditions], __read(varargs), false));
    };
    Sql.prototype._getLeftJoin = function (rightTable, conditions) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        return this._getJoinToken.apply(this, __spreadArray(["LEFT", rightTable, conditions], __read(varargs), false));
    };
    Sql.prototype._getRightJoin = function (rightTable, conditions) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        return this._getJoinToken.apply(this, __spreadArray(["RIGHT", rightTable, conditions], __read(varargs), false));
    };
    Sql.prototype._getFullJoin = function (rightTable, conditions) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        return this._getJoinToken.apply(this, __spreadArray(["FULL", rightTable, conditions], __read(varargs), false));
    };
    Sql.prototype._getInToken = function (cols, range, operator) {
        if (operator === void 0) { operator = "IN"; }
        cols = asToken(cols);
        if (typeof range === "object") {
            if (range instanceof Sql) {
                return "(" + cols + ") " + operator + " (" + range.statement() + ")";
            }
            else {
                return "(" + cols + ") " + operator + " " + asLiteral(range);
            }
        }
        else {
            return "(" + cols + ") " + operator + " " + range;
        }
    };
    Sql.prototype._getUpdateQueryToken = function (subSelect, columns) {
        return "(" + ((columns && this._getSelectToken(columns)) || subSelect._select) + ") = (" + subSelect.statement() + ")";
    };
    Sql.prototype._getJoinConditions = function (key, leftTable, rightTable) {
        var e_14, _a;
        if (typeof key === "string") {
            return leftTable + "." + key + " = " + rightTable + "." + key;
        }
        var res = [];
        try {
            for (var key_2 = __values(key), key_2_1 = key_2.next(); !key_2_1.done; key_2_1 = key_2.next()) {
                var k = key_2_1.value;
                res.push(leftTable + "." + k + " = " + rightTable + "." + k);
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (key_2_1 && !key_2_1.done && (_a = key_2["return"])) _a.call(key_2);
            }
            finally { if (e_14) throw e_14.error; }
        }
        return res.join(" AND ");
    };
    Sql.prototype._getCteValuesLiteral = function (rows, columns) {
        return this._getBulkInsertValuesToken(rows, columns, NULL);
    };
    Sql.prototype._handleWhereToken = function (whereToken, tpl) {
        if (whereToken === undefined || whereToken === "") {
            return this;
        }
        else if (this._where === undefined) {
            this._where = whereToken;
        }
        else {
            this._where = stringFormat(tpl, this._where, whereToken);
        }
        return this;
    };
    Sql.prototype._getConditionTokenFromTable = function (kwargs, logic) {
        var e_15, _a;
        var tokens = [];
        try {
            for (var _b = __values(Object.entries(kwargs)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), k = _d[0], value = _d[1];
                tokens.push(k + " = " + asLiteral(value));
            }
        }
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_15) throw e_15.error; }
        }
        if (logic === undefined) {
            return tokens.join(" AND ");
        }
        else {
            return tokens.join(" " + (logic + " "));
        }
    };
    Sql.prototype._getConditionToken = function (first, second, third) {
        if (first === undefined) {
            return this.error("arguments is required for _get_condition_token");
        }
        else if (second === undefined) {
            if (typeof first === "object") {
                return this._getConditionTokenFromTable(first);
            }
            else if (typeof first === "string") {
                return first;
            }
            else if (typeof first === "function") {
                var _where = this._where;
                delete this._where;
                var res = void 0;
                try {
                    res = first.call(this);
                    if (res instanceof Sql) {
                        var groupWhere = this._where;
                        this._where = _where;
                        if (!groupWhere) {
                            return this.error("no condition made from condition function");
                        }
                        return groupWhere;
                    }
                    else {
                        this._where = _where;
                        return res;
                    }
                }
                catch (error) {
                    return this.error("condition function raise error:" + error.message);
                }
            }
            else {
                return this.error("invalid condition type: " + typeof first);
            }
        }
        else if (third === undefined) {
            return first + " = " + asLiteral(second);
        }
        else {
            return first + " " + second + " " + asLiteral(third);
        }
    };
    Sql.prototype._getConditionTokenOr = function (first, second, third) {
        if (typeof first === "object") {
            return this._getConditionTokenFromTable(first, "OR");
        }
        else {
            return this._getConditionToken(first, second, third);
        }
    };
    Sql.prototype._getConditionTokenNot = function (first, second, third) {
        var token;
        if (typeof first === "object") {
            token = this._getConditionTokenFromTable(first, "OR");
        }
        else {
            token = this._getConditionToken(first, second, third);
        }
        return token !== "" ? "NOT (" + token + ")" : "";
    };
    Sql.prototype._handleSetOption = function (otherSql, innerAttr) {
        if (!this[innerAttr]) {
            this[innerAttr] = otherSql;
        }
        else {
            this[innerAttr] = "(" + this[innerAttr] + ") " + innerAttr.slice(1).toUpperCase() + " (" + otherSql.statement() + ")";
        }
        this.statement = this._statementForSet;
        return this;
    };
    Sql.prototype._statementForSet = function () {
        var statement = Sql.prototype.statement.call(this);
        if (this._intersect) {
            statement = "(" + statement + ") INTERSECT (" + this._intersect + ")";
        }
        else if (this._intersectAll) {
            statement = "(" + statement + ") INTERSECT ALL (" + this._intersectAll + ")";
        }
        else if (this._union) {
            statement = "(" + statement + ") UNION (" + this._union + ")";
        }
        else if (this._unionAll) {
            statement = "(" + statement + ") UNION ALL (" + this._unionAll + ")";
        }
        else if (this._except) {
            statement = "(" + statement + ") EXCEPT (" + this._except + ")";
        }
        else if (this._exceptAll) {
            statement = "(" + statement + ") EXCEPT ALL (" + this._exceptAll + ")";
        }
        return statement;
    };
    Sql.prototype.statement = function () {
        var tableName = this.getTable();
        var statement = assembleSql({
            tableName: tableName,
            "with": this._with,
            join: this._join,
            distinct: this._distinct,
            returning: this._returning,
            cteReturning: this._cteReturning,
            insert: this._insert,
            update: this._update,
            "delete": this._delete,
            using: this._using,
            select: this._select,
            from: this._from,
            where: this._where,
            group: this._group,
            having: this._having,
            order: this._order,
            limit: this._limit,
            offset: this._offset
        });
        return statement;
    };
    Sql.prototype["with"] = function (name, token) {
        var withToken = this._getWithToken(name, token);
        if (this._with) {
            this._with = this._with + ", " + withToken;
        }
        else {
            this._with = withToken;
        }
        return this;
    };
    Sql.prototype.union = function (otherSql) {
        return this._handleSetOption(otherSql, "_union");
    };
    Sql.prototype.unionAll = function (otherSql) {
        return this._handleSetOption(otherSql, "_unionAll");
    };
    Sql.prototype.except = function (otherSql) {
        return this._handleSetOption(otherSql, "_except");
    };
    Sql.prototype.exceptAll = function (otherSql) {
        return this._handleSetOption(otherSql, "_exceptAll");
    };
    Sql.prototype.intersect = function (otherSql) {
        return this._handleSetOption(otherSql, "_intersect");
    };
    Sql.prototype.intersectAll = function (otherSql) {
        return this._handleSetOption(otherSql, "_intersectAll");
    };
    Sql.prototype.as = function (tableAlias) {
        this._as = tableAlias;
        return this;
    };
    Sql.prototype.withValues = function (name, rows) {
        var columns = this._getKeys(rows[0]);
        var _a = __read(this._getCteValuesLiteral(rows, columns), 2), withRows = _a[0], withColumns = _a[1];
        var cteName = name + "(" + withColumns.join(", ") + ")";
        var cteValues = "(VALUES " + asToken(withRows) + ")";
        return this["with"](cteName, cteValues);
    };
    Sql.prototype.insert = function (rows, columns) {
        if (rows instanceof Sql) {
            if (rows._select) {
                this._setSelectSubqueryInsertToken(rows, columns);
            }
            else {
                this._setCUDSubqueryInsertToken(rows);
            }
        }
        else if (rows instanceof Array) {
            this._insert = this._getBulkInsertToken(rows, columns);
        }
        else if (Object.keys(rows).length) {
            this._insert = this._getInsertToken(rows, columns);
        }
        else {
            return this.error("can't pass empty table to sql.insert");
        }
        return this;
    };
    Sql.prototype.update = function (row, columns) {
        if (typeof row == "string") {
            this._update = row;
        }
        else if (!(row instanceof Sql)) {
            this._update = this._getUpdateToken(row, columns);
        }
        else {
            this._update = this._getUpdateQueryToken(row, columns);
        }
        return this;
    };
    Sql.prototype.upsert = function (rows, key, columns) {
        if (!key) {
            throw new Error("you must provide key for upsert(string or table)");
        }
        if (rows instanceof Sql) {
            this._insert = this._getUpsertQueryToken(rows, key, columns);
        }
        else if (rows instanceof Array) {
            this._insert = this._getBulkUpsertToken(rows, key, columns);
        }
        else {
            this._insert = this._getUpsertToken(rows, key, columns);
        }
        return this;
    };
    Sql.prototype.isInstance = function (row) {
        return row instanceof Sql;
    };
    Sql.prototype.merge = function (rows, key, columns) {
        if (rows.length === 0) {
            return this.error("empty rows passed to merge");
        }
        var _a = __read(this._getCteValuesLiteral(rows, columns), 2), mergeRows = _a[0], mergeColumns = _a[1];
        var cteName = "V(" + mergeColumns.join(", ") + ")";
        var cteValues = "(VALUES " + asToken(mergeRows) + ")";
        var joinCond = this._getJoinConditions(key, "V", "T");
        var valsColumns = mergeColumns.map(_prefixWithV);
        var insertSubquery = Sql["new"]("V")
            .select(valsColumns)
            .leftJoin("U AS T", joinCond)
            .whereNull("T." + (Array.isArray(key) ? key[0] : key));
        var updatedSubquery;
        if ((Array.isArray(key) && key.length === mergeColumns.length) || mergeColumns.length === 1) {
            updatedSubquery = Sql["new"]("V")
                .select(valsColumns)
                .join(this.tableName + " AS T", joinCond);
        }
        else {
            updatedSubquery = Sql["new"](this.tableName)
                .as("T")
                .update(this._getUpdateSetToken(mergeColumns, key, "V"))
                .from("V")
                .where(joinCond)
                .returning(valsColumns);
        }
        this["with"](cteName, cteValues)["with"]("U", updatedSubquery);
        return Sql.prototype.insert.call(this, insertSubquery, columns);
    };
    Sql.prototype.updates = function (rows, key, columns) {
        var _a;
        if (rows instanceof Sql) {
            var updatesColumns = columns || ((_a = rows._returningArgs) === null || _a === void 0 ? void 0 : _a.flat().filter(function (e) { return typeof e === "string"; })) || [];
            if (!updatesColumns.length) {
                throw new Error("columns is required when using subquery");
            }
            var cteName = "V(" + updatesColumns.join(", ") + ")";
            var joinCond = this._getJoinConditions(key, "V", this._as || this.tableName);
            this["with"](cteName, rows);
            return Sql.prototype.update
                .call(this, this._getUpdateSetToken(updatesColumns, key, "V"))
                .from("V")
                .where(joinCond);
        }
        else if (rows.length === 0) {
            return this.error("empty rows passed to updates");
        }
        else {
            var _b = __read(this._getCteValuesLiteral(rows, columns), 2), updatesRows = _b[0], updatesColumns = _b[1];
            var cteName = "V(" + updatesColumns.join(", ") + ")";
            var cteValues = "(VALUES " + asToken(updatesRows) + ")";
            var joinCond = this._getJoinConditions(key, "V", this._as || this.tableName);
            this["with"](cteName, cteValues);
            return Sql.prototype.update
                .call(this, this._getUpdateSetToken(updatesColumns, key, "V"))
                .from("V")
                .where(joinCond);
        }
    };
    Sql.prototype.gets = function (keys) {
        if (keys.length === 0) {
            return this.error("empty keys passed to gets");
        }
        var columns = this._getKeys(keys[0]);
        var _a = __read(this._getCteValuesLiteral(keys, columns), 2), getskeys = _a[0], getsColumns = _a[1];
        var joinCond = this._getJoinConditions(getsColumns, "V", this._as || this.tableName);
        var cteName = "V(" + getsColumns.join(", ") + ")";
        var cteValues = "(VALUES " + asToken(getskeys) + ")";
        return this["with"](cteName, cteValues).rightJoin("V", joinCond);
    };
    Sql.prototype.mergeGets = function (rows, keys) {
        var columns = this._getKeys(rows[0]);
        var _a = __read(this._getCteValuesLiteral(rows, columns), 2), getsRows = _a[0], getsColumns = _a[1];
        var joinCond = this._getJoinConditions(keys, "V", this._as || this.tableName);
        var cteName = "V(" + getsColumns.join(", ") + ")";
        var cteValues = "(VALUES " + asToken(getsRows) + ")";
        return Sql.prototype.select.call(this, "V.*")["with"](cteName, cteValues).rightJoin("V", joinCond);
    };
    Sql.prototype.copy = function () {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    };
    Sql.prototype["delete"] = function (first, second, third) {
        this._delete = true;
        if (first) {
            this.where(first, second, third);
        }
        return this;
    };
    Sql.prototype.distinct = function () {
        this._distinct = true;
        return this;
    };
    Sql.prototype.select = function (first, second) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        var s = this._getSelectToken.apply(this, __spreadArray([first, second], __read(varargs), false));
        if (!this._select) {
            this._select = s;
        }
        else if (s !== undefined && s !== "") {
            this._select = this._select + (", " + s);
        }
        return this;
    };
    Sql.prototype.selectLiteral = function (first, second) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        var s = this._getSelectTokenLiteral.apply(this, __spreadArray([first, second], __read(varargs), false));
        if (!this._select) {
            this._select = s;
        }
        else if (s !== undefined && s !== "") {
            this._select = this._select + (", " + s);
        }
        return this;
    };
    Sql.prototype.returning = function (first, second) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        var s = this._getSelectToken.apply(this, __spreadArray([first, second], __read(varargs), false));
        if (!this._returning) {
            this._returning = s;
        }
        else if (s !== undefined && s !== "") {
            this._returning = this._returning + (", " + s);
        }
        else {
            return this;
        }
        if (this._returningArgs) {
            this._returningArgs = __spreadArray([this._returningArgs, first, second], __read(varargs), false);
        }
        else {
            this._returningArgs = __spreadArray([first, second], __read(varargs), false);
        }
        return this;
    };
    Sql.prototype.returningLiteral = function (first, second) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        var s = this._getSelectTokenLiteral.apply(this, __spreadArray([first, second], __read(varargs), false));
        if (!this._returning) {
            this._returning = s;
        }
        else if (s !== undefined && s !== "") {
            this._returning = this._returning + (", " + s);
        }
        if (this._returningArgs) {
            this._returningArgs = __spreadArray([this._returningArgs, first, second], __read(varargs), false);
        }
        else {
            this._returningArgs = __spreadArray([first, second], __read(varargs), false);
        }
        return this;
    };
    Sql.prototype.cteReturning = function (opts) {
        this._cteReturning = opts;
        return this;
    };
    Sql.prototype.group = function (first, second) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        if (!this._group) {
            this._group = this._getSelectToken.apply(this, __spreadArray([first, second], __read(varargs), false));
        }
        else {
            this._group = this._group + (", " + this._getSelectToken.apply(this, __spreadArray([first, second], __read(varargs), false)));
        }
        return this;
    };
    Sql.prototype.groupBy = function (first, second) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        return this.group.apply(this, __spreadArray([first, second], __read(varargs), false));
    };
    Sql.prototype.order = function (first, second) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        if (!this._order) {
            this._order = this._getSelectToken.apply(this, __spreadArray([first, second], __read(varargs), false));
        }
        else {
            this._order = this._order + (", " + this._getSelectToken.apply(this, __spreadArray([first, second], __read(varargs), false)));
        }
        return this;
    };
    Sql.prototype.orderBy = function (first, second) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        return this.order.apply(this, __spreadArray([first, second], __read(varargs), false));
    };
    Sql.prototype._getArgsToken = function (first, second) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        return this._getSelectToken.apply(this, __spreadArray([first, second], __read(varargs), false));
    };
    Sql.prototype.using = function (first, second) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        this._delete = true;
        this._using = this._getArgsToken.apply(this, __spreadArray([first, second], __read(varargs), false));
        return this;
    };
    Sql.prototype.from = function (first, second) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        if (!this._from) {
            this._from = this._getArgsToken.apply(this, __spreadArray([first, second], __read(varargs), false));
        }
        else {
            this._from = this._from + (", " + this._getArgsToken.apply(this, __spreadArray([first, second], __read(varargs), false)));
        }
        return this;
    };
    Sql.prototype.getTable = function () {
        return (this._as === undefined && this.tableName) || this.tableName + (" AS " + this._as);
    };
    Sql.prototype.join = function (rightTable, conditions) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        var joinToken = this._getInnerJoin.apply(this, __spreadArray([rightTable, conditions], __read(varargs), false));
        this._from = (this._from || this.getTable()) + " " + joinToken;
        return this;
    };
    Sql.prototype.innerJoin = function (rightTable, conditions) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        return this.join.apply(this, __spreadArray([rightTable, conditions], __read(varargs), false));
    };
    Sql.prototype.leftJoin = function (rightTable, conditions) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        var joinToken = this._getLeftJoin.apply(this, __spreadArray([rightTable, conditions], __read(varargs), false));
        this._from = (this._from || this.getTable()) + " " + joinToken;
        return this;
    };
    Sql.prototype.rightJoin = function (rightTable, conditions) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        var joinToken = this._getRightJoin.apply(this, __spreadArray([rightTable, conditions], __read(varargs), false));
        this._from = (this._from || this.getTable()) + " " + joinToken;
        return this;
    };
    Sql.prototype.fullJoin = function (rightTable, conditions) {
        var varargs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            varargs[_i - 2] = arguments[_i];
        }
        var joinToken = this._getFullJoin.apply(this, __spreadArray([rightTable, conditions], __read(varargs), false));
        this._from = (this._from || this.getTable()) + " " + joinToken;
        return this;
    };
    Sql.prototype.limit = function (n) {
        this._limit = n;
        return this;
    };
    Sql.prototype.offset = function (n) {
        this._offset = n;
        return this;
    };
    Sql.prototype.where = function (first, second, third) {
        var whereToken = this._getConditionToken(first, second, third);
        return this._handleWhereToken(whereToken, "(%s) AND (%s)");
    };
    Sql.prototype.whereOr = function (first, second, third) {
        var whereToken = this._getConditionTokenOr(first, second, third);
        return this._handleWhereToken(whereToken, "(%s) AND (%s)");
    };
    Sql.prototype.orWhereOr = function (first, second, third) {
        var whereToken = this._getConditionTokenOr(first, second, third);
        return this._handleWhereToken(whereToken, "%s OR %s");
    };
    Sql.prototype.whereNot = function (first, second, third) {
        var whereToken = this._getConditionTokenNot(first, second, third);
        return this._handleWhereToken(whereToken, "(%s) AND (%s)");
    };
    Sql.prototype.orWhere = function (first, second, third) {
        var whereToken = this._getConditionToken(first, second, third);
        return this._handleWhereToken(whereToken, "%s OR %s");
    };
    Sql.prototype.orWhereNot = function (first, second, third) {
        var whereToken = this._getConditionTokenNot(first, second, third);
        return this._handleWhereToken(whereToken, "%s OR %s");
    };
    Sql.prototype.whereExists = function (builder) {
        if (this._where) {
            this._where = "(" + this._where + ") AND EXISTS (" + builder.statement() + ")";
        }
        else {
            this._where = "EXISTS (" + builder.statement() + ")";
        }
        return this;
    };
    Sql.prototype.whereNotExists = function (builder) {
        if (this._where) {
            this._where = "(" + this._where + ") AND NOT EXISTS (" + builder.statement() + ")";
        }
        else {
            this._where = "NOT EXISTS (" + builder.statement() + ")";
        }
        return this;
    };
    Sql.prototype.whereIn = function (cols, range) {
        var inToken = this._getInToken(cols, range);
        if (this._where) {
            this._where = "(" + this._where + ") AND " + inToken;
        }
        else {
            this._where = inToken;
        }
        return this;
    };
    Sql.prototype.whereNotIn = function (cols, range) {
        var notInToken = this._getInToken(cols, range, "NOT IN");
        if (this._where) {
            this._where = "(" + this._where + ") AND " + notInToken;
        }
        else {
            this._where = notInToken;
        }
        return this;
    };
    Sql.prototype.whereNull = function (col) {
        if (this._where) {
            this._where = "(" + this._where + ") AND " + col + " IS NULL";
        }
        else {
            this._where = col + " IS NULL";
        }
        return this;
    };
    Sql.prototype.whereNotNull = function (col) {
        if (this._where) {
            this._where = "(" + this._where + ") AND " + col + " IS NOT NULL";
        }
        else {
            this._where = col + " IS NOT NULL";
        }
        return this;
    };
    Sql.prototype.whereBetween = function (col, low, high) {
        if (this._where) {
            this._where = "(" + this._where + ") AND (" + col + " BETWEEN " + low + " AND " + high + ")";
        }
        else {
            this._where = col + " BETWEEN " + low + " AND " + high;
        }
        return this;
    };
    Sql.prototype.whereNotBetween = function (col, low, high) {
        if (this._where) {
            this._where = "(" + this._where + ") AND (" + col + " NOT BETWEEN " + low + " AND " + high + ")";
        }
        else {
            this._where = col + " NOT BETWEEN " + low + " AND " + high;
        }
        return this;
    };
    Sql.prototype.whereRaw = function (whereToken) {
        if (whereToken === "") {
            return this;
        }
        else if (this._where) {
            this._where = "(" + this._where + ") AND (" + whereToken + ")";
        }
        else {
            this._where = whereToken;
        }
        return this;
    };
    Sql.prototype.orWhereExists = function (builder) {
        if (this._where) {
            this._where = this._where + " OR EXISTS (" + builder.statement() + ")";
        }
        else {
            this._where = "EXISTS (" + builder + ")";
        }
        return this;
    };
    Sql.prototype.orWhereNotExists = function (builder) {
        if (this._where) {
            this._where = this._where + " OR NOT EXISTS (" + builder.statement() + ")";
        }
        else {
            this._where = "NOT EXISTS (" + builder + ")";
        }
        return this;
    };
    Sql.prototype.orWhereIn = function (cols, range) {
        var inToken = this._getInToken(cols, range);
        if (this._where) {
            this._where = this._where + " OR " + inToken;
        }
        else {
            this._where = inToken;
        }
        return this;
    };
    Sql.prototype.orWhereNotIn = function (cols, range) {
        var notInToken = this._getInToken(cols, range, "NOT IN");
        if (this._where) {
            this._where = this._where + " OR " + notInToken;
        }
        else {
            this._where = notInToken;
        }
        return this;
    };
    Sql.prototype.orWhereNull = function (col) {
        if (this._where) {
            this._where = this._where + " OR " + col + " IS NULL";
        }
        else {
            this._where = col + " IS NULL";
        }
        return this;
    };
    Sql.prototype.orWhereNotNull = function (col) {
        if (this._where) {
            this._where = this._where + " OR " + col + " IS NOT NULL";
        }
        else {
            this._where = col + " IS NOT NULL";
        }
        return this;
    };
    Sql.prototype.orWhereBetween = function (col, low, high) {
        if (this._where) {
            this._where = this._where + " OR (" + col + " BETWEEN " + low + " AND " + high + ")";
        }
        else {
            this._where = col + " BETWEEN " + low + " AND " + high;
        }
        return this;
    };
    Sql.prototype.orWhereNotBetween = function (col, low, high) {
        if (this._where) {
            this._where = this._where + " OR (" + col + " NOT BETWEEN " + low + " AND " + high + ")";
        }
        else {
            this._where = col + " NOT BETWEEN " + low + " AND " + high;
        }
        return this;
    };
    Sql.prototype.orWhereRaw = function (whereToken) {
        if (whereToken === "") {
            return this;
        }
        else if (this._where) {
            this._where = this._where + " OR " + whereToken;
        }
        else {
            this._where = whereToken;
        }
        return this;
    };
    Sql.prototype.having = function (first, second, third) {
        if (this._having) {
            this._having = "(" + this._having + ") AND (" + this._getConditionToken(first, second, third) + ")";
        }
        else {
            this._having = this._getConditionToken(first, second, third);
        }
        return this;
    };
    Sql.prototype.havingNot = function (first, second, third) {
        if (this._having) {
            this._having = "(" + this._having + ") AND (" + this._getConditionTokenNot(first, second, third) + ")";
        }
        else {
            this._having = this._getConditionTokenNot(first, second, third);
        }
        return this;
    };
    Sql.prototype.havingExists = function (builder) {
        if (this._having) {
            this._having = "(" + this._having + ") AND EXISTS (" + builder.statement() + ")";
        }
        else {
            this._having = "EXISTS (" + builder.statement() + ")";
        }
        return this;
    };
    Sql.prototype.havingNotExists = function (builder) {
        if (this._having) {
            this._having = "(" + this._having + ") AND NOT EXISTS (" + builder.statement() + ")";
        }
        else {
            this._having = "NOT EXISTS (" + builder.statement() + ")";
        }
        return this;
    };
    Sql.prototype.havingIn = function (cols, range) {
        var inToken = this._getInToken(cols, range);
        if (this._having) {
            this._having = "(" + this._having + ") AND " + inToken;
        }
        else {
            this._having = inToken;
        }
        return this;
    };
    Sql.prototype.havingNotIn = function (cols, range) {
        var notInToken = this._getInToken(cols, range, "NOT IN");
        if (this._having) {
            this._having = "(" + this._having + ") AND " + notInToken;
        }
        else {
            this._having = notInToken;
        }
        return this;
    };
    Sql.prototype.havingNull = function (col) {
        if (this._having) {
            this._having = "(" + this._having + ") AND " + col + " IS NULL";
        }
        else {
            this._having = col + " IS NULL";
        }
        return this;
    };
    Sql.prototype.havingNotNull = function (col) {
        if (this._having) {
            this._having = "(" + this._having + ") AND " + col + " IS NOT NULL";
        }
        else {
            this._having = col + " IS NOT NULL";
        }
        return this;
    };
    Sql.prototype.havingBetween = function (col, low, high) {
        if (this._having) {
            this._having = "(" + this._having + ") AND (" + col + " BETWEEN " + low + " AND " + high + ")";
        }
        else {
            this._having = col + " BETWEEN " + low + " AND " + high;
        }
        return this;
    };
    Sql.prototype.havingNotBetween = function (col, low, high) {
        if (this._having) {
            this._having = "(" + this._having + ") AND (" + col + " NOT BETWEEN " + low + " AND " + high + ")";
        }
        else {
            this._having = col + " NOT BETWEEN " + low + " AND " + high;
        }
        return this;
    };
    Sql.prototype.havingRaw = function (token) {
        if (this._having) {
            this._having = "(" + this._having + ") AND (" + token + ")";
        }
        else {
            this._having = token;
        }
        return this;
    };
    Sql.prototype.orHaving = function (first, second, third) {
        if (this._having) {
            this._having = this._having + " OR " + this._getConditionToken(first, second, third);
        }
        else {
            this._having = this._getConditionToken(first, second, third);
        }
        return this;
    };
    Sql.prototype.orHavingNot = function (first, second, third) {
        if (this._having) {
            this._having = this._having + " OR " + this._getConditionTokenNot(first, second, third);
        }
        else {
            this._having = this._getConditionTokenNot(first, second, third);
        }
        return this;
    };
    Sql.prototype.orHavingExists = function (builder) {
        if (this._having) {
            this._having = this._having + " OR EXISTS (" + builder.statement() + ")";
        }
        else {
            this._having = "EXISTS (" + builder.statement() + ")";
        }
        return this;
    };
    Sql.prototype.orHavingNotExists = function (builder) {
        if (this._having) {
            this._having = this._having + " OR NOT EXISTS (" + builder.statement() + ")";
        }
        else {
            this._having = "NOT EXISTS (" + builder.statement() + ")";
        }
        return this;
    };
    Sql.prototype.orHavingIn = function (cols, range) {
        var inToken = this._getInToken(cols, range);
        if (this._having) {
            this._having = this._having + " OR " + inToken;
        }
        else {
            this._having = inToken;
        }
        return this;
    };
    Sql.prototype.orHavingNotIn = function (cols, range) {
        var notInToken = this._getInToken(cols, range, "NOT IN");
        if (this._having) {
            this._having = this._having + " OR " + notInToken;
        }
        else {
            this._having = notInToken;
        }
        return this;
    };
    Sql.prototype.orHavingNull = function (col) {
        if (this._having) {
            this._having = this._having + " OR " + col + " IS NULL";
        }
        else {
            this._having = col + " IS NULL";
        }
        return this;
    };
    Sql.prototype.orHavingNotNull = function (col) {
        if (this._having) {
            this._having = this._having + " OR " + col + " IS NOT NULL";
        }
        else {
            this._having = col + " IS NOT NULL";
        }
        return this;
    };
    Sql.prototype.orHavingBetween = function (col, low, high) {
        if (this._having) {
            this._having = this._having + " OR (" + col + " BETWEEN " + low + " AND " + high + ")";
        }
        else {
            this._having = col + " BETWEEN " + low + " AND " + high;
        }
        return this;
    };
    Sql.prototype.orHavingNotBetween = function (col, low, high) {
        if (this._having) {
            this._having = this._having + " OR (" + col + " NOT BETWEEN " + low + " AND " + high + ")";
        }
        else {
            this._having = col + " NOT BETWEEN " + low + " AND " + high;
        }
        return this;
    };
    Sql.prototype.orHavingRaw = function (token) {
        if (this._having) {
            this._having = this._having + " OR " + token;
        }
        else {
            this._having = token;
        }
        return this;
    };
    Sql.r = makeRawToken;
    Sql.DEFAULT = DEFAULT;
    Sql.NULL = NULL;
    Sql.asToken = asToken;
    Sql.asLiteral = asLiteral;
    return Sql;
}());
exports.Sql = Sql;
