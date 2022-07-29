function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function makeRawToken(s) {
    var rawToken = function rawToken() {
        return s;
    };
    return rawToken;
}
var DEFAULT = makeRawToken("DEFAULT");
var NULL = makeRawToken("NULL");
var stringFormat = function(s) {
    for(var _len = arguments.length, varargs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        varargs[_key - 1] = arguments[_key];
    }
    var status = 0;
    var res = [];
    var j = -1;
    for(var i = 0; i < s.length; i++){
        var c = s[i];
        if (c === "%") {
            if (status === 0) {
                status = 1;
            } else if (status === 1) {
                status = 0;
                res.push("%");
            }
        } else if (c === "s" && status === 1) {
            j = j + 1;
            res.push(varargs[j]);
            status = 0;
        } else {
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
            } else {
                return value;
            }
        } else if ("number" === typeof value || "bigint" === (typeof value === "undefined" ? "undefined" : _typeof(value))) {
            return String(value);
        } else if ("boolean" === typeof value) {
            return value === true ? "TRUE" : "FALSE";
        } else if ("function" === typeof value) {
            return value();
        } else if (null === value) {
            return "NULL";
        } else if (_instanceof(value, Sql)) {
            return "(" + value.statement() + ")";
        } else if (Array.isArray(value)) {
            if (value.length === 0) {
                throw new Error("empty array as Sql value is not allowed");
            }
            var token = value.map(asSqlToken).join(", ");
            if (isBracket) {
                return "(" + token + ")";
            } else {
                return token;
            }
        } else {
            throw new Error("don't know how to escape value: ".concat(value, " (").concat(typeof value === "undefined" ? "undefined" : _typeof(value), ")"));
        }
    }
    return asSqlToken;
}
var asLiteral = _escapeFactory(true, true);
var asToken = _escapeFactory(false, false);
function getCteReturningValues(opts) {
    var values = [];
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = opts.columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var col = _step.value;
            values.push(asToken(col));
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    if (opts.literals) {
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator1 = opts.literals[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var e = _step1.value;
                values.push(asLiteral(e));
            }
        } catch (err) {
            _didIteratorError1 = true;
            _iteratorError1 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                    _iterator1.return();
                }
            } finally{
                if (_didIteratorError1) {
                    throw _iteratorError1;
                }
            }
        }
    }
    return values;
}
function getReturningToken(opts) {
    if (opts.cteReturning) {
        return " RETURNING " + asToken(getCteReturningValues(opts.cteReturning));
    } else if (opts.returning) {
        return " RETURNING " + opts.returning;
    } else {
        return "";
    }
}
function assembleSql(opts) {
    var statement;
    if (opts.update) {
        var from = opts.from && " FROM " + opts.from || "";
        var where = opts.where && " WHERE " + opts.where || "";
        var returning = getReturningToken(opts);
        statement = "UPDATE ".concat(opts.tableName, " SET ").concat(opts.update).concat(from).concat(where).concat(returning);
    } else if (opts.insert) {
        var returning1 = getReturningToken(opts);
        statement = "INSERT INTO ".concat(opts.tableName, " ").concat(opts.insert).concat(returning1);
    } else if (opts.delete) {
        var using = opts.using && " USING " + opts.using || "";
        var where1 = opts.where && " WHERE " + opts.where || "";
        var returning2 = getReturningToken(opts);
        statement = "DELETE FROM ".concat(opts.tableName, " ").concat(using).concat(where1).concat(returning2);
    } else {
        var from1 = opts.from || opts.tableName;
        var where2 = opts.where && " WHERE " + opts.where || "";
        var group = opts.group && " GROUP BY " + opts.group || "";
        var having = opts.having && " HAVING " + opts.having || "";
        var order = opts.order && " ORDER BY " + opts.order || "";
        var limit = opts.limit && " LIMIT " + opts.limit || "";
        var offset = opts.offset && " OFFSET " + opts.offset || "";
        statement = "SELECT ".concat(opts.distinct && "DISTINCT " || "").concat(opts.select || "*", " FROM ").concat(from1).concat(where2).concat(group).concat(having).concat(order).concat(limit).concat(offset);
    }
    return opts.with && "WITH ".concat(opts.with, " ").concat(statement) || statement;
}
export var Sql = /*#__PURE__*/ function() {
    "use strict";
    function Sql(tableName) {
        _classCallCheck(this, Sql);
        this.tableName = tableName;
    }
    var _proto = Sql.prototype;
    _proto.toString = function toString() {
        return this.statement();
    };
    _proto.error = function error(errMsg) {
        if (typeof errMsg == "string") {
            throw new Error(errMsg);
        } else if (_instanceof(errMsg, Error)) {
            throw errMsg;
        } else {
            throw errMsg;
        }
    };
    _proto._getKeys = function _getKeys(rows) {
        var columns = [];
        if (_instanceof(rows, Array)) {
            var d = {};
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var row = _step.value;
                    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                    try {
                        for(var _iterator1 = Object.keys(row)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                            var k = _step1.value;
                            if (!d[k]) {
                                d[k] = true;
                                columns.push(k);
                            }
                        }
                    } catch (err) {
                        _didIteratorError1 = true;
                        _iteratorError1 = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                _iterator1.return();
                            }
                        } finally{
                            if (_didIteratorError1) {
                                throw _iteratorError1;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        } else {
            var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
            try {
                for(var _iterator2 = Object.keys(rows)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                    var k1 = _step2.value;
                    columns.push(k1);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                    }
                } finally{
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
        return columns;
    };
    _proto._rowsToArray = function _rowsToArray(rows, columns) {
        var fallback = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : DEFAULT;
        var c = columns.length;
        var n = rows.length;
        var res = new Array(n);
        for(var r = 0; r < n; r = r + 1){
            res[r] = new Array(c);
        }
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = columns.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var _value = _slicedToArray(_step.value, 2), i = _value[0], col = _value[1];
                for(var j = 0; j < n; j = j + 1){
                    var v = rows[j][col];
                    if (v !== undefined) {
                        res[j][i] = v;
                    } else {
                        res[j][i] = fallback;
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        return res;
    };
    _proto._getInsertValuesToken = function _getInsertValuesToken(row, columns) {
        var valueList = [];
        if (!columns) {
            columns = [];
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = Object.entries(row)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var _value = _slicedToArray(_step.value, 2), k = _value[0], v = _value[1];
                    columns.push(k);
                    valueList.push(v);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        } else {
            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
            try {
                for(var _iterator1 = columns[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                    var col = _step1.value;
                    var e = row[col];
                    if (e !== undefined) {
                        valueList.push(e);
                    } else {
                        valueList.push(DEFAULT);
                    }
                }
            } catch (err) {
                _didIteratorError1 = true;
                _iteratorError1 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                        _iterator1.return();
                    }
                } finally{
                    if (_didIteratorError1) {
                        throw _iteratorError1;
                    }
                }
            }
        }
        return [
            asLiteral(valueList),
            columns
        ];
    };
    _proto._getBulkInsertValuesToken = function _getBulkInsertValuesToken(rows, columns) {
        var fallback = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : DEFAULT;
        columns = columns || this._getKeys(rows);
        return [
            this._rowsToArray(rows, columns, fallback).map(asLiteral),
            columns
        ];
    };
    _proto._getUpdateSetToken = function _getUpdateSetToken(columns, key, tableName) {
        var tokens = [];
        if (typeof key === "string") {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var col = _step.value;
                    if (col !== key) {
                        tokens.push("".concat(col, " = ").concat(tableName, ".").concat(col));
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        } else {
            var sets = {};
            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
            try {
                for(var _iterator1 = key[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                    var k = _step1.value;
                    sets[k] = true;
                }
            } catch (err) {
                _didIteratorError1 = true;
                _iteratorError1 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                        _iterator1.return();
                    }
                } finally{
                    if (_didIteratorError1) {
                        throw _iteratorError1;
                    }
                }
            }
            var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
            try {
                for(var _iterator2 = columns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                    var col1 = _step2.value;
                    if (!sets[col1]) {
                        tokens.push("".concat(col1, " = ").concat(tableName, ".").concat(col1));
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                    }
                } finally{
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
        return tokens.join(", ");
    };
    _proto._getSelectToken = function _getSelectToken(a, b) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        if (a === undefined) {
            return this.error("augument is required for _get_select_token");
        } else if (b === undefined) {
            return asToken(a);
        } else {
            var s = asToken(a) + ", " + asToken(b);
            for(var i = 0; i < varargs.length; i = i + 1){
                s = s + ", " + asToken(varargs[i]);
            }
            return s;
        }
    };
    _proto._getSelectTokenLiteral = function _getSelectTokenLiteral(first, second) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        if (first === undefined) {
            return this.error("arguments must be provided for _get_select_token_literal");
        } else if (second === undefined) {
            if (typeof first === "string") {
                return asLiteral(first);
            } else if (_instanceof(first, Array)) {
                var tokens = [];
                for(var i = 0; i < first.length; i = i + 1){
                    tokens[i] = asLiteral(first[i]);
                }
                return asToken(tokens);
            } else {
                return asLiteral(first);
            }
        } else {
            var s = asLiteral(first) + ", " + asLiteral(second);
            for(var i1 = 0; i1 < varargs.length; i1 = i1 + 1){
                var name = varargs[i1];
                s = s + ", " + asLiteral(name);
            }
            return s;
        }
    };
    _proto._getUpdateToken = function _getUpdateToken(row, columns) {
        var kv = [];
        if (!columns) {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = Object.entries(row)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var _value = _slicedToArray(_step.value, 2), k = _value[0], v = _value[1];
                    kv.push("".concat(k, " = ").concat(asLiteral(v)));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        } else {
            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
            try {
                for(var _iterator1 = columns[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                    var k1 = _step1.value;
                    var v1 = row[k1];
                    kv.push("".concat(k1, " = ").concat(v1 !== undefined && asLiteral(v1) || "DEFAULT"));
                }
            } catch (err) {
                _didIteratorError1 = true;
                _iteratorError1 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                        _iterator1.return();
                    }
                } finally{
                    if (_didIteratorError1) {
                        throw _iteratorError1;
                    }
                }
            }
        }
        return kv.join(", ");
    };
    _proto._getWithToken = function _getWithToken(name, token) {
        if (_instanceof(token, Sql)) {
            return "".concat(name, " AS (").concat(token.statement(), ")");
        } else if (token !== undefined) {
            return "".concat(name, " AS ").concat(token);
        } else {
            return asToken(name);
        }
    };
    _proto._getInsertToken = function _getInsertToken(row, columns) {
        var ref = _slicedToArray(this._getInsertValuesToken(row, columns), 2), insertValues = ref[0], insertColumns = ref[1];
        return "(".concat(asToken(insertColumns), ") VALUES ").concat(insertValues);
    };
    _proto._getBulkInsertToken = function _getBulkInsertToken(rows, columns) {
        var ref = _slicedToArray(this._getBulkInsertValuesToken(rows, columns, DEFAULT), 2), insertValuesArray = ref[0], insertColumns = ref[1];
        return "(".concat(asToken(insertColumns), ") VALUES ").concat(asToken(insertValuesArray));
    };
    _proto._setSelectSubqueryInsertToken = function _setSelectSubqueryInsertToken(subQuery, columns) {
        var columnsToken = asToken(columns || subQuery._select || "");
        if (columnsToken !== "") {
            this._insert = "(".concat(columnsToken, ") ").concat(subQuery.statement());
        } else {
            this._insert = subQuery.statement();
        }
    };
    _proto._setCUDSubqueryInsertToken = function _setCUDSubqueryInsertToken(subQuery) {
        if (subQuery._cteReturning) {
            var cr = subQuery._cteReturning;
            var cteColumns = cr.columns;
            var insertColumns = _toConsumableArray(cteColumns).concat(_toConsumableArray(cr.literalColumns));
            var CUDSelectQuery = Sql.new("d").select(cteColumns).selectLiteral(cr.literals);
            this.with("d(".concat(asToken(cteColumns), ")"), subQuery);
            this._insert = "(".concat(asToken(insertColumns), ") ").concat(CUDSelectQuery);
        } else if (subQuery._returningArgs) {
            var insertColumns1 = subQuery._returningArgs.flat();
            var CUDSelectQuery1 = Sql.new("d").select(insertColumns1);
            this.with("d(".concat(asToken(insertColumns1), ")"), subQuery);
            this._insert = "(".concat(asToken(insertColumns1), ") ").concat(CUDSelectQuery1);
        }
    };
    _proto._getUpsertToken = function _getUpsertToken(row, key, columns) {
        var ref = _slicedToArray(this._getInsertValuesToken(row, columns), 2), valuesToken = ref[0], upsertColumns = ref[1];
        var insertToken = "(".concat(asToken(upsertColumns), ") VALUES ").concat(valuesToken, " ON CONFLICT (").concat(this._getSelectToken(key), ")");
        if (Array.isArray(key) && key.length === upsertColumns.length || upsertColumns.length === 1) {
            return "".concat(insertToken, " DO NOTHING");
        } else {
            return "".concat(insertToken, " DO UPDATE SET ").concat(this._getUpdateSetToken(upsertColumns, key, "EXCLUDED"));
        }
    };
    _proto._getBulkUpsertToken = function _getBulkUpsertToken(rows, key, columns) {
        var ref = _slicedToArray(this._getBulkInsertValuesToken(rows, columns, DEFAULT), 2), insertValuesArray = ref[0], insertColumns = ref[1];
        var insertToken = "(".concat(asToken(insertColumns), ") VALUES ").concat(asToken(insertValuesArray), " ON CONFLICT (").concat(this._getSelectToken(key), ")");
        if (Array.isArray(key) && key.length === insertColumns.length || insertColumns.length === 1) {
            return "".concat(insertToken, " DO NOTHING");
        } else {
            return "".concat(insertToken, " DO UPDATE SET ").concat(this._getUpdateSetToken(insertColumns, key, "EXCLUDED"));
        }
    };
    _proto._getUpsertQueryToken = function _getUpsertQueryToken(rows, key, columns) {
        var columnsToken = this._getSelectToken(columns);
        var insertToken = "(".concat(columnsToken, ") ").concat(rows.statement(), " ON CONFLICT (").concat(this._getSelectToken(key), ")");
        if (Array.isArray(key) && key.length === columns.length || columns.length === 1) {
            return "".concat(insertToken, " DO NOTHING");
        } else {
            return "".concat(insertToken, " DO UPDATE SET ").concat(this._getUpdateSetToken(columns, key, "EXCLUDED"));
        }
    };
    _proto._getJoinExpr = function _getJoinExpr(a, b, c) {
        if (a === undefined) {
            return this.error("auguments is required for _get_join_expr");
        } else if (b === undefined) {
            return a;
        } else if (c === undefined) {
            return "".concat(a, " = ").concat(b);
        } else {
            return "".concat(a, " ").concat(b, " ").concat(c);
        }
    };
    _proto._getJoinToken = function _getJoinToken(joinType, rightTable, conditions) {
        for(var _len = arguments.length, varargs = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++){
            varargs[_key - 3] = arguments[_key];
        }
        if (conditions !== undefined) {
            return "".concat(joinType, " JOIN ").concat(rightTable, " ON (").concat(this._getJoinExpr.apply(this, [
                conditions
            ].concat(_toConsumableArray(varargs))), ")");
        } else {
            return "".concat(joinType, " JOIN ").concat(rightTable);
        }
    };
    _proto._getInnerJoin = function _getInnerJoin(rightTable, conditions) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        return this._getJoinToken.apply(this, [
            "INNER",
            rightTable,
            conditions
        ].concat(_toConsumableArray(varargs)));
    };
    _proto._getLeftJoin = function _getLeftJoin(rightTable, conditions) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        return this._getJoinToken.apply(this, [
            "LEFT",
            rightTable,
            conditions
        ].concat(_toConsumableArray(varargs)));
    };
    _proto._getRightJoin = function _getRightJoin(rightTable, conditions) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        return this._getJoinToken.apply(this, [
            "RIGHT",
            rightTable,
            conditions
        ].concat(_toConsumableArray(varargs)));
    };
    _proto._getFullJoin = function _getFullJoin(rightTable, conditions) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        return this._getJoinToken.apply(this, [
            "FULL",
            rightTable,
            conditions
        ].concat(_toConsumableArray(varargs)));
    };
    _proto._getInToken = function _getInToken(cols, range) {
        var operator = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "IN";
        cols = asToken(cols);
        if (typeof range === "object") {
            if (_instanceof(range, Sql)) {
                return "(".concat(cols, ") ").concat(operator, " (").concat(range.statement(), ")");
            } else {
                return "(".concat(cols, ") ").concat(operator, " ").concat(asLiteral(range));
            }
        } else {
            return "(".concat(cols, ") ").concat(operator, " ").concat(range);
        }
    };
    _proto._getUpdateQueryToken = function _getUpdateQueryToken(subSelect, columns) {
        return "(".concat(columns && this._getSelectToken(columns) || subSelect._select, ") = (").concat(subSelect.statement(), ")");
    };
    _proto._getJoinConditions = function _getJoinConditions(key, leftTable, rightTable) {
        if (typeof key === "string") {
            return "".concat(leftTable, ".").concat(key, " = ").concat(rightTable, ".").concat(key);
        }
        var res = [];
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = key[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var k = _step.value;
                res.push("".concat(leftTable, ".").concat(k, " = ").concat(rightTable, ".").concat(k));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        return res.join(" AND ");
    };
    _proto._getCteValuesLiteral = function _getCteValuesLiteral(rows, columns) {
        return this._getBulkInsertValuesToken(rows, columns, NULL);
    };
    _proto._handleWhereToken = function _handleWhereToken(whereToken, tpl) {
        if (whereToken === undefined || whereToken === "") {
            return this;
        } else if (this._where === undefined) {
            this._where = whereToken;
        } else {
            this._where = stringFormat(tpl, this._where, whereToken);
        }
        return this;
    };
    _proto._getConditionTokenFromTable = function _getConditionTokenFromTable(kwargs, logic) {
        var tokens = [];
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = Object.entries(kwargs)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var _value = _slicedToArray(_step.value, 2), k = _value[0], value = _value[1];
                tokens.push("".concat(k, " = ").concat(asLiteral(value)));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        if (logic === undefined) {
            return tokens.join(" AND ");
        } else {
            return tokens.join(" " + (logic + " "));
        }
    };
    _proto._getConditionToken = function _getConditionToken(first, second, third) {
        if (first === undefined) {
            return this.error("arguments is required for _get_condition_token");
        } else if (second === undefined) {
            if (typeof first === "object") {
                return this._getConditionTokenFromTable(first);
            } else if (typeof first === "string") {
                return first;
            } else if (typeof first === "function") {
                var _where = this._where;
                delete this._where;
                var res;
                try {
                    res = first.call(this);
                    if (_instanceof(res, Sql)) {
                        var groupWhere = this._where;
                        this._where = _where;
                        if (!groupWhere) {
                            return this.error("no condition made from condition function");
                        }
                        return groupWhere;
                    } else {
                        this._where = _where;
                        return res;
                    }
                } catch (error) {
                    return this.error("condition function raise error:" + error.message);
                }
            } else {
                return this.error("invalid condition type: " + (typeof first === "undefined" ? "undefined" : _typeof(first)));
            }
        } else if (third === undefined) {
            return "".concat(first, " = ").concat(asLiteral(second));
        } else {
            return "".concat(first, " ").concat(second, " ").concat(asLiteral(third));
        }
    };
    _proto._getConditionTokenOr = function _getConditionTokenOr(first, second, third) {
        if (typeof first === "object") {
            return this._getConditionTokenFromTable(first, "OR");
        } else {
            return this._getConditionToken(first, second, third);
        }
    };
    _proto._getConditionTokenNot = function _getConditionTokenNot(first, second, third) {
        var token;
        if (typeof first === "object") {
            token = this._getConditionTokenFromTable(first, "OR");
        } else {
            token = this._getConditionToken(first, second, third);
        }
        return token !== "" ? "NOT (".concat(token, ")") : "";
    };
    _proto._handleSetOption = function _handleSetOption(otherSql, innerAttr) {
        if (!this[innerAttr]) {
            this[innerAttr] = otherSql;
        } else {
            this[innerAttr] = "(".concat(this[innerAttr], ") ").concat(innerAttr.slice(1).toUpperCase(), " (").concat(otherSql.statement(), ")");
        }
        this.statement = this._statementForSet;
        return this;
    };
    _proto._statementForSet = function _statementForSet() {
        var statement = Sql.prototype.statement.call(this);
        if (this._intersect) {
            statement = "(".concat(statement, ") INTERSECT (").concat(this._intersect, ")");
        } else if (this._intersectAll) {
            statement = "(".concat(statement, ") INTERSECT ALL (").concat(this._intersectAll, ")");
        } else if (this._union) {
            statement = "(".concat(statement, ") UNION (").concat(this._union, ")");
        } else if (this._unionAll) {
            statement = "(".concat(statement, ") UNION ALL (").concat(this._unionAll, ")");
        } else if (this._except) {
            statement = "(".concat(statement, ") EXCEPT (").concat(this._except, ")");
        } else if (this._exceptAll) {
            statement = "(".concat(statement, ") EXCEPT ALL (").concat(this._exceptAll, ")");
        }
        return statement;
    };
    _proto.statement = function statement() {
        var tableName = this.getTable();
        var statement1 = assembleSql({
            tableName: tableName,
            with: this._with,
            join: this._join,
            distinct: this._distinct,
            returning: this._returning,
            cteReturning: this._cteReturning,
            insert: this._insert,
            update: this._update,
            delete: this._delete,
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
        return statement1;
    };
    _proto.with = function _with(name, token) {
        var withToken = this._getWithToken(name, token);
        if (this._with) {
            this._with = "".concat(this._with, ", ").concat(withToken);
        } else {
            this._with = withToken;
        }
        return this;
    };
    _proto.union = function union(otherSql) {
        return this._handleSetOption(otherSql, "_union");
    };
    _proto.unionAll = function unionAll(otherSql) {
        return this._handleSetOption(otherSql, "_unionAll");
    };
    _proto.except = function except(otherSql) {
        return this._handleSetOption(otherSql, "_except");
    };
    _proto.exceptAll = function exceptAll(otherSql) {
        return this._handleSetOption(otherSql, "_exceptAll");
    };
    _proto.intersect = function intersect(otherSql) {
        return this._handleSetOption(otherSql, "_intersect");
    };
    _proto.intersectAll = function intersectAll(otherSql) {
        return this._handleSetOption(otherSql, "_intersectAll");
    };
    _proto.as = function as(tableAlias) {
        this._as = tableAlias;
        return this;
    };
    _proto.withValues = function withValues(name, rows) {
        var columns = this._getKeys(rows[0]);
        var ref = _slicedToArray(this._getCteValuesLiteral(rows, columns), 2), withRows = ref[0], withColumns = ref[1];
        var cteName = "".concat(name, "(").concat(withColumns.join(", "), ")");
        var cteValues = "(VALUES ".concat(asToken(withRows), ")");
        return this.with(cteName, cteValues);
    };
    _proto.insert = function insert(rows, columns) {
        if (_instanceof(rows, Sql)) {
            if (rows._select) {
                this._setSelectSubqueryInsertToken(rows, columns);
            } else {
                this._setCUDSubqueryInsertToken(rows);
            }
        } else if (_instanceof(rows, Array)) {
            this._insert = this._getBulkInsertToken(rows, columns);
        } else if (Object.keys(rows).length) {
            this._insert = this._getInsertToken(rows, columns);
        } else {
            return this.error("can't pass empty table to sql.insert");
        }
        return this;
    };
    _proto.update = function update(row, columns) {
        if (typeof row == "string") {
            this._update = row;
        } else if (!_instanceof(row, Sql)) {
            this._update = this._getUpdateToken(row, columns);
        } else {
            this._update = this._getUpdateQueryToken(row, columns);
        }
        return this;
    };
    _proto.upsert = function upsert(rows, key, columns) {
        if (!key) {
            throw new Error("you must provide key for upsert(string or table)");
        }
        if (_instanceof(rows, Sql)) {
            this._insert = this._getUpsertQueryToken(rows, key, columns);
        } else if (_instanceof(rows, Array)) {
            this._insert = this._getBulkUpsertToken(rows, key, columns);
        } else {
            this._insert = this._getUpsertToken(rows, key, columns);
        }
        return this;
    };
    _proto.isInstance = function isInstance(row) {
        return _instanceof(row, Sql);
    };
    _proto.merge = function merge(rows, key, columns) {
        if (rows.length === 0) {
            return this.error("empty rows passed to merge");
        }
        var ref = _slicedToArray(this._getCteValuesLiteral(rows, columns), 2), mergeRows = ref[0], mergeColumns = ref[1];
        var cteName = "V(".concat(mergeColumns.join(", "), ")");
        var cteValues = "(VALUES ".concat(asToken(mergeRows), ")");
        var joinCond = this._getJoinConditions(key, "V", "T");
        var valsColumns = mergeColumns.map(_prefixWithV);
        var insertSubquery = Sql.new("V").select(valsColumns).leftJoin("U AS T", joinCond).whereNull("T." + (Array.isArray(key) ? key[0] : key));
        var updatedSubquery;
        if (Array.isArray(key) && key.length === mergeColumns.length || mergeColumns.length === 1) {
            updatedSubquery = Sql.new("V").select(valsColumns).join(this.tableName + " AS T", joinCond);
        } else {
            updatedSubquery = Sql.new(this.tableName).as("T").update(this._getUpdateSetToken(mergeColumns, key, "V")).from("V").where(joinCond).returning(valsColumns);
        }
        this.with(cteName, cteValues).with("U", updatedSubquery);
        return Sql.prototype.insert.call(this, insertSubquery, columns);
    };
    _proto.updates = function updates(rows, key, columns) {
        if (_instanceof(rows, Sql)) {
            var ref;
            var updatesColumns = columns || ((ref = rows._returningArgs) === null || ref === void 0 ? void 0 : ref.flat().filter(function(e) {
                return typeof e === "string";
            })) || [];
            if (!updatesColumns.length) {
                throw new Error("columns is required when using subquery");
            }
            var cteName = "V(".concat(updatesColumns.join(", "), ")");
            var joinCond = this._getJoinConditions(key, "V", this._as || this.tableName);
            this.with(cteName, rows);
            return Sql.prototype.update.call(this, this._getUpdateSetToken(updatesColumns, key, "V")).from("V").where(joinCond);
        } else if (rows.length === 0) {
            return this.error("empty rows passed to updates");
        } else {
            var ref1 = _slicedToArray(this._getCteValuesLiteral(rows, columns), 2), updatesRows = ref1[0], updatesColumns1 = ref1[1];
            var cteName1 = "V(".concat(updatesColumns1.join(", "), ")");
            var cteValues = "(VALUES ".concat(asToken(updatesRows), ")");
            var joinCond1 = this._getJoinConditions(key, "V", this._as || this.tableName);
            this.with(cteName1, cteValues);
            return Sql.prototype.update.call(this, this._getUpdateSetToken(updatesColumns1, key, "V")).from("V").where(joinCond1);
        }
    };
    _proto.gets = function gets(keys) {
        if (keys.length === 0) {
            return this.error("empty keys passed to gets");
        }
        var columns = this._getKeys(keys[0]);
        var ref = _slicedToArray(this._getCteValuesLiteral(keys, columns), 2), getskeys = ref[0], getsColumns = ref[1];
        var joinCond = this._getJoinConditions(getsColumns, "V", this._as || this.tableName);
        var cteName = "V(".concat(getsColumns.join(", "), ")");
        var cteValues = "(VALUES ".concat(asToken(getskeys), ")");
        return this.with(cteName, cteValues).rightJoin("V", joinCond);
    };
    _proto.mergeGets = function mergeGets(rows, keys) {
        var columns = this._getKeys(rows[0]);
        var ref = _slicedToArray(this._getCteValuesLiteral(rows, columns), 2), getsRows = ref[0], getsColumns = ref[1];
        var joinCond = this._getJoinConditions(keys, "V", this._as || this.tableName);
        var cteName = "V(".concat(getsColumns.join(", "), ")");
        var cteValues = "(VALUES ".concat(asToken(getsRows), ")");
        return Sql.prototype.select.call(this, "V.*").with(cteName, cteValues).rightJoin("V", joinCond);
    };
    _proto.copy = function copy() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    };
    _proto.delete = function _delete(first, second, third) {
        this._delete = true;
        if (first) {
            this.where(first, second, third);
        }
        return this;
    };
    _proto.distinct = function distinct() {
        this._distinct = true;
        return this;
    };
    _proto.select = function select(first, second) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        var s = this._getSelectToken.apply(this, [
            first,
            second
        ].concat(_toConsumableArray(varargs)));
        if (!this._select) {
            this._select = s;
        } else if (s !== undefined && s !== "") {
            this._select = this._select + (", " + s);
        }
        return this;
    };
    _proto.selectLiteral = function selectLiteral(first, second) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        var s = this._getSelectTokenLiteral.apply(this, [
            first,
            second
        ].concat(_toConsumableArray(varargs)));
        if (!this._select) {
            this._select = s;
        } else if (s !== undefined && s !== "") {
            this._select = this._select + (", " + s);
        }
        return this;
    };
    _proto.returning = function returning(first, second) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        var s = this._getSelectToken.apply(this, [
            first,
            second
        ].concat(_toConsumableArray(varargs)));
        if (!this._returning) {
            this._returning = s;
        } else if (s !== undefined && s !== "") {
            this._returning = this._returning + (", " + s);
        } else {
            return this;
        }
        if (this._returningArgs) {
            this._returningArgs = [
                this._returningArgs,
                first,
                second
            ].concat(_toConsumableArray(varargs));
        } else {
            this._returningArgs = [
                first,
                second
            ].concat(_toConsumableArray(varargs));
        }
        return this;
    };
    _proto.returningLiteral = function returningLiteral(first, second) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        var s = this._getSelectTokenLiteral.apply(this, [
            first,
            second
        ].concat(_toConsumableArray(varargs)));
        if (!this._returning) {
            this._returning = s;
        } else if (s !== undefined && s !== "") {
            this._returning = this._returning + (", " + s);
        }
        if (this._returningArgs) {
            this._returningArgs = [
                this._returningArgs,
                first,
                second
            ].concat(_toConsumableArray(varargs));
        } else {
            this._returningArgs = [
                first,
                second
            ].concat(_toConsumableArray(varargs));
        }
        return this;
    };
    _proto.cteReturning = function cteReturning(opts) {
        this._cteReturning = opts;
        return this;
    };
    _proto.group = function group(first, second) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        if (!this._group) {
            this._group = this._getSelectToken.apply(this, [
                first,
                second
            ].concat(_toConsumableArray(varargs)));
        } else {
            this._group = this._group + (", " + this._getSelectToken.apply(this, [
                first,
                second
            ].concat(_toConsumableArray(varargs))));
        }
        return this;
    };
    _proto.groupBy = function groupBy(first, second) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        return this.group.apply(this, [
            first,
            second
        ].concat(_toConsumableArray(varargs)));
    };
    _proto.order = function order(first, second) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        if (!this._order) {
            this._order = this._getSelectToken.apply(this, [
                first,
                second
            ].concat(_toConsumableArray(varargs)));
        } else {
            this._order = this._order + (", " + this._getSelectToken.apply(this, [
                first,
                second
            ].concat(_toConsumableArray(varargs))));
        }
        return this;
    };
    _proto.orderBy = function orderBy(first, second) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        return this.order.apply(this, [
            first,
            second
        ].concat(_toConsumableArray(varargs)));
    };
    _proto._getArgsToken = function _getArgsToken(first, second) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        return this._getSelectToken.apply(this, [
            first,
            second
        ].concat(_toConsumableArray(varargs)));
    };
    _proto.using = function using(first, second) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        this._delete = true;
        this._using = this._getArgsToken.apply(this, [
            first,
            second
        ].concat(_toConsumableArray(varargs)));
        return this;
    };
    _proto.from = function from(first, second) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        if (!this._from) {
            this._from = this._getArgsToken.apply(this, [
                first,
                second
            ].concat(_toConsumableArray(varargs)));
        } else {
            this._from = this._from + (", " + this._getArgsToken.apply(this, [
                first,
                second
            ].concat(_toConsumableArray(varargs))));
        }
        return this;
    };
    _proto.getTable = function getTable() {
        return this._as === undefined && this.tableName || this.tableName + (" AS " + this._as);
    };
    _proto.join = function join(rightTable, conditions) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        var joinToken = this._getInnerJoin.apply(this, [
            rightTable,
            conditions
        ].concat(_toConsumableArray(varargs)));
        this._from = "".concat(this._from || this.getTable(), " ").concat(joinToken);
        return this;
    };
    _proto.innerJoin = function innerJoin(rightTable, conditions) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        return this.join.apply(this, [
            rightTable,
            conditions
        ].concat(_toConsumableArray(varargs)));
    };
    _proto.leftJoin = function leftJoin(rightTable, conditions) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        var joinToken = this._getLeftJoin.apply(this, [
            rightTable,
            conditions
        ].concat(_toConsumableArray(varargs)));
        this._from = "".concat(this._from || this.getTable(), " ").concat(joinToken);
        return this;
    };
    _proto.rightJoin = function rightJoin(rightTable, conditions) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        var joinToken = this._getRightJoin.apply(this, [
            rightTable,
            conditions
        ].concat(_toConsumableArray(varargs)));
        this._from = "".concat(this._from || this.getTable(), " ").concat(joinToken);
        return this;
    };
    _proto.fullJoin = function fullJoin(rightTable, conditions) {
        for(var _len = arguments.length, varargs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            varargs[_key - 2] = arguments[_key];
        }
        var joinToken = this._getFullJoin.apply(this, [
            rightTable,
            conditions
        ].concat(_toConsumableArray(varargs)));
        this._from = "".concat(this._from || this.getTable(), " ").concat(joinToken);
        return this;
    };
    _proto.limit = function limit(n) {
        this._limit = n;
        return this;
    };
    _proto.offset = function offset(n) {
        this._offset = n;
        return this;
    };
    _proto.where = function where(first, second, third) {
        var whereToken = this._getConditionToken(first, second, third);
        return this._handleWhereToken(whereToken, "(%s) AND (%s)");
    };
    _proto.whereOr = function whereOr(first, second, third) {
        var whereToken = this._getConditionTokenOr(first, second, third);
        return this._handleWhereToken(whereToken, "(%s) AND (%s)");
    };
    _proto.orWhereOr = function orWhereOr(first, second, third) {
        var whereToken = this._getConditionTokenOr(first, second, third);
        return this._handleWhereToken(whereToken, "%s OR %s");
    };
    _proto.whereNot = function whereNot(first, second, third) {
        var whereToken = this._getConditionTokenNot(first, second, third);
        return this._handleWhereToken(whereToken, "(%s) AND (%s)");
    };
    _proto.orWhere = function orWhere(first, second, third) {
        var whereToken = this._getConditionToken(first, second, third);
        return this._handleWhereToken(whereToken, "%s OR %s");
    };
    _proto.orWhereNot = function orWhereNot(first, second, third) {
        var whereToken = this._getConditionTokenNot(first, second, third);
        return this._handleWhereToken(whereToken, "%s OR %s");
    };
    _proto.whereExists = function whereExists(builder) {
        if (this._where) {
            this._where = "(".concat(this._where, ") AND EXISTS (").concat(builder.statement(), ")");
        } else {
            this._where = "EXISTS (".concat(builder.statement(), ")");
        }
        return this;
    };
    _proto.whereNotExists = function whereNotExists(builder) {
        if (this._where) {
            this._where = "(".concat(this._where, ") AND NOT EXISTS (").concat(builder.statement(), ")");
        } else {
            this._where = "NOT EXISTS (".concat(builder.statement(), ")");
        }
        return this;
    };
    _proto.whereIn = function whereIn(cols, range) {
        var inToken = this._getInToken(cols, range);
        if (this._where) {
            this._where = "(".concat(this._where, ") AND ").concat(inToken);
        } else {
            this._where = inToken;
        }
        return this;
    };
    _proto.whereNotIn = function whereNotIn(cols, range) {
        var notInToken = this._getInToken(cols, range, "NOT IN");
        if (this._where) {
            this._where = "(".concat(this._where, ") AND ").concat(notInToken);
        } else {
            this._where = notInToken;
        }
        return this;
    };
    _proto.whereNull = function whereNull(col) {
        if (this._where) {
            this._where = "(".concat(this._where, ") AND ").concat(col, " IS NULL");
        } else {
            this._where = col + " IS NULL";
        }
        return this;
    };
    _proto.whereNotNull = function whereNotNull(col) {
        if (this._where) {
            this._where = "(".concat(this._where, ") AND ").concat(col, " IS NOT NULL");
        } else {
            this._where = col + " IS NOT NULL";
        }
        return this;
    };
    _proto.whereBetween = function whereBetween(col, low, high) {
        if (this._where) {
            this._where = "(".concat(this._where, ") AND (").concat(col, " BETWEEN ").concat(low, " AND ").concat(high, ")");
        } else {
            this._where = "".concat(col, " BETWEEN ").concat(low, " AND ").concat(high);
        }
        return this;
    };
    _proto.whereNotBetween = function whereNotBetween(col, low, high) {
        if (this._where) {
            this._where = "(".concat(this._where, ") AND (").concat(col, " NOT BETWEEN ").concat(low, " AND ").concat(high, ")");
        } else {
            this._where = "".concat(col, " NOT BETWEEN ").concat(low, " AND ").concat(high);
        }
        return this;
    };
    _proto.whereRaw = function whereRaw(whereToken) {
        if (whereToken === "") {
            return this;
        } else if (this._where) {
            this._where = "(".concat(this._where, ") AND (").concat(whereToken, ")");
        } else {
            this._where = whereToken;
        }
        return this;
    };
    _proto.orWhereExists = function orWhereExists(builder) {
        if (this._where) {
            this._where = "".concat(this._where, " OR EXISTS (").concat(builder.statement(), ")");
        } else {
            this._where = "EXISTS (".concat(builder, ")");
        }
        return this;
    };
    _proto.orWhereNotExists = function orWhereNotExists(builder) {
        if (this._where) {
            this._where = "".concat(this._where, " OR NOT EXISTS (").concat(builder.statement(), ")");
        } else {
            this._where = "NOT EXISTS (".concat(builder, ")");
        }
        return this;
    };
    _proto.orWhereIn = function orWhereIn(cols, range) {
        var inToken = this._getInToken(cols, range);
        if (this._where) {
            this._where = "".concat(this._where, " OR ").concat(inToken);
        } else {
            this._where = inToken;
        }
        return this;
    };
    _proto.orWhereNotIn = function orWhereNotIn(cols, range) {
        var notInToken = this._getInToken(cols, range, "NOT IN");
        if (this._where) {
            this._where = "".concat(this._where, " OR ").concat(notInToken);
        } else {
            this._where = notInToken;
        }
        return this;
    };
    _proto.orWhereNull = function orWhereNull(col) {
        if (this._where) {
            this._where = "".concat(this._where, " OR ").concat(col, " IS NULL");
        } else {
            this._where = col + " IS NULL";
        }
        return this;
    };
    _proto.orWhereNotNull = function orWhereNotNull(col) {
        if (this._where) {
            this._where = "".concat(this._where, " OR ").concat(col, " IS NOT NULL");
        } else {
            this._where = col + " IS NOT NULL";
        }
        return this;
    };
    _proto.orWhereBetween = function orWhereBetween(col, low, high) {
        if (this._where) {
            this._where = "".concat(this._where, " OR (").concat(col, " BETWEEN ").concat(low, " AND ").concat(high, ")");
        } else {
            this._where = "".concat(col, " BETWEEN ").concat(low, " AND ").concat(high);
        }
        return this;
    };
    _proto.orWhereNotBetween = function orWhereNotBetween(col, low, high) {
        if (this._where) {
            this._where = "".concat(this._where, " OR (").concat(col, " NOT BETWEEN ").concat(low, " AND ").concat(high, ")");
        } else {
            this._where = "".concat(col, " NOT BETWEEN ").concat(low, " AND ").concat(high);
        }
        return this;
    };
    _proto.orWhereRaw = function orWhereRaw(whereToken) {
        if (whereToken === "") {
            return this;
        } else if (this._where) {
            this._where = "".concat(this._where, " OR ").concat(whereToken);
        } else {
            this._where = whereToken;
        }
        return this;
    };
    _proto.having = function having(first, second, third) {
        if (this._having) {
            this._having = "(".concat(this._having, ") AND (").concat(this._getConditionToken(first, second, third), ")");
        } else {
            this._having = this._getConditionToken(first, second, third);
        }
        return this;
    };
    _proto.havingNot = function havingNot(first, second, third) {
        if (this._having) {
            this._having = "(".concat(this._having, ") AND (").concat(this._getConditionTokenNot(first, second, third), ")");
        } else {
            this._having = this._getConditionTokenNot(first, second, third);
        }
        return this;
    };
    _proto.havingExists = function havingExists(builder) {
        if (this._having) {
            this._having = "(".concat(this._having, ") AND EXISTS (").concat(builder.statement(), ")");
        } else {
            this._having = "EXISTS (".concat(builder.statement(), ")");
        }
        return this;
    };
    _proto.havingNotExists = function havingNotExists(builder) {
        if (this._having) {
            this._having = "(".concat(this._having, ") AND NOT EXISTS (").concat(builder.statement(), ")");
        } else {
            this._having = "NOT EXISTS (".concat(builder.statement(), ")");
        }
        return this;
    };
    _proto.havingIn = function havingIn(cols, range) {
        var inToken = this._getInToken(cols, range);
        if (this._having) {
            this._having = "(".concat(this._having, ") AND ").concat(inToken);
        } else {
            this._having = inToken;
        }
        return this;
    };
    _proto.havingNotIn = function havingNotIn(cols, range) {
        var notInToken = this._getInToken(cols, range, "NOT IN");
        if (this._having) {
            this._having = "(".concat(this._having, ") AND ").concat(notInToken);
        } else {
            this._having = notInToken;
        }
        return this;
    };
    _proto.havingNull = function havingNull(col) {
        if (this._having) {
            this._having = "(".concat(this._having, ") AND ").concat(col, " IS NULL");
        } else {
            this._having = col + " IS NULL";
        }
        return this;
    };
    _proto.havingNotNull = function havingNotNull(col) {
        if (this._having) {
            this._having = "(".concat(this._having, ") AND ").concat(col, " IS NOT NULL");
        } else {
            this._having = col + " IS NOT NULL";
        }
        return this;
    };
    _proto.havingBetween = function havingBetween(col, low, high) {
        if (this._having) {
            this._having = "(".concat(this._having, ") AND (").concat(col, " BETWEEN ").concat(low, " AND ").concat(high, ")");
        } else {
            this._having = "".concat(col, " BETWEEN ").concat(low, " AND ").concat(high);
        }
        return this;
    };
    _proto.havingNotBetween = function havingNotBetween(col, low, high) {
        if (this._having) {
            this._having = "(".concat(this._having, ") AND (").concat(col, " NOT BETWEEN ").concat(low, " AND ").concat(high, ")");
        } else {
            this._having = "".concat(col, " NOT BETWEEN ").concat(low, " AND ").concat(high);
        }
        return this;
    };
    _proto.havingRaw = function havingRaw(token) {
        if (this._having) {
            this._having = "(".concat(this._having, ") AND (").concat(token, ")");
        } else {
            this._having = token;
        }
        return this;
    };
    _proto.orHaving = function orHaving(first, second, third) {
        if (this._having) {
            this._having = "".concat(this._having, " OR ").concat(this._getConditionToken(first, second, third));
        } else {
            this._having = this._getConditionToken(first, second, third);
        }
        return this;
    };
    _proto.orHavingNot = function orHavingNot(first, second, third) {
        if (this._having) {
            this._having = "".concat(this._having, " OR ").concat(this._getConditionTokenNot(first, second, third));
        } else {
            this._having = this._getConditionTokenNot(first, second, third);
        }
        return this;
    };
    _proto.orHavingExists = function orHavingExists(builder) {
        if (this._having) {
            this._having = "".concat(this._having, " OR EXISTS (").concat(builder.statement(), ")");
        } else {
            this._having = "EXISTS (".concat(builder.statement(), ")");
        }
        return this;
    };
    _proto.orHavingNotExists = function orHavingNotExists(builder) {
        if (this._having) {
            this._having = "".concat(this._having, " OR NOT EXISTS (").concat(builder.statement(), ")");
        } else {
            this._having = "NOT EXISTS (".concat(builder.statement(), ")");
        }
        return this;
    };
    _proto.orHavingIn = function orHavingIn(cols, range) {
        var inToken = this._getInToken(cols, range);
        if (this._having) {
            this._having = "".concat(this._having, " OR ").concat(inToken);
        } else {
            this._having = inToken;
        }
        return this;
    };
    _proto.orHavingNotIn = function orHavingNotIn(cols, range) {
        var notInToken = this._getInToken(cols, range, "NOT IN");
        if (this._having) {
            this._having = "".concat(this._having, " OR ").concat(notInToken);
        } else {
            this._having = notInToken;
        }
        return this;
    };
    _proto.orHavingNull = function orHavingNull(col) {
        if (this._having) {
            this._having = "".concat(this._having, " OR ").concat(col, " IS NULL");
        } else {
            this._having = col + " IS NULL";
        }
        return this;
    };
    _proto.orHavingNotNull = function orHavingNotNull(col) {
        if (this._having) {
            this._having = "".concat(this._having, " OR ").concat(col, " IS NOT NULL");
        } else {
            this._having = col + " IS NOT NULL";
        }
        return this;
    };
    _proto.orHavingBetween = function orHavingBetween(col, low, high) {
        if (this._having) {
            this._having = "".concat(this._having, " OR (").concat(col, " BETWEEN ").concat(low, " AND ").concat(high, ")");
        } else {
            this._having = "".concat(col, " BETWEEN ").concat(low, " AND ").concat(high);
        }
        return this;
    };
    _proto.orHavingNotBetween = function orHavingNotBetween(col, low, high) {
        if (this._having) {
            this._having = "".concat(this._having, " OR (").concat(col, " NOT BETWEEN ").concat(low, " AND ").concat(high, ")");
        } else {
            this._having = "".concat(col, " NOT BETWEEN ").concat(low, " AND ").concat(high);
        }
        return this;
    };
    _proto.orHavingRaw = function orHavingRaw(token) {
        if (this._having) {
            this._having = "".concat(this._having, " OR ").concat(token);
        } else {
            this._having = token;
        }
        return this;
    };
    Sql.new = function _new(tableName) {
        return new this(tableName);
    };
    return Sql;
}();
Sql.r = makeRawToken;
Sql.DEFAULT = DEFAULT;
Sql.NULL = NULL;
Sql.asToken = asToken;
Sql.asLiteral = asLiteral;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNxbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ0eXBlIERCVmFsdWUgPSBzdHJpbmcgfCBudW1iZXIgfCBiaWdpbnQgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCB8ICgoKSA9PiBzdHJpbmcpIHwgREJWYWx1ZVtdO1xudHlwZSBSb3cgPSB7IFtrZXk6IHN0cmluZ106IERCVmFsdWUgfTtcbnR5cGUgU3FsVmFsdWUgPSBEQlZhbHVlIHwgU3FsO1xudHlwZSBTcWxTZXJpYWxpemVyID0gKHZhbHVlOiBTcWxWYWx1ZSkgPT4gc3RyaW5nO1xudHlwZSBLZXlFeGlzdCA9IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9O1xudHlwZSBDdGVSZXR1cm5pbmdPcHRzID0geyBjb2x1bW5zOiBzdHJpbmdbXTsgbGl0ZXJhbHM6IERCVmFsdWVbXTsgbGl0ZXJhbENvbHVtbnM6IHN0cmluZ1tdIH07XG50eXBlIENvbmRpdGlvblRhYmxlID0geyBbczogc3RyaW5nXTogREJWYWx1ZSB9O1xudHlwZSBDb25kaXRpb24gPSBDb25kaXRpb25UYWJsZSB8IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcgfCBTcWwpO1xudHlwZSBJbm5lclNldFByb3BlcnR5ID0gXCJfdW5pb25cIiB8IFwiX3VuaW9uQWxsXCIgfCBcIl9leGNlcHRcIiB8IFwiX2V4Y2VwdEFsbFwiIHwgXCJfaW50ZXJzZWN0XCIgfCBcIl9pbnRlcnNlY3RBbGxcIjtcbnR5cGUgU3FsQXNzZW1ibGVPcHRzID0ge1xuICB0YWJsZU5hbWU6IHN0cmluZztcbiAgd2l0aD86IHN0cmluZztcbiAgam9pbj86IHN0cmluZztcbiAgZGlzdGluY3Q/OiBib29sZWFuO1xuICByZXR1cm5pbmc/OiBzdHJpbmc7XG4gIGN0ZVJldHVybmluZz86IEN0ZVJldHVybmluZ09wdHM7XG4gIGluc2VydD86IHN0cmluZztcbiAgdXBkYXRlPzogc3RyaW5nO1xuICBkZWxldGU/OiBib29sZWFuO1xuICB1c2luZz86IHN0cmluZztcbiAgc2VsZWN0Pzogc3RyaW5nO1xuICBmcm9tPzogc3RyaW5nO1xuICB3aGVyZT86IHN0cmluZztcbiAgZ3JvdXA/OiBzdHJpbmc7XG4gIGhhdmluZz86IHN0cmluZztcbiAgb3JkZXI/OiBzdHJpbmc7XG4gIGxpbWl0PzogbnVtYmVyO1xuICBvZmZzZXQ/OiBudW1iZXI7XG59O1xuXG5mdW5jdGlvbiBtYWtlUmF3VG9rZW4oczogc3RyaW5nKSB7XG4gIGZ1bmN0aW9uIHJhd1Rva2VuKCkge1xuICAgIHJldHVybiBzO1xuICB9XG4gIHJldHVybiByYXdUb2tlbjtcbn1cbmNvbnN0IERFRkFVTFQgPSBtYWtlUmF3VG9rZW4oXCJERUZBVUxUXCIpO1xuY29uc3QgTlVMTCA9IG1ha2VSYXdUb2tlbihcIk5VTExcIik7XG5cbmNvbnN0IHN0cmluZ0Zvcm1hdCA9IChzOiBzdHJpbmcsIC4uLnZhcmFyZ3M6IHN0cmluZ1tdKTogc3RyaW5nID0+IHtcbiAgbGV0IHN0YXR1cyA9IDA7XG4gIGxldCByZXM6IHN0cmluZ1tdID0gW107XG4gIGxldCBqID0gLTE7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGMgPSBzW2ldO1xuICAgIGlmIChjID09PSBcIiVcIikge1xuICAgICAgaWYgKHN0YXR1cyA9PT0gMCkge1xuICAgICAgICBzdGF0dXMgPSAxO1xuICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IDEpIHtcbiAgICAgICAgc3RhdHVzID0gMDtcbiAgICAgICAgcmVzLnB1c2goXCIlXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYyA9PT0gXCJzXCIgJiYgc3RhdHVzID09PSAxKSB7XG4gICAgICBqID0gaiArIDE7XG4gICAgICByZXMucHVzaCh2YXJhcmdzW2pdKTtcbiAgICAgIHN0YXR1cyA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5wdXNoKGMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzLmpvaW4oXCJcIik7XG59O1xuXG5mdW5jdGlvbiBfcHJlZml4V2l0aFYoY29sdW1uOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFwiVi5cIiArIGNvbHVtbjtcbn1cblxuZnVuY3Rpb24gX2VzY2FwZUZhY3RvcnkoaXNMaXRlcmFsOiBib29sZWFuLCBpc0JyYWNrZXQ6IGJvb2xlYW4pOiBTcWxTZXJpYWxpemVyIHtcbiAgZnVuY3Rpb24gYXNTcWxUb2tlbih2YWx1ZTogU3FsVmFsdWUpOiBzdHJpbmcge1xuICAgIGlmIChcInN0cmluZ1wiID09PSB0eXBlb2YgdmFsdWUpIHtcbiAgICAgIGlmIChpc0xpdGVyYWwpIHtcbiAgICAgICAgcmV0dXJuIFwiJ1wiICsgdmFsdWUucmVwbGFjZUFsbChcIidcIiwgXCInJ1wiKSArIFwiJ1wiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXCJudW1iZXJcIiA9PT0gdHlwZW9mIHZhbHVlIHx8IFwiYmlnaW50XCIgPT09IHR5cGVvZiB2YWx1ZSkge1xuICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChcImJvb2xlYW5cIiA9PT0gdHlwZW9mIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IHRydWUgPyBcIlRSVUVcIiA6IFwiRkFMU0VcIjtcbiAgICB9IGVsc2UgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUoKTtcbiAgICB9IGVsc2UgaWYgKG51bGwgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gXCJOVUxMXCI7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFNxbCkge1xuICAgICAgcmV0dXJuIFwiKFwiICsgdmFsdWUuc3RhdGVtZW50KCkgKyBcIilcIjtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImVtcHR5IGFycmF5IGFzIFNxbCB2YWx1ZSBpcyBub3QgYWxsb3dlZFwiKTtcbiAgICAgIH1cbiAgICAgIGxldCB0b2tlbiA9IHZhbHVlLm1hcChhc1NxbFRva2VuKS5qb2luKFwiLCBcIik7XG4gICAgICBpZiAoaXNCcmFja2V0KSB7XG4gICAgICAgIHJldHVybiBcIihcIiArIHRva2VuICsgXCIpXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgZG9uJ3Qga25vdyBob3cgdG8gZXNjYXBlIHZhbHVlOiAke3ZhbHVlfSAoJHt0eXBlb2YgdmFsdWV9KWApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXNTcWxUb2tlbjtcbn1cbmNvbnN0IGFzTGl0ZXJhbCA9IF9lc2NhcGVGYWN0b3J5KHRydWUsIHRydWUpO1xuY29uc3QgYXNUb2tlbiA9IF9lc2NhcGVGYWN0b3J5KGZhbHNlLCBmYWxzZSk7XG5cbmZ1bmN0aW9uIGdldEN0ZVJldHVybmluZ1ZhbHVlcyhvcHRzOiBDdGVSZXR1cm5pbmdPcHRzKSB7XG4gIGxldCB2YWx1ZXM6IHN0cmluZ1tdID0gW107XG4gIGZvciAobGV0IGNvbCBvZiBvcHRzLmNvbHVtbnMpIHtcbiAgICB2YWx1ZXMucHVzaChhc1Rva2VuKGNvbCkpO1xuICB9XG4gIGlmIChvcHRzLmxpdGVyYWxzKSB7XG4gICAgZm9yIChsZXQgZSBvZiBvcHRzLmxpdGVyYWxzKSB7XG4gICAgICB2YWx1ZXMucHVzaChhc0xpdGVyYWwoZSkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWVzO1xufVxuXG5mdW5jdGlvbiBnZXRSZXR1cm5pbmdUb2tlbihvcHRzOiB7IGN0ZVJldHVybmluZz86IEN0ZVJldHVybmluZ09wdHM7IHJldHVybmluZz86IHN0cmluZyB9KSB7XG4gIGlmIChvcHRzLmN0ZVJldHVybmluZykge1xuICAgIHJldHVybiBcIiBSRVRVUk5JTkcgXCIgKyBhc1Rva2VuKGdldEN0ZVJldHVybmluZ1ZhbHVlcyhvcHRzLmN0ZVJldHVybmluZykpO1xuICB9IGVsc2UgaWYgKG9wdHMucmV0dXJuaW5nKSB7XG4gICAgcmV0dXJuIFwiIFJFVFVSTklORyBcIiArIG9wdHMucmV0dXJuaW5nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VtYmxlU3FsKG9wdHM6IFNxbEFzc2VtYmxlT3B0cyk6IHN0cmluZyB7XG4gIGxldCBzdGF0ZW1lbnQ7XG4gIGlmIChvcHRzLnVwZGF0ZSkge1xuICAgIGxldCBmcm9tID0gKG9wdHMuZnJvbSAmJiBcIiBGUk9NIFwiICsgb3B0cy5mcm9tKSB8fCBcIlwiO1xuICAgIGxldCB3aGVyZSA9IChvcHRzLndoZXJlICYmIFwiIFdIRVJFIFwiICsgb3B0cy53aGVyZSkgfHwgXCJcIjtcbiAgICBsZXQgcmV0dXJuaW5nID0gZ2V0UmV0dXJuaW5nVG9rZW4ob3B0cyk7XG4gICAgc3RhdGVtZW50ID0gYFVQREFURSAke29wdHMudGFibGVOYW1lfSBTRVQgJHtvcHRzLnVwZGF0ZX0ke2Zyb219JHt3aGVyZX0ke3JldHVybmluZ31gO1xuICB9IGVsc2UgaWYgKG9wdHMuaW5zZXJ0KSB7XG4gICAgbGV0IHJldHVybmluZyA9IGdldFJldHVybmluZ1Rva2VuKG9wdHMpO1xuICAgIHN0YXRlbWVudCA9IGBJTlNFUlQgSU5UTyAke29wdHMudGFibGVOYW1lfSAke29wdHMuaW5zZXJ0fSR7cmV0dXJuaW5nfWA7XG4gIH0gZWxzZSBpZiAob3B0cy5kZWxldGUpIHtcbiAgICBsZXQgdXNpbmcgPSAob3B0cy51c2luZyAmJiBcIiBVU0lORyBcIiArIG9wdHMudXNpbmcpIHx8IFwiXCI7XG4gICAgbGV0IHdoZXJlID0gKG9wdHMud2hlcmUgJiYgXCIgV0hFUkUgXCIgKyBvcHRzLndoZXJlKSB8fCBcIlwiO1xuICAgIGxldCByZXR1cm5pbmcgPSBnZXRSZXR1cm5pbmdUb2tlbihvcHRzKTtcbiAgICBzdGF0ZW1lbnQgPSBgREVMRVRFIEZST00gJHtvcHRzLnRhYmxlTmFtZX0gJHt1c2luZ30ke3doZXJlfSR7cmV0dXJuaW5nfWA7XG4gIH0gZWxzZSB7XG4gICAgbGV0IGZyb20gPSBvcHRzLmZyb20gfHwgb3B0cy50YWJsZU5hbWU7XG4gICAgbGV0IHdoZXJlID0gKG9wdHMud2hlcmUgJiYgXCIgV0hFUkUgXCIgKyBvcHRzLndoZXJlKSB8fCBcIlwiO1xuICAgIGxldCBncm91cCA9IChvcHRzLmdyb3VwICYmIFwiIEdST1VQIEJZIFwiICsgb3B0cy5ncm91cCkgfHwgXCJcIjtcbiAgICBsZXQgaGF2aW5nID0gKG9wdHMuaGF2aW5nICYmIFwiIEhBVklORyBcIiArIG9wdHMuaGF2aW5nKSB8fCBcIlwiO1xuICAgIGxldCBvcmRlciA9IChvcHRzLm9yZGVyICYmIFwiIE9SREVSIEJZIFwiICsgb3B0cy5vcmRlcikgfHwgXCJcIjtcbiAgICBsZXQgbGltaXQgPSAob3B0cy5saW1pdCAmJiBcIiBMSU1JVCBcIiArIG9wdHMubGltaXQpIHx8IFwiXCI7XG4gICAgbGV0IG9mZnNldCA9IChvcHRzLm9mZnNldCAmJiBcIiBPRkZTRVQgXCIgKyBvcHRzLm9mZnNldCkgfHwgXCJcIjtcbiAgICBzdGF0ZW1lbnQgPSBgU0VMRUNUICR7KG9wdHMuZGlzdGluY3QgJiYgXCJESVNUSU5DVCBcIikgfHwgXCJcIn0ke1xuICAgICAgb3B0cy5zZWxlY3QgfHwgXCIqXCJcbiAgICB9IEZST00gJHtmcm9tfSR7d2hlcmV9JHtncm91cH0ke2hhdmluZ30ke29yZGVyfSR7bGltaXR9JHtvZmZzZXR9YDtcbiAgfVxuICByZXR1cm4gKG9wdHMud2l0aCAmJiBgV0lUSCAke29wdHMud2l0aH0gJHtzdGF0ZW1lbnR9YCkgfHwgc3RhdGVtZW50O1xufVxuXG5leHBvcnQgY2xhc3MgU3FsIHtcbiAgc3RhdGljIHIgPSBtYWtlUmF3VG9rZW47XG4gIHN0YXRpYyBERUZBVUxUID0gREVGQVVMVDtcbiAgc3RhdGljIE5VTEwgPSBOVUxMO1xuICBzdGF0aWMgYXNUb2tlbiA9IGFzVG9rZW47XG4gIHN0YXRpYyBhc0xpdGVyYWwgPSBhc0xpdGVyYWw7XG4gIHN0YXRpYyBuZXcodGFibGVOYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IHRoaXModGFibGVOYW1lKTtcbiAgfVxuICB0YWJsZU5hbWU6IHN0cmluZztcbiAgX2FzPzogc3RyaW5nO1xuICBfd2l0aD86IHN0cmluZztcbiAgX2pvaW4/OiBzdHJpbmc7XG4gIF9kaXN0aW5jdD86IGJvb2xlYW47XG4gIF9yZXR1cm5pbmc/OiBzdHJpbmc7XG4gIF9jdGVSZXR1cm5pbmc/OiBDdGVSZXR1cm5pbmdPcHRzO1xuICBfcmV0dXJuaW5nQXJncz86IERCVmFsdWVbXTtcbiAgX2luc2VydD86IHN0cmluZztcbiAgX3VwZGF0ZT86IHN0cmluZztcbiAgX2RlbGV0ZT86IGJvb2xlYW47XG4gIF91c2luZz86IHN0cmluZztcbiAgX3NlbGVjdD86IHN0cmluZztcbiAgX2Zyb20/OiBzdHJpbmc7XG4gIF93aGVyZT86IHN0cmluZztcbiAgX2dyb3VwPzogc3RyaW5nO1xuICBfaGF2aW5nPzogc3RyaW5nO1xuICBfb3JkZXI/OiBzdHJpbmc7XG4gIF9saW1pdD86IG51bWJlcjtcbiAgX29mZnNldD86IG51bWJlcjtcbiAgX3VuaW9uPzogU3FsIHwgc3RyaW5nO1xuICBfdW5pb25BbGw/OiBTcWwgfCBzdHJpbmc7XG4gIF9leGNlcHQ/OiBTcWwgfCBzdHJpbmc7XG4gIF9leGNlcHRBbGw/OiBTcWwgfCBzdHJpbmc7XG4gIF9pbnRlcnNlY3Q/OiBTcWwgfCBzdHJpbmc7XG4gIF9pbnRlcnNlY3RBbGw/OiBTcWwgfCBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKHRhYmxlTmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy50YWJsZU5hbWUgPSB0YWJsZU5hbWU7XG4gIH1cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVtZW50KCk7XG4gIH1cbiAgZXJyb3IoZXJyTXNnOiBzdHJpbmcgfCBFcnJvciB8IG9iamVjdCk6IG5ldmVyIHtcbiAgICBpZiAodHlwZW9mIGVyck1zZyA9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyTXNnKTtcbiAgICB9IGVsc2UgaWYgKGVyck1zZyBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICB0aHJvdyBlcnJNc2c7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVyck1zZztcbiAgICB9XG4gIH1cbiAgX2dldEtleXMocm93czogUm93W10gfCBSb3cpIHtcbiAgICBsZXQgY29sdW1uczogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAocm93cyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBsZXQgZDogS2V5RXhpc3QgPSB7fTtcbiAgICAgIGZvciAobGV0IHJvdyBvZiByb3dzKSB7XG4gICAgICAgIGZvciAobGV0IGsgb2YgT2JqZWN0LmtleXMocm93KSkge1xuICAgICAgICAgIGlmICghZFtrXSkge1xuICAgICAgICAgICAgZFtrXSA9IHRydWU7XG4gICAgICAgICAgICBjb2x1bW5zLnB1c2goayk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGsgb2YgT2JqZWN0LmtleXMocm93cykpIHtcbiAgICAgICAgY29sdW1ucy5wdXNoKGspO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29sdW1ucztcbiAgfVxuICBfcm93c1RvQXJyYXkocm93czogUm93W10sIGNvbHVtbnM6IHN0cmluZ1tdLCBmYWxsYmFjayA9IERFRkFVTFQpOiBEQlZhbHVlW11bXSB7XG4gICAgbGV0IGMgPSBjb2x1bW5zLmxlbmd0aDtcbiAgICBsZXQgbiA9IHJvd3MubGVuZ3RoO1xuICAgIGxldCByZXM6IERCVmFsdWVbXVtdID0gbmV3IEFycmF5KG4pO1xuICAgIGZvciAobGV0IHIgPSAwOyByIDwgbjsgciA9IHIgKyAxKSB7XG4gICAgICByZXNbcl0gPSBuZXcgQXJyYXkoYyk7XG4gICAgfVxuICAgIGZvciAobGV0IFtpLCBjb2xdIG9mIGNvbHVtbnMuZW50cmllcygpKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG47IGogPSBqICsgMSkge1xuICAgICAgICBsZXQgdiA9IHJvd3Nbal1bY29sXTtcbiAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlc1tqXVtpXSA9IHY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzW2pdW2ldID0gZmFsbGJhY2s7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBfZ2V0SW5zZXJ0VmFsdWVzVG9rZW4ocm93OiBSb3csIGNvbHVtbnM/OiBzdHJpbmdbXSk6IFtzdHJpbmcsIHN0cmluZ1tdXSB7XG4gICAgbGV0IHZhbHVlTGlzdDogREJWYWx1ZVtdID0gW107XG4gICAgaWYgKCFjb2x1bW5zKSB7XG4gICAgICBjb2x1bW5zID0gW107XG4gICAgICBmb3IgKGxldCBbaywgdl0gb2YgT2JqZWN0LmVudHJpZXMocm93KSkge1xuICAgICAgICBjb2x1bW5zLnB1c2goayk7XG4gICAgICAgIHZhbHVlTGlzdC5wdXNoKHYpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBjb2wgb2YgY29sdW1ucykge1xuICAgICAgICBsZXQgZSA9IHJvd1tjb2xdO1xuICAgICAgICBpZiAoZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdmFsdWVMaXN0LnB1c2goZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsdWVMaXN0LnB1c2goREVGQVVMVCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFthc0xpdGVyYWwodmFsdWVMaXN0KSwgY29sdW1uc107XG4gIH1cbiAgX2dldEJ1bGtJbnNlcnRWYWx1ZXNUb2tlbihyb3dzOiBSb3dbXSwgY29sdW1ucz86IHN0cmluZ1tdLCBmYWxsYmFjayA9IERFRkFVTFQpOiBbc3RyaW5nW10sIHN0cmluZ1tdXSB7XG4gICAgY29sdW1ucyA9IGNvbHVtbnMgfHwgdGhpcy5fZ2V0S2V5cyhyb3dzKTtcbiAgICByZXR1cm4gW3RoaXMuX3Jvd3NUb0FycmF5KHJvd3MsIGNvbHVtbnMsIGZhbGxiYWNrKS5tYXAoYXNMaXRlcmFsKSwgY29sdW1uc107XG4gIH1cbiAgX2dldFVwZGF0ZVNldFRva2VuKGNvbHVtbnM6IHN0cmluZ1tdLCBrZXk6IHN0cmluZyB8IHN0cmluZ1tdLCB0YWJsZU5hbWU6IHN0cmluZykge1xuICAgIGxldCB0b2tlbnMgPSBbXTtcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgZm9yIChsZXQgY29sIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgaWYgKGNvbCAhPT0ga2V5KSB7XG4gICAgICAgICAgdG9rZW5zLnB1c2goYCR7Y29sfSA9ICR7dGFibGVOYW1lfS4ke2NvbH1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc2V0czogS2V5RXhpc3QgPSB7fTtcbiAgICAgIGZvciAobGV0IGsgb2Yga2V5KSB7XG4gICAgICAgIHNldHNba10gPSB0cnVlO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgY29sIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgaWYgKCFzZXRzW2NvbF0pIHtcbiAgICAgICAgICB0b2tlbnMucHVzaChgJHtjb2x9ID0gJHt0YWJsZU5hbWV9LiR7Y29sfWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b2tlbnMuam9pbihcIiwgXCIpO1xuICB9XG4gIF9nZXRTZWxlY3RUb2tlbihhOiBEQlZhbHVlLCBiPzogREJWYWx1ZSwgLi4udmFyYXJnczogREJWYWx1ZVtdKTogc3RyaW5nIHtcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvcihcImF1Z3VtZW50IGlzIHJlcXVpcmVkIGZvciBfZ2V0X3NlbGVjdF90b2tlblwiKTtcbiAgICB9IGVsc2UgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGFzVG9rZW4oYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzID0gYXNUb2tlbihhKSArIFwiLCBcIiArIGFzVG9rZW4oYik7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhcmFyZ3MubGVuZ3RoOyBpID0gaSArIDEpIHtcbiAgICAgICAgcyA9IHMgKyBcIiwgXCIgKyBhc1Rva2VuKHZhcmFyZ3NbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICB9XG4gIF9nZXRTZWxlY3RUb2tlbkxpdGVyYWwoZmlyc3Q6IERCVmFsdWUsIHNlY29uZDogREJWYWx1ZSwgLi4udmFyYXJnczogREJWYWx1ZVtdKTogc3RyaW5nIHtcbiAgICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3IoXCJhcmd1bWVudHMgbXVzdCBiZSBwcm92aWRlZCBmb3IgX2dldF9zZWxlY3RfdG9rZW5fbGl0ZXJhbFwiKTtcbiAgICB9IGVsc2UgaWYgKHNlY29uZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodHlwZW9mIGZpcnN0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiBhc0xpdGVyYWwoZmlyc3QpO1xuICAgICAgfSBlbHNlIGlmIChmaXJzdCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGxldCB0b2tlbnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaXJzdC5sZW5ndGg7IGkgPSBpICsgMSkge1xuICAgICAgICAgIHRva2Vuc1tpXSA9IGFzTGl0ZXJhbChmaXJzdFtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFzVG9rZW4odG9rZW5zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhc0xpdGVyYWwoZmlyc3QpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcyA9IGFzTGl0ZXJhbChmaXJzdCkgKyBcIiwgXCIgKyBhc0xpdGVyYWwoc2Vjb25kKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFyYXJncy5sZW5ndGg7IGkgPSBpICsgMSkge1xuICAgICAgICBsZXQgbmFtZSA9IHZhcmFyZ3NbaV07XG4gICAgICAgIHMgPSBzICsgXCIsIFwiICsgYXNMaXRlcmFsKG5hbWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICB9XG4gIF9nZXRVcGRhdGVUb2tlbihyb3c6IFJvdywgY29sdW1ucz86IHN0cmluZ1tdKSB7XG4gICAgbGV0IGt2OiBzdHJpbmdbXSA9IFtdO1xuICAgIGlmICghY29sdW1ucykge1xuICAgICAgZm9yIChsZXQgW2ssIHZdIG9mIE9iamVjdC5lbnRyaWVzKHJvdykpIHtcbiAgICAgICAga3YucHVzaChgJHtrfSA9ICR7YXNMaXRlcmFsKHYpfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBrIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgbGV0IHYgPSByb3dba107XG4gICAgICAgIGt2LnB1c2goYCR7a30gPSAkeyh2ICE9PSB1bmRlZmluZWQgJiYgYXNMaXRlcmFsKHYpKSB8fCBcIkRFRkFVTFRcIn1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGt2LmpvaW4oXCIsIFwiKTtcbiAgfVxuICBfZ2V0V2l0aFRva2VuKG5hbWU6IHN0cmluZywgdG9rZW4/OiBTcWxWYWx1ZSkge1xuICAgIGlmICh0b2tlbiBpbnN0YW5jZW9mIFNxbCkge1xuICAgICAgcmV0dXJuIGAke25hbWV9IEFTICgke3Rva2VuLnN0YXRlbWVudCgpfSlgO1xuICAgIH0gZWxzZSBpZiAodG9rZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGAke25hbWV9IEFTICR7dG9rZW59YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFzVG9rZW4obmFtZSk7XG4gICAgfVxuICB9XG4gIF9nZXRJbnNlcnRUb2tlbihyb3c6IFJvdywgY29sdW1ucz86IHN0cmluZ1tdKSB7XG4gICAgY29uc3QgW2luc2VydFZhbHVlcywgaW5zZXJ0Q29sdW1uc10gPSB0aGlzLl9nZXRJbnNlcnRWYWx1ZXNUb2tlbihyb3csIGNvbHVtbnMpO1xuICAgIHJldHVybiBgKCR7YXNUb2tlbihpbnNlcnRDb2x1bW5zKX0pIFZBTFVFUyAke2luc2VydFZhbHVlc31gO1xuICB9XG4gIF9nZXRCdWxrSW5zZXJ0VG9rZW4ocm93czogUm93W10sIGNvbHVtbnM/OiBzdHJpbmdbXSkge1xuICAgIGNvbnN0IFtpbnNlcnRWYWx1ZXNBcnJheSwgaW5zZXJ0Q29sdW1uc10gPSB0aGlzLl9nZXRCdWxrSW5zZXJ0VmFsdWVzVG9rZW4ocm93cywgY29sdW1ucywgREVGQVVMVCk7XG4gICAgcmV0dXJuIGAoJHthc1Rva2VuKGluc2VydENvbHVtbnMpfSkgVkFMVUVTICR7YXNUb2tlbihpbnNlcnRWYWx1ZXNBcnJheSl9YDtcbiAgfVxuICBfc2V0U2VsZWN0U3VicXVlcnlJbnNlcnRUb2tlbihzdWJRdWVyeTogU3FsLCBjb2x1bW5zPzogc3RyaW5nW10pIHtcbiAgICBjb25zdCBjb2x1bW5zVG9rZW4gPSBhc1Rva2VuKGNvbHVtbnMgfHwgc3ViUXVlcnkuX3NlbGVjdCB8fCBcIlwiKTtcbiAgICBpZiAoY29sdW1uc1Rva2VuICE9PSBcIlwiKSB7XG4gICAgICB0aGlzLl9pbnNlcnQgPSBgKCR7Y29sdW1uc1Rva2VufSkgJHtzdWJRdWVyeS5zdGF0ZW1lbnQoKX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pbnNlcnQgPSBzdWJRdWVyeS5zdGF0ZW1lbnQoKTtcbiAgICB9XG4gIH1cbiAgX3NldENVRFN1YnF1ZXJ5SW5zZXJ0VG9rZW4oc3ViUXVlcnk6IFNxbCkge1xuICAgIGlmIChzdWJRdWVyeS5fY3RlUmV0dXJuaW5nKSB7XG4gICAgICBsZXQgY3IgPSBzdWJRdWVyeS5fY3RlUmV0dXJuaW5nO1xuICAgICAgbGV0IGN0ZUNvbHVtbnMgPSBjci5jb2x1bW5zO1xuICAgICAgbGV0IGluc2VydENvbHVtbnMgPSBbLi4uY3RlQ29sdW1ucywgLi4uY3IubGl0ZXJhbENvbHVtbnNdO1xuICAgICAgbGV0IENVRFNlbGVjdFF1ZXJ5ID0gU3FsLm5ldyhcImRcIikuc2VsZWN0KGN0ZUNvbHVtbnMpLnNlbGVjdExpdGVyYWwoY3IubGl0ZXJhbHMpO1xuICAgICAgdGhpcy53aXRoKGBkKCR7YXNUb2tlbihjdGVDb2x1bW5zKX0pYCwgc3ViUXVlcnkpO1xuICAgICAgdGhpcy5faW5zZXJ0ID0gYCgke2FzVG9rZW4oaW5zZXJ0Q29sdW1ucyl9KSAke0NVRFNlbGVjdFF1ZXJ5fWA7XG4gICAgfSBlbHNlIGlmIChzdWJRdWVyeS5fcmV0dXJuaW5nQXJncykge1xuICAgICAgbGV0IGluc2VydENvbHVtbnMgPSBzdWJRdWVyeS5fcmV0dXJuaW5nQXJncy5mbGF0KCk7XG4gICAgICBsZXQgQ1VEU2VsZWN0UXVlcnkgPSBTcWwubmV3KFwiZFwiKS5zZWxlY3QoaW5zZXJ0Q29sdW1ucyk7XG4gICAgICB0aGlzLndpdGgoYGQoJHthc1Rva2VuKGluc2VydENvbHVtbnMpfSlgLCBzdWJRdWVyeSk7XG4gICAgICB0aGlzLl9pbnNlcnQgPSBgKCR7YXNUb2tlbihpbnNlcnRDb2x1bW5zKX0pICR7Q1VEU2VsZWN0UXVlcnl9YDtcbiAgICB9XG4gIH1cbiAgX2dldFVwc2VydFRva2VuKHJvdzogUm93LCBrZXk6IHN0cmluZyB8IHN0cmluZ1tdLCBjb2x1bW5zOiBzdHJpbmdbXSkge1xuICAgIGNvbnN0IFt2YWx1ZXNUb2tlbiwgdXBzZXJ0Q29sdW1uc10gPSB0aGlzLl9nZXRJbnNlcnRWYWx1ZXNUb2tlbihyb3csIGNvbHVtbnMpO1xuICAgIGxldCBpbnNlcnRUb2tlbiA9IGAoJHthc1Rva2VuKHVwc2VydENvbHVtbnMpfSkgVkFMVUVTICR7dmFsdWVzVG9rZW59IE9OIENPTkZMSUNUICgke3RoaXMuX2dldFNlbGVjdFRva2VuKGtleSl9KWA7XG4gICAgaWYgKChBcnJheS5pc0FycmF5KGtleSkgJiYga2V5Lmxlbmd0aCA9PT0gdXBzZXJ0Q29sdW1ucy5sZW5ndGgpIHx8IHVwc2VydENvbHVtbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gYCR7aW5zZXJ0VG9rZW59IERPIE5PVEhJTkdgO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7aW5zZXJ0VG9rZW59IERPIFVQREFURSBTRVQgJHt0aGlzLl9nZXRVcGRhdGVTZXRUb2tlbih1cHNlcnRDb2x1bW5zLCBrZXksIFwiRVhDTFVERURcIil9YDtcbiAgICB9XG4gIH1cbiAgX2dldEJ1bGtVcHNlcnRUb2tlbihyb3dzOiBSb3dbXSwga2V5OiBzdHJpbmcgfCBzdHJpbmdbXSwgY29sdW1uczogc3RyaW5nW10pIHtcbiAgICBjb25zdCBbaW5zZXJ0VmFsdWVzQXJyYXksIGluc2VydENvbHVtbnNdID0gdGhpcy5fZ2V0QnVsa0luc2VydFZhbHVlc1Rva2VuKHJvd3MsIGNvbHVtbnMsIERFRkFVTFQpO1xuICAgIGxldCBpbnNlcnRUb2tlbiA9IGAoJHthc1Rva2VuKGluc2VydENvbHVtbnMpfSkgVkFMVUVTICR7YXNUb2tlbihcbiAgICAgIGluc2VydFZhbHVlc0FycmF5XG4gICAgKX0gT04gQ09ORkxJQ1QgKCR7dGhpcy5fZ2V0U2VsZWN0VG9rZW4oa2V5KX0pYDtcbiAgICBpZiAoKEFycmF5LmlzQXJyYXkoa2V5KSAmJiBrZXkubGVuZ3RoID09PSBpbnNlcnRDb2x1bW5zLmxlbmd0aCkgfHwgaW5zZXJ0Q29sdW1ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBgJHtpbnNlcnRUb2tlbn0gRE8gTk9USElOR2A7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHtpbnNlcnRUb2tlbn0gRE8gVVBEQVRFIFNFVCAke3RoaXMuX2dldFVwZGF0ZVNldFRva2VuKGluc2VydENvbHVtbnMsIGtleSwgXCJFWENMVURFRFwiKX1gO1xuICAgIH1cbiAgfVxuICBfZ2V0VXBzZXJ0UXVlcnlUb2tlbihyb3dzOiBTcWwsIGtleTogc3RyaW5nIHwgc3RyaW5nW10sIGNvbHVtbnM6IHN0cmluZ1tdKSB7XG4gICAgbGV0IGNvbHVtbnNUb2tlbiA9IHRoaXMuX2dldFNlbGVjdFRva2VuKGNvbHVtbnMpO1xuICAgIGxldCBpbnNlcnRUb2tlbiA9IGAoJHtjb2x1bW5zVG9rZW59KSAke3Jvd3Muc3RhdGVtZW50KCl9IE9OIENPTkZMSUNUICgke3RoaXMuX2dldFNlbGVjdFRva2VuKGtleSl9KWA7XG4gICAgaWYgKChBcnJheS5pc0FycmF5KGtleSkgJiYga2V5Lmxlbmd0aCA9PT0gY29sdW1ucy5sZW5ndGgpIHx8IGNvbHVtbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gYCR7aW5zZXJ0VG9rZW59IERPIE5PVEhJTkdgO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7aW5zZXJ0VG9rZW59IERPIFVQREFURSBTRVQgJHt0aGlzLl9nZXRVcGRhdGVTZXRUb2tlbihjb2x1bW5zLCBrZXksIFwiRVhDTFVERURcIil9YDtcbiAgICB9XG4gIH1cbiAgX2dldEpvaW5FeHByKGE6IHN0cmluZywgYj86IERCVmFsdWUsIGM/OiBEQlZhbHVlKSB7XG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3IoXCJhdWd1bWVudHMgaXMgcmVxdWlyZWQgZm9yIF9nZXRfam9pbl9leHByXCIpO1xuICAgIH0gZWxzZSBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gYTtcbiAgICB9IGVsc2UgaWYgKGMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGAke2F9ID0gJHtifWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHthfSAke2J9ICR7Y31gO1xuICAgIH1cbiAgfVxuICBfZ2V0Sm9pblRva2VuKGpvaW5UeXBlOiBzdHJpbmcsIHJpZ2h0VGFibGU6IHN0cmluZywgY29uZGl0aW9ucz86IHN0cmluZywgLi4udmFyYXJnczogc3RyaW5nW10pIHtcbiAgICBpZiAoY29uZGl0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gYCR7am9pblR5cGV9IEpPSU4gJHtyaWdodFRhYmxlfSBPTiAoJHt0aGlzLl9nZXRKb2luRXhwcihjb25kaXRpb25zLCAuLi52YXJhcmdzKX0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke2pvaW5UeXBlfSBKT0lOICR7cmlnaHRUYWJsZX1gO1xuICAgIH1cbiAgfVxuICBfZ2V0SW5uZXJKb2luKHJpZ2h0VGFibGU6IHN0cmluZywgY29uZGl0aW9ucz86IHN0cmluZywgLi4udmFyYXJnczogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Sm9pblRva2VuKFwiSU5ORVJcIiwgcmlnaHRUYWJsZSwgY29uZGl0aW9ucywgLi4udmFyYXJncyk7XG4gIH1cbiAgX2dldExlZnRKb2luKHJpZ2h0VGFibGU6IHN0cmluZywgY29uZGl0aW9ucz86IHN0cmluZywgLi4udmFyYXJnczogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Sm9pblRva2VuKFwiTEVGVFwiLCByaWdodFRhYmxlLCBjb25kaXRpb25zLCAuLi52YXJhcmdzKTtcbiAgfVxuICBfZ2V0UmlnaHRKb2luKHJpZ2h0VGFibGU6IHN0cmluZywgY29uZGl0aW9ucz86IHN0cmluZywgLi4udmFyYXJnczogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Sm9pblRva2VuKFwiUklHSFRcIiwgcmlnaHRUYWJsZSwgY29uZGl0aW9ucywgLi4udmFyYXJncyk7XG4gIH1cbiAgX2dldEZ1bGxKb2luKHJpZ2h0VGFibGU6IHN0cmluZywgY29uZGl0aW9ucz86IHN0cmluZywgLi4udmFyYXJnczogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Sm9pblRva2VuKFwiRlVMTFwiLCByaWdodFRhYmxlLCBjb25kaXRpb25zLCAuLi52YXJhcmdzKTtcbiAgfVxuICBfZ2V0SW5Ub2tlbihjb2xzOiBzdHJpbmcgfCBzdHJpbmdbXSwgcmFuZ2U6IERCVmFsdWVbXSB8IFNxbCB8IHN0cmluZywgb3BlcmF0b3I6IHN0cmluZyA9IFwiSU5cIikge1xuICAgIGNvbHMgPSBhc1Rva2VuKGNvbHMpO1xuICAgIGlmICh0eXBlb2YgcmFuZ2UgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGlmIChyYW5nZSBpbnN0YW5jZW9mIFNxbCkge1xuICAgICAgICByZXR1cm4gYCgke2NvbHN9KSAke29wZXJhdG9yfSAoJHtyYW5nZS5zdGF0ZW1lbnQoKX0pYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBgKCR7Y29sc30pICR7b3BlcmF0b3J9ICR7YXNMaXRlcmFsKHJhbmdlKX1gO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCgke2NvbHN9KSAke29wZXJhdG9yfSAke3JhbmdlfWA7XG4gICAgfVxuICB9XG4gIF9nZXRVcGRhdGVRdWVyeVRva2VuKHN1YlNlbGVjdDogU3FsLCBjb2x1bW5zPzogREJWYWx1ZVtdKSB7XG4gICAgcmV0dXJuIGAoJHsoY29sdW1ucyAmJiB0aGlzLl9nZXRTZWxlY3RUb2tlbihjb2x1bW5zKSkgfHwgc3ViU2VsZWN0Ll9zZWxlY3R9KSA9ICgke3N1YlNlbGVjdC5zdGF0ZW1lbnQoKX0pYDtcbiAgfVxuICBfZ2V0Sm9pbkNvbmRpdGlvbnMoa2V5OiBzdHJpbmcgfCBzdHJpbmdbXSwgbGVmdFRhYmxlOiBzdHJpbmcsIHJpZ2h0VGFibGU6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gYCR7bGVmdFRhYmxlfS4ke2tleX0gPSAke3JpZ2h0VGFibGV9LiR7a2V5fWA7XG4gICAgfVxuICAgIGxldCByZXM6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQgayBvZiBrZXkpIHtcbiAgICAgIHJlcy5wdXNoKGAke2xlZnRUYWJsZX0uJHtrfSA9ICR7cmlnaHRUYWJsZX0uJHtrfWApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzLmpvaW4oXCIgQU5EIFwiKTtcbiAgfVxuICBfZ2V0Q3RlVmFsdWVzTGl0ZXJhbChyb3dzOiBSb3dbXSwgY29sdW1ucz86IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldEJ1bGtJbnNlcnRWYWx1ZXNUb2tlbihyb3dzLCBjb2x1bW5zLCBOVUxMKTtcbiAgfVxuICBfaGFuZGxlV2hlcmVUb2tlbih3aGVyZVRva2VuOiBzdHJpbmcgfCB1bmRlZmluZWQsIHRwbDogc3RyaW5nKSB7XG4gICAgaWYgKHdoZXJlVG9rZW4gPT09IHVuZGVmaW5lZCB8fCB3aGVyZVRva2VuID09PSBcIlwiKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3doZXJlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3doZXJlID0gd2hlcmVUb2tlbjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd2hlcmUgPSBzdHJpbmdGb3JtYXQodHBsLCB0aGlzLl93aGVyZSwgd2hlcmVUb2tlbik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIF9nZXRDb25kaXRpb25Ub2tlbkZyb21UYWJsZShrd2FyZ3M6IENvbmRpdGlvblRhYmxlLCBsb2dpYz86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IHRva2Vuczogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBbaywgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGt3YXJncykpIHtcbiAgICAgIHRva2Vucy5wdXNoKGAke2t9ID0gJHthc0xpdGVyYWwodmFsdWUpfWApO1xuICAgIH1cbiAgICBpZiAobG9naWMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRva2Vucy5qb2luKFwiIEFORCBcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0b2tlbnMuam9pbihcIiBcIiArIChsb2dpYyArIFwiIFwiKSk7XG4gICAgfVxuICB9XG4gIF9nZXRDb25kaXRpb25Ub2tlbihmaXJzdDogQ29uZGl0aW9uLCBzZWNvbmQ/OiBEQlZhbHVlLCB0aGlyZD86IERCVmFsdWUpIHtcbiAgICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3IoXCJhcmd1bWVudHMgaXMgcmVxdWlyZWQgZm9yIF9nZXRfY29uZGl0aW9uX3Rva2VuXCIpO1xuICAgIH0gZWxzZSBpZiAoc2Vjb25kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2YgZmlyc3QgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENvbmRpdGlvblRva2VuRnJvbVRhYmxlKGZpcnN0KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpcnN0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiBmaXJzdDtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpcnN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgbGV0IF93aGVyZSA9IHRoaXMuX3doZXJlO1xuICAgICAgICBkZWxldGUgdGhpcy5fd2hlcmU7XG4gICAgICAgIGxldCByZXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVzID0gZmlyc3QuY2FsbCh0aGlzKTtcbiAgICAgICAgICBpZiAocmVzIGluc3RhbmNlb2YgU3FsKSB7XG4gICAgICAgICAgICBsZXQgZ3JvdXBXaGVyZSA9IHRoaXMuX3doZXJlO1xuICAgICAgICAgICAgdGhpcy5fd2hlcmUgPSBfd2hlcmU7XG4gICAgICAgICAgICBpZiAoIWdyb3VwV2hlcmUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3IoXCJubyBjb25kaXRpb24gbWFkZSBmcm9tIGNvbmRpdGlvbiBmdW5jdGlvblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBncm91cFdoZXJlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl93aGVyZSA9IF93aGVyZTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3IoXCJjb25kaXRpb24gZnVuY3Rpb24gcmFpc2UgZXJyb3I6XCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3IoXCJpbnZhbGlkIGNvbmRpdGlvbiB0eXBlOiBcIiArIHR5cGVvZiBmaXJzdCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlyZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gYCR7Zmlyc3R9ID0gJHthc0xpdGVyYWwoc2Vjb25kKX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7Zmlyc3R9ICR7c2Vjb25kfSAke2FzTGl0ZXJhbCh0aGlyZCl9YDtcbiAgICB9XG4gIH1cbiAgX2dldENvbmRpdGlvblRva2VuT3IoZmlyc3Q6IENvbmRpdGlvbiwgc2Vjb25kPzogREJWYWx1ZSwgdGhpcmQ/OiBEQlZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBmaXJzdCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIHRoaXMuX2dldENvbmRpdGlvblRva2VuRnJvbVRhYmxlKGZpcnN0LCBcIk9SXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fZ2V0Q29uZGl0aW9uVG9rZW4oZmlyc3QsIHNlY29uZCwgdGhpcmQpO1xuICAgIH1cbiAgfVxuICBfZ2V0Q29uZGl0aW9uVG9rZW5Ob3QoZmlyc3Q6IENvbmRpdGlvbiwgc2Vjb25kPzogREJWYWx1ZSwgdGhpcmQ/OiBEQlZhbHVlKSB7XG4gICAgbGV0IHRva2VuO1xuICAgIGlmICh0eXBlb2YgZmlyc3QgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHRva2VuID0gdGhpcy5fZ2V0Q29uZGl0aW9uVG9rZW5Gcm9tVGFibGUoZmlyc3QsIFwiT1JcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRva2VuID0gdGhpcy5fZ2V0Q29uZGl0aW9uVG9rZW4oZmlyc3QsIHNlY29uZCwgdGhpcmQpO1xuICAgIH1cbiAgICByZXR1cm4gdG9rZW4gIT09IFwiXCIgPyBgTk9UICgke3Rva2VufSlgIDogXCJcIjtcbiAgfVxuICBfaGFuZGxlU2V0T3B0aW9uKG90aGVyU3FsOiBTcWwsIGlubmVyQXR0cjogSW5uZXJTZXRQcm9wZXJ0eSkge1xuICAgIGlmICghdGhpc1tpbm5lckF0dHJdKSB7XG4gICAgICB0aGlzW2lubmVyQXR0cl0gPSBvdGhlclNxbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpc1tpbm5lckF0dHJdID0gYCgke3RoaXNbaW5uZXJBdHRyXX0pICR7aW5uZXJBdHRyLnNsaWNlKDEpLnRvVXBwZXJDYXNlKCl9ICgke290aGVyU3FsLnN0YXRlbWVudCgpfSlgO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlbWVudCA9IHRoaXMuX3N0YXRlbWVudEZvclNldDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBfc3RhdGVtZW50Rm9yU2V0KCkge1xuICAgIGxldCBzdGF0ZW1lbnQgPSBTcWwucHJvdG90eXBlLnN0YXRlbWVudC5jYWxsKHRoaXMpO1xuICAgIGlmICh0aGlzLl9pbnRlcnNlY3QpIHtcbiAgICAgIHN0YXRlbWVudCA9IGAoJHtzdGF0ZW1lbnR9KSBJTlRFUlNFQ1QgKCR7dGhpcy5faW50ZXJzZWN0fSlgO1xuICAgIH0gZWxzZSBpZiAodGhpcy5faW50ZXJzZWN0QWxsKSB7XG4gICAgICBzdGF0ZW1lbnQgPSBgKCR7c3RhdGVtZW50fSkgSU5URVJTRUNUIEFMTCAoJHt0aGlzLl9pbnRlcnNlY3RBbGx9KWA7XG4gICAgfSBlbHNlIGlmICh0aGlzLl91bmlvbikge1xuICAgICAgc3RhdGVtZW50ID0gYCgke3N0YXRlbWVudH0pIFVOSU9OICgke3RoaXMuX3VuaW9ufSlgO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdW5pb25BbGwpIHtcbiAgICAgIHN0YXRlbWVudCA9IGAoJHtzdGF0ZW1lbnR9KSBVTklPTiBBTEwgKCR7dGhpcy5fdW5pb25BbGx9KWA7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9leGNlcHQpIHtcbiAgICAgIHN0YXRlbWVudCA9IGAoJHtzdGF0ZW1lbnR9KSBFWENFUFQgKCR7dGhpcy5fZXhjZXB0fSlgO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fZXhjZXB0QWxsKSB7XG4gICAgICBzdGF0ZW1lbnQgPSBgKCR7c3RhdGVtZW50fSkgRVhDRVBUIEFMTCAoJHt0aGlzLl9leGNlcHRBbGx9KWA7XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZW1lbnQ7XG4gIH1cbiAgc3RhdGVtZW50KCkge1xuICAgIGxldCB0YWJsZU5hbWUgPSB0aGlzLmdldFRhYmxlKCk7XG4gICAgbGV0IHN0YXRlbWVudCA9IGFzc2VtYmxlU3FsKHtcbiAgICAgIHRhYmxlTmFtZTogdGFibGVOYW1lLFxuICAgICAgd2l0aDogdGhpcy5fd2l0aCxcbiAgICAgIGpvaW46IHRoaXMuX2pvaW4sXG4gICAgICBkaXN0aW5jdDogdGhpcy5fZGlzdGluY3QsXG4gICAgICByZXR1cm5pbmc6IHRoaXMuX3JldHVybmluZyxcbiAgICAgIGN0ZVJldHVybmluZzogdGhpcy5fY3RlUmV0dXJuaW5nLFxuICAgICAgaW5zZXJ0OiB0aGlzLl9pbnNlcnQsXG4gICAgICB1cGRhdGU6IHRoaXMuX3VwZGF0ZSxcbiAgICAgIGRlbGV0ZTogdGhpcy5fZGVsZXRlLFxuICAgICAgdXNpbmc6IHRoaXMuX3VzaW5nLFxuICAgICAgc2VsZWN0OiB0aGlzLl9zZWxlY3QsXG4gICAgICBmcm9tOiB0aGlzLl9mcm9tLFxuICAgICAgd2hlcmU6IHRoaXMuX3doZXJlLFxuICAgICAgZ3JvdXA6IHRoaXMuX2dyb3VwLFxuICAgICAgaGF2aW5nOiB0aGlzLl9oYXZpbmcsXG4gICAgICBvcmRlcjogdGhpcy5fb3JkZXIsXG4gICAgICBsaW1pdDogdGhpcy5fbGltaXQsXG4gICAgICBvZmZzZXQ6IHRoaXMuX29mZnNldCxcbiAgICB9KTtcbiAgICByZXR1cm4gc3RhdGVtZW50O1xuICB9XG4gIHdpdGgobmFtZTogc3RyaW5nLCB0b2tlbj86IFNxbFZhbHVlKSB7XG4gICAgbGV0IHdpdGhUb2tlbiA9IHRoaXMuX2dldFdpdGhUb2tlbihuYW1lLCB0b2tlbik7XG4gICAgaWYgKHRoaXMuX3dpdGgpIHtcbiAgICAgIHRoaXMuX3dpdGggPSBgJHt0aGlzLl93aXRofSwgJHt3aXRoVG9rZW59YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd2l0aCA9IHdpdGhUb2tlbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdW5pb24ob3RoZXJTcWw6IFNxbCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVTZXRPcHRpb24ob3RoZXJTcWwsIFwiX3VuaW9uXCIpO1xuICB9XG4gIHVuaW9uQWxsKG90aGVyU3FsOiBTcWwpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlU2V0T3B0aW9uKG90aGVyU3FsLCBcIl91bmlvbkFsbFwiKTtcbiAgfVxuICBleGNlcHQob3RoZXJTcWw6IFNxbCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVTZXRPcHRpb24ob3RoZXJTcWwsIFwiX2V4Y2VwdFwiKTtcbiAgfVxuICBleGNlcHRBbGwob3RoZXJTcWw6IFNxbCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVTZXRPcHRpb24ob3RoZXJTcWwsIFwiX2V4Y2VwdEFsbFwiKTtcbiAgfVxuICBpbnRlcnNlY3Qob3RoZXJTcWw6IFNxbCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVTZXRPcHRpb24ob3RoZXJTcWwsIFwiX2ludGVyc2VjdFwiKTtcbiAgfVxuICBpbnRlcnNlY3RBbGwob3RoZXJTcWw6IFNxbCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVTZXRPcHRpb24ob3RoZXJTcWwsIFwiX2ludGVyc2VjdEFsbFwiKTtcbiAgfVxuICBhcyh0YWJsZUFsaWFzOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hcyA9IHRhYmxlQWxpYXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgd2l0aFZhbHVlcyhuYW1lOiBzdHJpbmcsIHJvd3M6IFJvd1tdKSB7XG4gICAgY29uc3QgY29sdW1ucyA9IHRoaXMuX2dldEtleXMocm93c1swXSk7XG4gICAgY29uc3QgW3dpdGhSb3dzLCB3aXRoQ29sdW1uc10gPSB0aGlzLl9nZXRDdGVWYWx1ZXNMaXRlcmFsKHJvd3MsIGNvbHVtbnMpO1xuICAgIGNvbnN0IGN0ZU5hbWUgPSBgJHtuYW1lfSgke3dpdGhDb2x1bW5zLmpvaW4oXCIsIFwiKX0pYDtcbiAgICBjb25zdCBjdGVWYWx1ZXMgPSBgKFZBTFVFUyAke2FzVG9rZW4od2l0aFJvd3MpfSlgO1xuICAgIHJldHVybiB0aGlzLndpdGgoY3RlTmFtZSwgY3RlVmFsdWVzKTtcbiAgfVxuICBpbnNlcnQocm93czogUm93IHwgUm93W10gfCBTcWwsIGNvbHVtbnM/OiBzdHJpbmdbXSkge1xuICAgIGlmIChyb3dzIGluc3RhbmNlb2YgU3FsKSB7XG4gICAgICBpZiAocm93cy5fc2VsZWN0KSB7XG4gICAgICAgIHRoaXMuX3NldFNlbGVjdFN1YnF1ZXJ5SW5zZXJ0VG9rZW4ocm93cywgY29sdW1ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zZXRDVURTdWJxdWVyeUluc2VydFRva2VuKHJvd3MpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocm93cyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB0aGlzLl9pbnNlcnQgPSB0aGlzLl9nZXRCdWxrSW5zZXJ0VG9rZW4ocm93cywgY29sdW1ucyk7XG4gICAgfSBlbHNlIGlmIChPYmplY3Qua2V5cyhyb3dzKS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2luc2VydCA9IHRoaXMuX2dldEluc2VydFRva2VuKHJvd3MsIGNvbHVtbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvcihcImNhbid0IHBhc3MgZW1wdHkgdGFibGUgdG8gc3FsLmluc2VydFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdXBkYXRlKHJvdzogUm93IHwgU3FsIHwgc3RyaW5nLCBjb2x1bW5zPzogc3RyaW5nW10pIHtcbiAgICBpZiAodHlwZW9mIHJvdyA9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLl91cGRhdGUgPSByb3c7XG4gICAgfSBlbHNlIGlmICghKHJvdyBpbnN0YW5jZW9mIFNxbCkpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZSA9IHRoaXMuX2dldFVwZGF0ZVRva2VuKHJvdywgY29sdW1ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3VwZGF0ZSA9IHRoaXMuX2dldFVwZGF0ZVF1ZXJ5VG9rZW4ocm93LCBjb2x1bW5zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdXBzZXJ0KHJvd3M6IFJvdyB8IFJvd1tdIHwgU3FsLCBrZXk6IHN0cmluZyB8IHN0cmluZ1tdLCBjb2x1bW5zPzogYW55KSB7XG4gICAgaWYgKCFrZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInlvdSBtdXN0IHByb3ZpZGUga2V5IGZvciB1cHNlcnQoc3RyaW5nIG9yIHRhYmxlKVwiKTtcbiAgICB9XG4gICAgaWYgKHJvd3MgaW5zdGFuY2VvZiBTcWwpIHtcbiAgICAgIHRoaXMuX2luc2VydCA9IHRoaXMuX2dldFVwc2VydFF1ZXJ5VG9rZW4ocm93cywga2V5LCBjb2x1bW5zKTtcbiAgICB9IGVsc2UgaWYgKHJvd3MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5faW5zZXJ0ID0gdGhpcy5fZ2V0QnVsa1Vwc2VydFRva2VuKHJvd3MsIGtleSwgY29sdW1ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2luc2VydCA9IHRoaXMuX2dldFVwc2VydFRva2VuKHJvd3MsIGtleSwgY29sdW1ucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGlzSW5zdGFuY2Uocm93OiBhbnkpIHtcbiAgICByZXR1cm4gcm93IGluc3RhbmNlb2YgU3FsO1xuICB9XG4gIG1lcmdlKHJvd3M6IFJvd1tdLCBrZXk6IHN0cmluZyB8IHN0cmluZ1tdLCBjb2x1bW5zPzogc3RyaW5nW10pIHtcbiAgICBpZiAocm93cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmVycm9yKFwiZW1wdHkgcm93cyBwYXNzZWQgdG8gbWVyZ2VcIik7XG4gICAgfVxuICAgIGNvbnN0IFttZXJnZVJvd3MsIG1lcmdlQ29sdW1uc10gPSB0aGlzLl9nZXRDdGVWYWx1ZXNMaXRlcmFsKHJvd3MsIGNvbHVtbnMpO1xuICAgIGxldCBjdGVOYW1lID0gYFYoJHttZXJnZUNvbHVtbnMuam9pbihcIiwgXCIpfSlgO1xuICAgIGxldCBjdGVWYWx1ZXMgPSBgKFZBTFVFUyAke2FzVG9rZW4obWVyZ2VSb3dzKX0pYDtcbiAgICBsZXQgam9pbkNvbmQgPSB0aGlzLl9nZXRKb2luQ29uZGl0aW9ucyhrZXksIFwiVlwiLCBcIlRcIik7XG4gICAgbGV0IHZhbHNDb2x1bW5zID0gbWVyZ2VDb2x1bW5zLm1hcChfcHJlZml4V2l0aFYpO1xuICAgIGxldCBpbnNlcnRTdWJxdWVyeSA9IFNxbC5uZXcoXCJWXCIpXG4gICAgICAuc2VsZWN0KHZhbHNDb2x1bW5zKVxuICAgICAgLmxlZnRKb2luKFwiVSBBUyBUXCIsIGpvaW5Db25kKVxuICAgICAgLndoZXJlTnVsbChcIlQuXCIgKyAoQXJyYXkuaXNBcnJheShrZXkpID8ga2V5WzBdIDoga2V5KSk7XG4gICAgbGV0IHVwZGF0ZWRTdWJxdWVyeTtcbiAgICBpZiAoKEFycmF5LmlzQXJyYXkoa2V5KSAmJiBrZXkubGVuZ3RoID09PSBtZXJnZUNvbHVtbnMubGVuZ3RoKSB8fCBtZXJnZUNvbHVtbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICB1cGRhdGVkU3VicXVlcnkgPSBTcWwubmV3KFwiVlwiKVxuICAgICAgICAuc2VsZWN0KHZhbHNDb2x1bW5zKVxuICAgICAgICAuam9pbih0aGlzLnRhYmxlTmFtZSArIFwiIEFTIFRcIiwgam9pbkNvbmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVkU3VicXVlcnkgPSBTcWwubmV3KHRoaXMudGFibGVOYW1lKVxuICAgICAgICAuYXMoXCJUXCIpXG4gICAgICAgIC51cGRhdGUodGhpcy5fZ2V0VXBkYXRlU2V0VG9rZW4obWVyZ2VDb2x1bW5zLCBrZXksIFwiVlwiKSlcbiAgICAgICAgLmZyb20oXCJWXCIpXG4gICAgICAgIC53aGVyZShqb2luQ29uZClcbiAgICAgICAgLnJldHVybmluZyh2YWxzQ29sdW1ucyk7XG4gICAgfVxuICAgIHRoaXMud2l0aChjdGVOYW1lLCBjdGVWYWx1ZXMpLndpdGgoXCJVXCIsIHVwZGF0ZWRTdWJxdWVyeSk7XG4gICAgcmV0dXJuIFNxbC5wcm90b3R5cGUuaW5zZXJ0LmNhbGwodGhpcywgaW5zZXJ0U3VicXVlcnksIGNvbHVtbnMpO1xuICB9XG4gIHVwZGF0ZXMocm93czogUm93W10gfCBTcWwsIGtleTogc3RyaW5nIHwgc3RyaW5nW10sIGNvbHVtbnM/OiBzdHJpbmdbXSkge1xuICAgIGlmIChyb3dzIGluc3RhbmNlb2YgU3FsKSB7XG4gICAgICBjb25zdCB1cGRhdGVzQ29sdW1ucyA9XG4gICAgICAgIGNvbHVtbnMgfHwgKHJvd3MuX3JldHVybmluZ0FyZ3M/LmZsYXQoKS5maWx0ZXIoKGUpID0+IHR5cGVvZiBlID09PSBcInN0cmluZ1wiKSBhcyBzdHJpbmdbXSkgfHwgW107XG4gICAgICBpZiAoIXVwZGF0ZXNDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb2x1bW5zIGlzIHJlcXVpcmVkIHdoZW4gdXNpbmcgc3VicXVlcnlcIik7XG4gICAgICB9XG4gICAgICBsZXQgY3RlTmFtZSA9IGBWKCR7dXBkYXRlc0NvbHVtbnMuam9pbihcIiwgXCIpfSlgO1xuICAgICAgbGV0IGpvaW5Db25kID0gdGhpcy5fZ2V0Sm9pbkNvbmRpdGlvbnMoa2V5LCBcIlZcIiwgdGhpcy5fYXMgfHwgdGhpcy50YWJsZU5hbWUpO1xuICAgICAgdGhpcy53aXRoKGN0ZU5hbWUsIHJvd3MpO1xuICAgICAgcmV0dXJuIFNxbC5wcm90b3R5cGUudXBkYXRlXG4gICAgICAgIC5jYWxsKHRoaXMsIHRoaXMuX2dldFVwZGF0ZVNldFRva2VuKHVwZGF0ZXNDb2x1bW5zLCBrZXksIFwiVlwiKSlcbiAgICAgICAgLmZyb20oXCJWXCIpXG4gICAgICAgIC53aGVyZShqb2luQ29uZCk7XG4gICAgfSBlbHNlIGlmIChyb3dzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3IoXCJlbXB0eSByb3dzIHBhc3NlZCB0byB1cGRhdGVzXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBbdXBkYXRlc1Jvd3MsIHVwZGF0ZXNDb2x1bW5zXSA9IHRoaXMuX2dldEN0ZVZhbHVlc0xpdGVyYWwocm93cywgY29sdW1ucyk7XG4gICAgICBsZXQgY3RlTmFtZSA9IGBWKCR7dXBkYXRlc0NvbHVtbnMuam9pbihcIiwgXCIpfSlgO1xuICAgICAgbGV0IGN0ZVZhbHVlcyA9IGAoVkFMVUVTICR7YXNUb2tlbih1cGRhdGVzUm93cyl9KWA7XG4gICAgICBsZXQgam9pbkNvbmQgPSB0aGlzLl9nZXRKb2luQ29uZGl0aW9ucyhrZXksIFwiVlwiLCB0aGlzLl9hcyB8fCB0aGlzLnRhYmxlTmFtZSk7XG4gICAgICB0aGlzLndpdGgoY3RlTmFtZSwgY3RlVmFsdWVzKTtcbiAgICAgIHJldHVybiBTcWwucHJvdG90eXBlLnVwZGF0ZVxuICAgICAgICAuY2FsbCh0aGlzLCB0aGlzLl9nZXRVcGRhdGVTZXRUb2tlbih1cGRhdGVzQ29sdW1ucywga2V5LCBcIlZcIikpXG4gICAgICAgIC5mcm9tKFwiVlwiKVxuICAgICAgICAud2hlcmUoam9pbkNvbmQpO1xuICAgIH1cbiAgfVxuICBnZXRzKGtleXM6IFJvd1tdKSB7XG4gICAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvcihcImVtcHR5IGtleXMgcGFzc2VkIHRvIGdldHNcIik7XG4gICAgfVxuICAgIGxldCBjb2x1bW5zID0gdGhpcy5fZ2V0S2V5cyhrZXlzWzBdKTtcbiAgICBsZXQgW2dldHNrZXlzLCBnZXRzQ29sdW1uc10gPSB0aGlzLl9nZXRDdGVWYWx1ZXNMaXRlcmFsKGtleXMsIGNvbHVtbnMpO1xuICAgIGxldCBqb2luQ29uZCA9IHRoaXMuX2dldEpvaW5Db25kaXRpb25zKGdldHNDb2x1bW5zLCBcIlZcIiwgdGhpcy5fYXMgfHwgdGhpcy50YWJsZU5hbWUpO1xuICAgIGxldCBjdGVOYW1lID0gYFYoJHtnZXRzQ29sdW1ucy5qb2luKFwiLCBcIil9KWA7XG4gICAgbGV0IGN0ZVZhbHVlcyA9IGAoVkFMVUVTICR7YXNUb2tlbihnZXRza2V5cyl9KWA7XG4gICAgcmV0dXJuIHRoaXMud2l0aChjdGVOYW1lLCBjdGVWYWx1ZXMpLnJpZ2h0Sm9pbihcIlZcIiwgam9pbkNvbmQpO1xuICB9XG4gIG1lcmdlR2V0cyhyb3dzOiBSb3dbXSwga2V5czogc3RyaW5nIHwgc3RyaW5nW10pIHtcbiAgICBsZXQgY29sdW1ucyA9IHRoaXMuX2dldEtleXMocm93c1swXSk7XG4gICAgbGV0IFtnZXRzUm93cywgZ2V0c0NvbHVtbnNdID0gdGhpcy5fZ2V0Q3RlVmFsdWVzTGl0ZXJhbChyb3dzLCBjb2x1bW5zKTtcbiAgICBsZXQgam9pbkNvbmQgPSB0aGlzLl9nZXRKb2luQ29uZGl0aW9ucyhrZXlzLCBcIlZcIiwgdGhpcy5fYXMgfHwgdGhpcy50YWJsZU5hbWUpO1xuICAgIGxldCBjdGVOYW1lID0gYFYoJHtnZXRzQ29sdW1ucy5qb2luKFwiLCBcIil9KWA7XG4gICAgbGV0IGN0ZVZhbHVlcyA9IGAoVkFMVUVTICR7YXNUb2tlbihnZXRzUm93cyl9KWA7XG4gICAgcmV0dXJuIFNxbC5wcm90b3R5cGUuc2VsZWN0LmNhbGwodGhpcywgXCJWLipcIikud2l0aChjdGVOYW1lLCBjdGVWYWx1ZXMpLnJpZ2h0Sm9pbihcIlZcIiwgam9pbkNvbmQpO1xuICB9XG4gIGNvcHkoKTogdGhpcyB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykpLCB0aGlzKTtcbiAgfVxuICBkZWxldGUoZmlyc3Q6IENvbmRpdGlvbiwgc2Vjb25kPzogREJWYWx1ZSwgdGhpcmQ/OiBEQlZhbHVlKSB7XG4gICAgdGhpcy5fZGVsZXRlID0gdHJ1ZTtcbiAgICBpZiAoZmlyc3QpIHtcbiAgICAgIHRoaXMud2hlcmUoZmlyc3QsIHNlY29uZCwgdGhpcmQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBkaXN0aW5jdCgpIHtcbiAgICB0aGlzLl9kaXN0aW5jdCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgc2VsZWN0KGZpcnN0OiBEQlZhbHVlLCBzZWNvbmQ/OiBEQlZhbHVlLCAuLi52YXJhcmdzOiBEQlZhbHVlW10pIHtcbiAgICBsZXQgcyA9IHRoaXMuX2dldFNlbGVjdFRva2VuKGZpcnN0LCBzZWNvbmQsIC4uLnZhcmFyZ3MpO1xuICAgIGlmICghdGhpcy5fc2VsZWN0KSB7XG4gICAgICB0aGlzLl9zZWxlY3QgPSBzO1xuICAgIH0gZWxzZSBpZiAocyAhPT0gdW5kZWZpbmVkICYmIHMgIT09IFwiXCIpIHtcbiAgICAgIHRoaXMuX3NlbGVjdCA9IHRoaXMuX3NlbGVjdCArIChcIiwgXCIgKyBzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgc2VsZWN0TGl0ZXJhbChmaXJzdDogREJWYWx1ZSwgc2Vjb25kPzogREJWYWx1ZSwgLi4udmFyYXJnczogREJWYWx1ZVtdKSB7XG4gICAgbGV0IHMgPSB0aGlzLl9nZXRTZWxlY3RUb2tlbkxpdGVyYWwoZmlyc3QsIHNlY29uZCwgLi4udmFyYXJncyk7XG4gICAgaWYgKCF0aGlzLl9zZWxlY3QpIHtcbiAgICAgIHRoaXMuX3NlbGVjdCA9IHM7XG4gICAgfSBlbHNlIGlmIChzICE9PSB1bmRlZmluZWQgJiYgcyAhPT0gXCJcIikge1xuICAgICAgdGhpcy5fc2VsZWN0ID0gdGhpcy5fc2VsZWN0ICsgKFwiLCBcIiArIHMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZXR1cm5pbmcoZmlyc3Q6IERCVmFsdWUsIHNlY29uZD86IERCVmFsdWUsIC4uLnZhcmFyZ3M6IERCVmFsdWVbXSkge1xuICAgIGxldCBzID0gdGhpcy5fZ2V0U2VsZWN0VG9rZW4oZmlyc3QsIHNlY29uZCwgLi4udmFyYXJncyk7XG4gICAgaWYgKCF0aGlzLl9yZXR1cm5pbmcpIHtcbiAgICAgIHRoaXMuX3JldHVybmluZyA9IHM7XG4gICAgfSBlbHNlIGlmIChzICE9PSB1bmRlZmluZWQgJiYgcyAhPT0gXCJcIikge1xuICAgICAgdGhpcy5fcmV0dXJuaW5nID0gdGhpcy5fcmV0dXJuaW5nICsgKFwiLCBcIiArIHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKHRoaXMuX3JldHVybmluZ0FyZ3MpIHtcbiAgICAgIHRoaXMuX3JldHVybmluZ0FyZ3MgPSBbdGhpcy5fcmV0dXJuaW5nQXJncywgZmlyc3QsIHNlY29uZCwgLi4udmFyYXJnc107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JldHVybmluZ0FyZ3MgPSBbZmlyc3QsIHNlY29uZCwgLi4udmFyYXJnc107XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHJldHVybmluZ0xpdGVyYWwoZmlyc3Q6IERCVmFsdWUsIHNlY29uZDogREJWYWx1ZSwgLi4udmFyYXJnczogREJWYWx1ZVtdKSB7XG4gICAgbGV0IHMgPSB0aGlzLl9nZXRTZWxlY3RUb2tlbkxpdGVyYWwoZmlyc3QsIHNlY29uZCwgLi4udmFyYXJncyk7XG4gICAgaWYgKCF0aGlzLl9yZXR1cm5pbmcpIHtcbiAgICAgIHRoaXMuX3JldHVybmluZyA9IHM7XG4gICAgfSBlbHNlIGlmIChzICE9PSB1bmRlZmluZWQgJiYgcyAhPT0gXCJcIikge1xuICAgICAgdGhpcy5fcmV0dXJuaW5nID0gdGhpcy5fcmV0dXJuaW5nICsgKFwiLCBcIiArIHMpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcmV0dXJuaW5nQXJncykge1xuICAgICAgdGhpcy5fcmV0dXJuaW5nQXJncyA9IFt0aGlzLl9yZXR1cm5pbmdBcmdzLCBmaXJzdCwgc2Vjb25kLCAuLi52YXJhcmdzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmV0dXJuaW5nQXJncyA9IFtmaXJzdCwgc2Vjb25kLCAuLi52YXJhcmdzXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgY3RlUmV0dXJuaW5nKG9wdHM6IEN0ZVJldHVybmluZ09wdHMpIHtcbiAgICB0aGlzLl9jdGVSZXR1cm5pbmcgPSBvcHRzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGdyb3VwKGZpcnN0OiBzdHJpbmcsIHNlY29uZD86IHN0cmluZywgLi4udmFyYXJnczogc3RyaW5nW10pIHtcbiAgICBpZiAoIXRoaXMuX2dyb3VwKSB7XG4gICAgICB0aGlzLl9ncm91cCA9IHRoaXMuX2dldFNlbGVjdFRva2VuKGZpcnN0LCBzZWNvbmQsIC4uLnZhcmFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9ncm91cCA9IHRoaXMuX2dyb3VwICsgKFwiLCBcIiArIHRoaXMuX2dldFNlbGVjdFRva2VuKGZpcnN0LCBzZWNvbmQsIC4uLnZhcmFyZ3MpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZ3JvdXBCeShmaXJzdDogc3RyaW5nLCBzZWNvbmQ/OiBzdHJpbmcsIC4uLnZhcmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIHRoaXMuZ3JvdXAoZmlyc3QsIHNlY29uZCwgLi4udmFyYXJncyk7XG4gIH1cbiAgb3JkZXIoZmlyc3Q6IHN0cmluZywgc2Vjb25kPzogc3RyaW5nLCAuLi52YXJhcmdzOiBzdHJpbmdbXSkge1xuICAgIGlmICghdGhpcy5fb3JkZXIpIHtcbiAgICAgIHRoaXMuX29yZGVyID0gdGhpcy5fZ2V0U2VsZWN0VG9rZW4oZmlyc3QsIHNlY29uZCwgLi4udmFyYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX29yZGVyID0gdGhpcy5fb3JkZXIgKyAoXCIsIFwiICsgdGhpcy5fZ2V0U2VsZWN0VG9rZW4oZmlyc3QsIHNlY29uZCwgLi4udmFyYXJncykpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBvcmRlckJ5KGZpcnN0OiBzdHJpbmcsIHNlY29uZD86IHN0cmluZywgLi4udmFyYXJnczogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gdGhpcy5vcmRlcihmaXJzdCwgc2Vjb25kLCAuLi52YXJhcmdzKTtcbiAgfVxuICBfZ2V0QXJnc1Rva2VuKGZpcnN0OiBzdHJpbmcsIHNlY29uZD86IHN0cmluZywgLi4udmFyYXJnczogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0U2VsZWN0VG9rZW4oZmlyc3QsIHNlY29uZCwgLi4udmFyYXJncyk7XG4gIH1cbiAgdXNpbmcoZmlyc3Q6IHN0cmluZywgc2Vjb25kPzogc3RyaW5nLCAuLi52YXJhcmdzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2RlbGV0ZSA9IHRydWU7XG4gICAgdGhpcy5fdXNpbmcgPSB0aGlzLl9nZXRBcmdzVG9rZW4oZmlyc3QsIHNlY29uZCwgLi4udmFyYXJncyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZnJvbShmaXJzdDogc3RyaW5nLCBzZWNvbmQ/OiBzdHJpbmcsIC4uLnZhcmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgaWYgKCF0aGlzLl9mcm9tKSB7XG4gICAgICB0aGlzLl9mcm9tID0gdGhpcy5fZ2V0QXJnc1Rva2VuKGZpcnN0LCBzZWNvbmQsIC4uLnZhcmFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9mcm9tID0gdGhpcy5fZnJvbSArIChcIiwgXCIgKyB0aGlzLl9nZXRBcmdzVG9rZW4oZmlyc3QsIHNlY29uZCwgLi4udmFyYXJncykpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXRUYWJsZSgpIHtcbiAgICByZXR1cm4gKHRoaXMuX2FzID09PSB1bmRlZmluZWQgJiYgdGhpcy50YWJsZU5hbWUpIHx8IHRoaXMudGFibGVOYW1lICsgKFwiIEFTIFwiICsgdGhpcy5fYXMpO1xuICB9XG4gIGpvaW4ocmlnaHRUYWJsZTogc3RyaW5nLCBjb25kaXRpb25zPzogc3RyaW5nLCAuLi52YXJhcmdzOiBzdHJpbmdbXSkge1xuICAgIGxldCBqb2luVG9rZW4gPSB0aGlzLl9nZXRJbm5lckpvaW4ocmlnaHRUYWJsZSwgY29uZGl0aW9ucywgLi4udmFyYXJncyk7XG4gICAgdGhpcy5fZnJvbSA9IGAke3RoaXMuX2Zyb20gfHwgdGhpcy5nZXRUYWJsZSgpfSAke2pvaW5Ub2tlbn1gO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGlubmVySm9pbihyaWdodFRhYmxlOiBzdHJpbmcsIGNvbmRpdGlvbnM/OiBzdHJpbmcsIC4uLnZhcmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIHRoaXMuam9pbihyaWdodFRhYmxlLCBjb25kaXRpb25zLCAuLi52YXJhcmdzKTtcbiAgfVxuICBsZWZ0Sm9pbihyaWdodFRhYmxlOiBzdHJpbmcsIGNvbmRpdGlvbnM/OiBzdHJpbmcsIC4uLnZhcmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgbGV0IGpvaW5Ub2tlbiA9IHRoaXMuX2dldExlZnRKb2luKHJpZ2h0VGFibGUsIGNvbmRpdGlvbnMsIC4uLnZhcmFyZ3MpO1xuICAgIHRoaXMuX2Zyb20gPSBgJHt0aGlzLl9mcm9tIHx8IHRoaXMuZ2V0VGFibGUoKX0gJHtqb2luVG9rZW59YDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByaWdodEpvaW4ocmlnaHRUYWJsZTogc3RyaW5nLCBjb25kaXRpb25zPzogc3RyaW5nLCAuLi52YXJhcmdzOiBzdHJpbmdbXSkge1xuICAgIGxldCBqb2luVG9rZW4gPSB0aGlzLl9nZXRSaWdodEpvaW4ocmlnaHRUYWJsZSwgY29uZGl0aW9ucywgLi4udmFyYXJncyk7XG4gICAgdGhpcy5fZnJvbSA9IGAke3RoaXMuX2Zyb20gfHwgdGhpcy5nZXRUYWJsZSgpfSAke2pvaW5Ub2tlbn1gO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGZ1bGxKb2luKHJpZ2h0VGFibGU6IHN0cmluZywgY29uZGl0aW9ucz86IHN0cmluZywgLi4udmFyYXJnczogc3RyaW5nW10pIHtcbiAgICBsZXQgam9pblRva2VuID0gdGhpcy5fZ2V0RnVsbEpvaW4ocmlnaHRUYWJsZSwgY29uZGl0aW9ucywgLi4udmFyYXJncyk7XG4gICAgdGhpcy5fZnJvbSA9IGAke3RoaXMuX2Zyb20gfHwgdGhpcy5nZXRUYWJsZSgpfSAke2pvaW5Ub2tlbn1gO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGxpbWl0KG46IG51bWJlcikge1xuICAgIHRoaXMuX2xpbWl0ID0gbjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBvZmZzZXQobjogbnVtYmVyKSB7XG4gICAgdGhpcy5fb2Zmc2V0ID0gbjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB3aGVyZShmaXJzdDogQ29uZGl0aW9uLCBzZWNvbmQ/OiBEQlZhbHVlLCB0aGlyZD86IERCVmFsdWUpIHtcbiAgICBsZXQgd2hlcmVUb2tlbiA9IHRoaXMuX2dldENvbmRpdGlvblRva2VuKGZpcnN0LCBzZWNvbmQsIHRoaXJkKTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlV2hlcmVUb2tlbih3aGVyZVRva2VuLCBcIiglcykgQU5EICglcylcIik7XG4gIH1cbiAgd2hlcmVPcihmaXJzdDogQ29uZGl0aW9uLCBzZWNvbmQ/OiBEQlZhbHVlLCB0aGlyZD86IERCVmFsdWUpIHtcbiAgICBsZXQgd2hlcmVUb2tlbiA9IHRoaXMuX2dldENvbmRpdGlvblRva2VuT3IoZmlyc3QsIHNlY29uZCwgdGhpcmQpO1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVXaGVyZVRva2VuKHdoZXJlVG9rZW4sIFwiKCVzKSBBTkQgKCVzKVwiKTtcbiAgfVxuICBvcldoZXJlT3IoZmlyc3Q6IENvbmRpdGlvbiwgc2Vjb25kPzogREJWYWx1ZSwgdGhpcmQ/OiBEQlZhbHVlKSB7XG4gICAgbGV0IHdoZXJlVG9rZW4gPSB0aGlzLl9nZXRDb25kaXRpb25Ub2tlbk9yKGZpcnN0LCBzZWNvbmQsIHRoaXJkKTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlV2hlcmVUb2tlbih3aGVyZVRva2VuLCBcIiVzIE9SICVzXCIpO1xuICB9XG4gIHdoZXJlTm90KGZpcnN0OiBDb25kaXRpb24sIHNlY29uZD86IERCVmFsdWUsIHRoaXJkPzogREJWYWx1ZSkge1xuICAgIGxldCB3aGVyZVRva2VuID0gdGhpcy5fZ2V0Q29uZGl0aW9uVG9rZW5Ob3QoZmlyc3QsIHNlY29uZCwgdGhpcmQpO1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVXaGVyZVRva2VuKHdoZXJlVG9rZW4sIFwiKCVzKSBBTkQgKCVzKVwiKTtcbiAgfVxuICBvcldoZXJlKGZpcnN0OiBDb25kaXRpb24sIHNlY29uZD86IERCVmFsdWUsIHRoaXJkPzogREJWYWx1ZSkge1xuICAgIGxldCB3aGVyZVRva2VuID0gdGhpcy5fZ2V0Q29uZGl0aW9uVG9rZW4oZmlyc3QsIHNlY29uZCwgdGhpcmQpO1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVXaGVyZVRva2VuKHdoZXJlVG9rZW4sIFwiJXMgT1IgJXNcIik7XG4gIH1cbiAgb3JXaGVyZU5vdChmaXJzdDogQ29uZGl0aW9uLCBzZWNvbmQ/OiBEQlZhbHVlLCB0aGlyZD86IERCVmFsdWUpIHtcbiAgICBsZXQgd2hlcmVUb2tlbiA9IHRoaXMuX2dldENvbmRpdGlvblRva2VuTm90KGZpcnN0LCBzZWNvbmQsIHRoaXJkKTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlV2hlcmVUb2tlbih3aGVyZVRva2VuLCBcIiVzIE9SICVzXCIpO1xuICB9XG4gIHdoZXJlRXhpc3RzKGJ1aWxkZXI6IFNxbCkge1xuICAgIGlmICh0aGlzLl93aGVyZSkge1xuICAgICAgdGhpcy5fd2hlcmUgPSBgKCR7dGhpcy5fd2hlcmV9KSBBTkQgRVhJU1RTICgke2J1aWxkZXIuc3RhdGVtZW50KCl9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3doZXJlID0gYEVYSVNUUyAoJHtidWlsZGVyLnN0YXRlbWVudCgpfSlgO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB3aGVyZU5vdEV4aXN0cyhidWlsZGVyOiBTcWwpIHtcbiAgICBpZiAodGhpcy5fd2hlcmUpIHtcbiAgICAgIHRoaXMuX3doZXJlID0gYCgke3RoaXMuX3doZXJlfSkgQU5EIE5PVCBFWElTVFMgKCR7YnVpbGRlci5zdGF0ZW1lbnQoKX0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd2hlcmUgPSBgTk9UIEVYSVNUUyAoJHtidWlsZGVyLnN0YXRlbWVudCgpfSlgO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB3aGVyZUluKGNvbHM6IHN0cmluZyB8IHN0cmluZ1tdLCByYW5nZTogREJWYWx1ZVtdIHwgU3FsIHwgc3RyaW5nKSB7XG4gICAgbGV0IGluVG9rZW4gPSB0aGlzLl9nZXRJblRva2VuKGNvbHMsIHJhbmdlKTtcbiAgICBpZiAodGhpcy5fd2hlcmUpIHtcbiAgICAgIHRoaXMuX3doZXJlID0gYCgke3RoaXMuX3doZXJlfSkgQU5EICR7aW5Ub2tlbn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl93aGVyZSA9IGluVG9rZW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHdoZXJlTm90SW4oY29sczogc3RyaW5nIHwgc3RyaW5nW10sIHJhbmdlOiBEQlZhbHVlW10gfCBTcWwgfCBzdHJpbmcpIHtcbiAgICBsZXQgbm90SW5Ub2tlbiA9IHRoaXMuX2dldEluVG9rZW4oY29scywgcmFuZ2UsIFwiTk9UIElOXCIpO1xuICAgIGlmICh0aGlzLl93aGVyZSkge1xuICAgICAgdGhpcy5fd2hlcmUgPSBgKCR7dGhpcy5fd2hlcmV9KSBBTkQgJHtub3RJblRva2VufWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3doZXJlID0gbm90SW5Ub2tlbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgd2hlcmVOdWxsKGNvbDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX3doZXJlKSB7XG4gICAgICB0aGlzLl93aGVyZSA9IGAoJHt0aGlzLl93aGVyZX0pIEFORCAke2NvbH0gSVMgTlVMTGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3doZXJlID0gY29sICsgXCIgSVMgTlVMTFwiO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB3aGVyZU5vdE51bGwoY29sOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fd2hlcmUpIHtcbiAgICAgIHRoaXMuX3doZXJlID0gYCgke3RoaXMuX3doZXJlfSkgQU5EICR7Y29sfSBJUyBOT1QgTlVMTGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3doZXJlID0gY29sICsgXCIgSVMgTk9UIE5VTExcIjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgd2hlcmVCZXR3ZWVuKGNvbDogc3RyaW5nLCBsb3c6IG51bWJlciwgaGlnaDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3doZXJlKSB7XG4gICAgICB0aGlzLl93aGVyZSA9IGAoJHt0aGlzLl93aGVyZX0pIEFORCAoJHtjb2x9IEJFVFdFRU4gJHtsb3d9IEFORCAke2hpZ2h9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3doZXJlID0gYCR7Y29sfSBCRVRXRUVOICR7bG93fSBBTkQgJHtoaWdofWA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHdoZXJlTm90QmV0d2Vlbihjb2w6IHN0cmluZywgbG93OiBudW1iZXIsIGhpZ2g6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl93aGVyZSkge1xuICAgICAgdGhpcy5fd2hlcmUgPSBgKCR7dGhpcy5fd2hlcmV9KSBBTkQgKCR7Y29sfSBOT1QgQkVUV0VFTiAke2xvd30gQU5EICR7aGlnaH0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd2hlcmUgPSBgJHtjb2x9IE5PVCBCRVRXRUVOICR7bG93fSBBTkQgJHtoaWdofWA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHdoZXJlUmF3KHdoZXJlVG9rZW46IHN0cmluZykge1xuICAgIGlmICh3aGVyZVRva2VuID09PSBcIlwiKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3doZXJlKSB7XG4gICAgICB0aGlzLl93aGVyZSA9IGAoJHt0aGlzLl93aGVyZX0pIEFORCAoJHt3aGVyZVRva2VufSlgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl93aGVyZSA9IHdoZXJlVG9rZW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIG9yV2hlcmVFeGlzdHMoYnVpbGRlcjogU3FsKSB7XG4gICAgaWYgKHRoaXMuX3doZXJlKSB7XG4gICAgICB0aGlzLl93aGVyZSA9IGAke3RoaXMuX3doZXJlfSBPUiBFWElTVFMgKCR7YnVpbGRlci5zdGF0ZW1lbnQoKX0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd2hlcmUgPSBgRVhJU1RTICgke2J1aWxkZXJ9KWA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIG9yV2hlcmVOb3RFeGlzdHMoYnVpbGRlcjogU3FsKSB7XG4gICAgaWYgKHRoaXMuX3doZXJlKSB7XG4gICAgICB0aGlzLl93aGVyZSA9IGAke3RoaXMuX3doZXJlfSBPUiBOT1QgRVhJU1RTICgke2J1aWxkZXIuc3RhdGVtZW50KCl9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3doZXJlID0gYE5PVCBFWElTVFMgKCR7YnVpbGRlcn0pYDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgb3JXaGVyZUluKGNvbHM6IHN0cmluZyB8IHN0cmluZ1tdLCByYW5nZTogREJWYWx1ZVtdIHwgU3FsIHwgc3RyaW5nKSB7XG4gICAgbGV0IGluVG9rZW4gPSB0aGlzLl9nZXRJblRva2VuKGNvbHMsIHJhbmdlKTtcbiAgICBpZiAodGhpcy5fd2hlcmUpIHtcbiAgICAgIHRoaXMuX3doZXJlID0gYCR7dGhpcy5fd2hlcmV9IE9SICR7aW5Ub2tlbn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl93aGVyZSA9IGluVG9rZW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIG9yV2hlcmVOb3RJbihjb2xzOiBzdHJpbmcgfCBzdHJpbmdbXSwgcmFuZ2U6IERCVmFsdWVbXSB8IFNxbCB8IHN0cmluZykge1xuICAgIGxldCBub3RJblRva2VuID0gdGhpcy5fZ2V0SW5Ub2tlbihjb2xzLCByYW5nZSwgXCJOT1QgSU5cIik7XG4gICAgaWYgKHRoaXMuX3doZXJlKSB7XG4gICAgICB0aGlzLl93aGVyZSA9IGAke3RoaXMuX3doZXJlfSBPUiAke25vdEluVG9rZW59YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd2hlcmUgPSBub3RJblRva2VuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBvcldoZXJlTnVsbChjb2w6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl93aGVyZSkge1xuICAgICAgdGhpcy5fd2hlcmUgPSBgJHt0aGlzLl93aGVyZX0gT1IgJHtjb2x9IElTIE5VTExgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl93aGVyZSA9IGNvbCArIFwiIElTIE5VTExcIjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgb3JXaGVyZU5vdE51bGwoY29sOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fd2hlcmUpIHtcbiAgICAgIHRoaXMuX3doZXJlID0gYCR7dGhpcy5fd2hlcmV9IE9SICR7Y29sfSBJUyBOT1QgTlVMTGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3doZXJlID0gY29sICsgXCIgSVMgTk9UIE5VTExcIjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgb3JXaGVyZUJldHdlZW4oY29sOiBzdHJpbmcsIGxvdzogbnVtYmVyLCBoaWdoOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fd2hlcmUpIHtcbiAgICAgIHRoaXMuX3doZXJlID0gYCR7dGhpcy5fd2hlcmV9IE9SICgke2NvbH0gQkVUV0VFTiAke2xvd30gQU5EICR7aGlnaH0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd2hlcmUgPSBgJHtjb2x9IEJFVFdFRU4gJHtsb3d9IEFORCAke2hpZ2h9YDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgb3JXaGVyZU5vdEJldHdlZW4oY29sOiBzdHJpbmcsIGxvdzogbnVtYmVyLCBoaWdoOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fd2hlcmUpIHtcbiAgICAgIHRoaXMuX3doZXJlID0gYCR7dGhpcy5fd2hlcmV9IE9SICgke2NvbH0gTk9UIEJFVFdFRU4gJHtsb3d9IEFORCAke2hpZ2h9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3doZXJlID0gYCR7Y29sfSBOT1QgQkVUV0VFTiAke2xvd30gQU5EICR7aGlnaH1gO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBvcldoZXJlUmF3KHdoZXJlVG9rZW46IHN0cmluZykge1xuICAgIGlmICh3aGVyZVRva2VuID09PSBcIlwiKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3doZXJlKSB7XG4gICAgICB0aGlzLl93aGVyZSA9IGAke3RoaXMuX3doZXJlfSBPUiAke3doZXJlVG9rZW59YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd2hlcmUgPSB3aGVyZVRva2VuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBoYXZpbmcoZmlyc3Q6IENvbmRpdGlvbiwgc2Vjb25kPzogREJWYWx1ZSwgdGhpcmQ/OiBEQlZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX2hhdmluZykge1xuICAgICAgdGhpcy5faGF2aW5nID0gYCgke3RoaXMuX2hhdmluZ30pIEFORCAoJHt0aGlzLl9nZXRDb25kaXRpb25Ub2tlbihmaXJzdCwgc2Vjb25kLCB0aGlyZCl9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IHRoaXMuX2dldENvbmRpdGlvblRva2VuKGZpcnN0LCBzZWNvbmQsIHRoaXJkKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgaGF2aW5nTm90KGZpcnN0OiBDb25kaXRpb24sIHNlY29uZD86IERCVmFsdWUsIHRoaXJkPzogREJWYWx1ZSkge1xuICAgIGlmICh0aGlzLl9oYXZpbmcpIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGAoJHt0aGlzLl9oYXZpbmd9KSBBTkQgKCR7dGhpcy5fZ2V0Q29uZGl0aW9uVG9rZW5Ob3QoZmlyc3QsIHNlY29uZCwgdGhpcmQpfSlgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYXZpbmcgPSB0aGlzLl9nZXRDb25kaXRpb25Ub2tlbk5vdChmaXJzdCwgc2Vjb25kLCB0aGlyZCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGhhdmluZ0V4aXN0cyhidWlsZGVyOiBTcWwpIHtcbiAgICBpZiAodGhpcy5faGF2aW5nKSB7XG4gICAgICB0aGlzLl9oYXZpbmcgPSBgKCR7dGhpcy5faGF2aW5nfSkgQU5EIEVYSVNUUyAoJHtidWlsZGVyLnN0YXRlbWVudCgpfSlgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYXZpbmcgPSBgRVhJU1RTICgke2J1aWxkZXIuc3RhdGVtZW50KCl9KWA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGhhdmluZ05vdEV4aXN0cyhidWlsZGVyOiBTcWwpIHtcbiAgICBpZiAodGhpcy5faGF2aW5nKSB7XG4gICAgICB0aGlzLl9oYXZpbmcgPSBgKCR7dGhpcy5faGF2aW5nfSkgQU5EIE5PVCBFWElTVFMgKCR7YnVpbGRlci5zdGF0ZW1lbnQoKX0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGF2aW5nID0gYE5PVCBFWElTVFMgKCR7YnVpbGRlci5zdGF0ZW1lbnQoKX0pYDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgaGF2aW5nSW4oY29sczogc3RyaW5nIHwgc3RyaW5nW10sIHJhbmdlOiBEQlZhbHVlW10gfCBTcWwgfCBzdHJpbmcpIHtcbiAgICBsZXQgaW5Ub2tlbiA9IHRoaXMuX2dldEluVG9rZW4oY29scywgcmFuZ2UpO1xuICAgIGlmICh0aGlzLl9oYXZpbmcpIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGAoJHt0aGlzLl9oYXZpbmd9KSBBTkQgJHtpblRva2VufWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGluVG9rZW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGhhdmluZ05vdEluKGNvbHM6IHN0cmluZyB8IHN0cmluZ1tdLCByYW5nZTogREJWYWx1ZVtdIHwgU3FsIHwgc3RyaW5nKSB7XG4gICAgbGV0IG5vdEluVG9rZW4gPSB0aGlzLl9nZXRJblRva2VuKGNvbHMsIHJhbmdlLCBcIk5PVCBJTlwiKTtcbiAgICBpZiAodGhpcy5faGF2aW5nKSB7XG4gICAgICB0aGlzLl9oYXZpbmcgPSBgKCR7dGhpcy5faGF2aW5nfSkgQU5EICR7bm90SW5Ub2tlbn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYXZpbmcgPSBub3RJblRva2VuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBoYXZpbmdOdWxsKGNvbDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2hhdmluZykge1xuICAgICAgdGhpcy5faGF2aW5nID0gYCgke3RoaXMuX2hhdmluZ30pIEFORCAke2NvbH0gSVMgTlVMTGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGNvbCArIFwiIElTIE5VTExcIjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgaGF2aW5nTm90TnVsbChjb2w6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9oYXZpbmcpIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGAoJHt0aGlzLl9oYXZpbmd9KSBBTkQgJHtjb2x9IElTIE5PVCBOVUxMYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGF2aW5nID0gY29sICsgXCIgSVMgTk9UIE5VTExcIjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgaGF2aW5nQmV0d2Vlbihjb2w6IHN0cmluZywgbG93OiBudW1iZXIsIGhpZ2g6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9oYXZpbmcpIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGAoJHt0aGlzLl9oYXZpbmd9KSBBTkQgKCR7Y29sfSBCRVRXRUVOICR7bG93fSBBTkQgJHtoaWdofSlgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYXZpbmcgPSBgJHtjb2x9IEJFVFdFRU4gJHtsb3d9IEFORCAke2hpZ2h9YDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgaGF2aW5nTm90QmV0d2Vlbihjb2w6IHN0cmluZywgbG93OiBudW1iZXIsIGhpZ2g6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9oYXZpbmcpIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGAoJHt0aGlzLl9oYXZpbmd9KSBBTkQgKCR7Y29sfSBOT1QgQkVUV0VFTiAke2xvd30gQU5EICR7aGlnaH0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGF2aW5nID0gYCR7Y29sfSBOT1QgQkVUV0VFTiAke2xvd30gQU5EICR7aGlnaH1gO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBoYXZpbmdSYXcodG9rZW46IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9oYXZpbmcpIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGAoJHt0aGlzLl9oYXZpbmd9KSBBTkQgKCR7dG9rZW59KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IHRva2VuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBvckhhdmluZyhmaXJzdDogQ29uZGl0aW9uLCBzZWNvbmQ/OiBEQlZhbHVlLCB0aGlyZD86IERCVmFsdWUpIHtcbiAgICBpZiAodGhpcy5faGF2aW5nKSB7XG4gICAgICB0aGlzLl9oYXZpbmcgPSBgJHt0aGlzLl9oYXZpbmd9IE9SICR7dGhpcy5fZ2V0Q29uZGl0aW9uVG9rZW4oZmlyc3QsIHNlY29uZCwgdGhpcmQpfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IHRoaXMuX2dldENvbmRpdGlvblRva2VuKGZpcnN0LCBzZWNvbmQsIHRoaXJkKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgb3JIYXZpbmdOb3QoZmlyc3Q6IENvbmRpdGlvbiwgc2Vjb25kPzogREJWYWx1ZSwgdGhpcmQ/OiBEQlZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX2hhdmluZykge1xuICAgICAgdGhpcy5faGF2aW5nID0gYCR7dGhpcy5faGF2aW5nfSBPUiAke3RoaXMuX2dldENvbmRpdGlvblRva2VuTm90KGZpcnN0LCBzZWNvbmQsIHRoaXJkKX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYXZpbmcgPSB0aGlzLl9nZXRDb25kaXRpb25Ub2tlbk5vdChmaXJzdCwgc2Vjb25kLCB0aGlyZCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIG9ySGF2aW5nRXhpc3RzKGJ1aWxkZXI6IFNxbCkge1xuICAgIGlmICh0aGlzLl9oYXZpbmcpIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGAke3RoaXMuX2hhdmluZ30gT1IgRVhJU1RTICgke2J1aWxkZXIuc3RhdGVtZW50KCl9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGBFWElTVFMgKCR7YnVpbGRlci5zdGF0ZW1lbnQoKX0pYDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgb3JIYXZpbmdOb3RFeGlzdHMoYnVpbGRlcjogU3FsKSB7XG4gICAgaWYgKHRoaXMuX2hhdmluZykge1xuICAgICAgdGhpcy5faGF2aW5nID0gYCR7dGhpcy5faGF2aW5nfSBPUiBOT1QgRVhJU1RTICgke2J1aWxkZXIuc3RhdGVtZW50KCl9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGBOT1QgRVhJU1RTICgke2J1aWxkZXIuc3RhdGVtZW50KCl9KWA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIG9ySGF2aW5nSW4oY29sczogc3RyaW5nIHwgc3RyaW5nW10sIHJhbmdlOiBEQlZhbHVlW10gfCBTcWwgfCBzdHJpbmcpIHtcbiAgICBsZXQgaW5Ub2tlbiA9IHRoaXMuX2dldEluVG9rZW4oY29scywgcmFuZ2UpO1xuICAgIGlmICh0aGlzLl9oYXZpbmcpIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGAke3RoaXMuX2hhdmluZ30gT1IgJHtpblRva2VufWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGluVG9rZW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIG9ySGF2aW5nTm90SW4oY29sczogc3RyaW5nIHwgc3RyaW5nW10sIHJhbmdlOiBEQlZhbHVlW10gfCBTcWwgfCBzdHJpbmcpIHtcbiAgICBsZXQgbm90SW5Ub2tlbiA9IHRoaXMuX2dldEluVG9rZW4oY29scywgcmFuZ2UsIFwiTk9UIElOXCIpO1xuICAgIGlmICh0aGlzLl9oYXZpbmcpIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGAke3RoaXMuX2hhdmluZ30gT1IgJHtub3RJblRva2VufWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IG5vdEluVG9rZW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIG9ySGF2aW5nTnVsbChjb2w6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9oYXZpbmcpIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGAke3RoaXMuX2hhdmluZ30gT1IgJHtjb2x9IElTIE5VTExgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYXZpbmcgPSBjb2wgKyBcIiBJUyBOVUxMXCI7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIG9ySGF2aW5nTm90TnVsbChjb2w6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9oYXZpbmcpIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGAke3RoaXMuX2hhdmluZ30gT1IgJHtjb2x9IElTIE5PVCBOVUxMYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGF2aW5nID0gY29sICsgXCIgSVMgTk9UIE5VTExcIjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgb3JIYXZpbmdCZXR3ZWVuKGNvbDogc3RyaW5nLCBsb3c6IG51bWJlciwgaGlnaDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2hhdmluZykge1xuICAgICAgdGhpcy5faGF2aW5nID0gYCR7dGhpcy5faGF2aW5nfSBPUiAoJHtjb2x9IEJFVFdFRU4gJHtsb3d9IEFORCAke2hpZ2h9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGAke2NvbH0gQkVUV0VFTiAke2xvd30gQU5EICR7aGlnaH1gO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBvckhhdmluZ05vdEJldHdlZW4oY29sOiBzdHJpbmcsIGxvdzogbnVtYmVyLCBoaWdoOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5faGF2aW5nKSB7XG4gICAgICB0aGlzLl9oYXZpbmcgPSBgJHt0aGlzLl9oYXZpbmd9IE9SICgke2NvbH0gTk9UIEJFVFdFRU4gJHtsb3d9IEFORCAke2hpZ2h9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGAke2NvbH0gTk9UIEJFVFdFRU4gJHtsb3d9IEFORCAke2hpZ2h9YDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgb3JIYXZpbmdSYXcodG9rZW46IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9oYXZpbmcpIHtcbiAgICAgIHRoaXMuX2hhdmluZyA9IGAke3RoaXMuX2hhdmluZ30gT1IgJHt0b2tlbn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYXZpbmcgPSB0b2tlbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJtYWtlUmF3VG9rZW4iLCJzIiwicmF3VG9rZW4iLCJERUZBVUxUIiwiTlVMTCIsInN0cmluZ0Zvcm1hdCIsInZhcmFyZ3MiLCJzdGF0dXMiLCJyZXMiLCJqIiwiaSIsImxlbmd0aCIsImMiLCJwdXNoIiwiam9pbiIsIl9wcmVmaXhXaXRoViIsImNvbHVtbiIsIl9lc2NhcGVGYWN0b3J5IiwiaXNMaXRlcmFsIiwiaXNCcmFja2V0IiwiYXNTcWxUb2tlbiIsInZhbHVlIiwicmVwbGFjZUFsbCIsIlN0cmluZyIsIlNxbCIsInN0YXRlbWVudCIsIkFycmF5IiwiaXNBcnJheSIsIkVycm9yIiwidG9rZW4iLCJtYXAiLCJhc0xpdGVyYWwiLCJhc1Rva2VuIiwiZ2V0Q3RlUmV0dXJuaW5nVmFsdWVzIiwib3B0cyIsInZhbHVlcyIsImNvbHVtbnMiLCJjb2wiLCJsaXRlcmFscyIsImUiLCJnZXRSZXR1cm5pbmdUb2tlbiIsImN0ZVJldHVybmluZyIsInJldHVybmluZyIsImFzc2VtYmxlU3FsIiwidXBkYXRlIiwiZnJvbSIsIndoZXJlIiwidGFibGVOYW1lIiwiaW5zZXJ0IiwiZGVsZXRlIiwidXNpbmciLCJncm91cCIsImhhdmluZyIsIm9yZGVyIiwibGltaXQiLCJvZmZzZXQiLCJkaXN0aW5jdCIsInNlbGVjdCIsIndpdGgiLCJ0b1N0cmluZyIsImVycm9yIiwiZXJyTXNnIiwiX2dldEtleXMiLCJyb3dzIiwiZCIsInJvdyIsIk9iamVjdCIsImtleXMiLCJrIiwiX3Jvd3NUb0FycmF5IiwiZmFsbGJhY2siLCJuIiwiciIsImVudHJpZXMiLCJ2IiwidW5kZWZpbmVkIiwiX2dldEluc2VydFZhbHVlc1Rva2VuIiwidmFsdWVMaXN0IiwiX2dldEJ1bGtJbnNlcnRWYWx1ZXNUb2tlbiIsIl9nZXRVcGRhdGVTZXRUb2tlbiIsImtleSIsInRva2VucyIsInNldHMiLCJfZ2V0U2VsZWN0VG9rZW4iLCJhIiwiYiIsIl9nZXRTZWxlY3RUb2tlbkxpdGVyYWwiLCJmaXJzdCIsInNlY29uZCIsIm5hbWUiLCJfZ2V0VXBkYXRlVG9rZW4iLCJrdiIsIl9nZXRXaXRoVG9rZW4iLCJfZ2V0SW5zZXJ0VG9rZW4iLCJpbnNlcnRWYWx1ZXMiLCJpbnNlcnRDb2x1bW5zIiwiX2dldEJ1bGtJbnNlcnRUb2tlbiIsImluc2VydFZhbHVlc0FycmF5IiwiX3NldFNlbGVjdFN1YnF1ZXJ5SW5zZXJ0VG9rZW4iLCJzdWJRdWVyeSIsImNvbHVtbnNUb2tlbiIsIl9zZWxlY3QiLCJfaW5zZXJ0IiwiX3NldENVRFN1YnF1ZXJ5SW5zZXJ0VG9rZW4iLCJfY3RlUmV0dXJuaW5nIiwiY3IiLCJjdGVDb2x1bW5zIiwibGl0ZXJhbENvbHVtbnMiLCJDVURTZWxlY3RRdWVyeSIsIm5ldyIsInNlbGVjdExpdGVyYWwiLCJfcmV0dXJuaW5nQXJncyIsImZsYXQiLCJfZ2V0VXBzZXJ0VG9rZW4iLCJ2YWx1ZXNUb2tlbiIsInVwc2VydENvbHVtbnMiLCJpbnNlcnRUb2tlbiIsIl9nZXRCdWxrVXBzZXJ0VG9rZW4iLCJfZ2V0VXBzZXJ0UXVlcnlUb2tlbiIsIl9nZXRKb2luRXhwciIsIl9nZXRKb2luVG9rZW4iLCJqb2luVHlwZSIsInJpZ2h0VGFibGUiLCJjb25kaXRpb25zIiwiX2dldElubmVySm9pbiIsIl9nZXRMZWZ0Sm9pbiIsIl9nZXRSaWdodEpvaW4iLCJfZ2V0RnVsbEpvaW4iLCJfZ2V0SW5Ub2tlbiIsImNvbHMiLCJyYW5nZSIsIm9wZXJhdG9yIiwiX2dldFVwZGF0ZVF1ZXJ5VG9rZW4iLCJzdWJTZWxlY3QiLCJfZ2V0Sm9pbkNvbmRpdGlvbnMiLCJsZWZ0VGFibGUiLCJfZ2V0Q3RlVmFsdWVzTGl0ZXJhbCIsIl9oYW5kbGVXaGVyZVRva2VuIiwid2hlcmVUb2tlbiIsInRwbCIsIl93aGVyZSIsIl9nZXRDb25kaXRpb25Ub2tlbkZyb21UYWJsZSIsImt3YXJncyIsImxvZ2ljIiwiX2dldENvbmRpdGlvblRva2VuIiwidGhpcmQiLCJjYWxsIiwiZ3JvdXBXaGVyZSIsIm1lc3NhZ2UiLCJfZ2V0Q29uZGl0aW9uVG9rZW5PciIsIl9nZXRDb25kaXRpb25Ub2tlbk5vdCIsIl9oYW5kbGVTZXRPcHRpb24iLCJvdGhlclNxbCIsImlubmVyQXR0ciIsInNsaWNlIiwidG9VcHBlckNhc2UiLCJfc3RhdGVtZW50Rm9yU2V0IiwicHJvdG90eXBlIiwiX2ludGVyc2VjdCIsIl9pbnRlcnNlY3RBbGwiLCJfdW5pb24iLCJfdW5pb25BbGwiLCJfZXhjZXB0IiwiX2V4Y2VwdEFsbCIsImdldFRhYmxlIiwiX3dpdGgiLCJfam9pbiIsIl9kaXN0aW5jdCIsIl9yZXR1cm5pbmciLCJfdXBkYXRlIiwiX2RlbGV0ZSIsIl91c2luZyIsIl9mcm9tIiwiX2dyb3VwIiwiX2hhdmluZyIsIl9vcmRlciIsIl9saW1pdCIsIl9vZmZzZXQiLCJ3aXRoVG9rZW4iLCJ1bmlvbiIsInVuaW9uQWxsIiwiZXhjZXB0IiwiZXhjZXB0QWxsIiwiaW50ZXJzZWN0IiwiaW50ZXJzZWN0QWxsIiwiYXMiLCJ0YWJsZUFsaWFzIiwiX2FzIiwid2l0aFZhbHVlcyIsIndpdGhSb3dzIiwid2l0aENvbHVtbnMiLCJjdGVOYW1lIiwiY3RlVmFsdWVzIiwidXBzZXJ0IiwiaXNJbnN0YW5jZSIsIm1lcmdlIiwibWVyZ2VSb3dzIiwibWVyZ2VDb2x1bW5zIiwiam9pbkNvbmQiLCJ2YWxzQ29sdW1ucyIsImluc2VydFN1YnF1ZXJ5IiwibGVmdEpvaW4iLCJ3aGVyZU51bGwiLCJ1cGRhdGVkU3VicXVlcnkiLCJ1cGRhdGVzIiwidXBkYXRlc0NvbHVtbnMiLCJmaWx0ZXIiLCJ1cGRhdGVzUm93cyIsImdldHMiLCJnZXRza2V5cyIsImdldHNDb2x1bW5zIiwicmlnaHRKb2luIiwibWVyZ2VHZXRzIiwiZ2V0c1Jvd3MiLCJjb3B5IiwiYXNzaWduIiwiY3JlYXRlIiwiZ2V0UHJvdG90eXBlT2YiLCJyZXR1cm5pbmdMaXRlcmFsIiwiZ3JvdXBCeSIsIm9yZGVyQnkiLCJfZ2V0QXJnc1Rva2VuIiwiam9pblRva2VuIiwiaW5uZXJKb2luIiwiZnVsbEpvaW4iLCJ3aGVyZU9yIiwib3JXaGVyZU9yIiwid2hlcmVOb3QiLCJvcldoZXJlIiwib3JXaGVyZU5vdCIsIndoZXJlRXhpc3RzIiwiYnVpbGRlciIsIndoZXJlTm90RXhpc3RzIiwid2hlcmVJbiIsImluVG9rZW4iLCJ3aGVyZU5vdEluIiwibm90SW5Ub2tlbiIsIndoZXJlTm90TnVsbCIsIndoZXJlQmV0d2VlbiIsImxvdyIsImhpZ2giLCJ3aGVyZU5vdEJldHdlZW4iLCJ3aGVyZVJhdyIsIm9yV2hlcmVFeGlzdHMiLCJvcldoZXJlTm90RXhpc3RzIiwib3JXaGVyZUluIiwib3JXaGVyZU5vdEluIiwib3JXaGVyZU51bGwiLCJvcldoZXJlTm90TnVsbCIsIm9yV2hlcmVCZXR3ZWVuIiwib3JXaGVyZU5vdEJldHdlZW4iLCJvcldoZXJlUmF3IiwiaGF2aW5nTm90IiwiaGF2aW5nRXhpc3RzIiwiaGF2aW5nTm90RXhpc3RzIiwiaGF2aW5nSW4iLCJoYXZpbmdOb3RJbiIsImhhdmluZ051bGwiLCJoYXZpbmdOb3ROdWxsIiwiaGF2aW5nQmV0d2VlbiIsImhhdmluZ05vdEJldHdlZW4iLCJoYXZpbmdSYXciLCJvckhhdmluZyIsIm9ySGF2aW5nTm90Iiwib3JIYXZpbmdFeGlzdHMiLCJvckhhdmluZ05vdEV4aXN0cyIsIm9ySGF2aW5nSW4iLCJvckhhdmluZ05vdEluIiwib3JIYXZpbmdOdWxsIiwib3JIYXZpbmdOb3ROdWxsIiwib3JIYXZpbmdCZXR3ZWVuIiwib3JIYXZpbmdOb3RCZXR3ZWVuIiwib3JIYXZpbmdSYXciXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCQSxTQUFTQSxZQUFZLENBQUNDLENBQVMsRUFBRTtRQUN0QkMsUUFBUSxHQUFq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
