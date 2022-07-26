type DBValue = string | number | bigint | boolean | null | undefined | (() => string) | DBValue[];
type Row = { [key: string]: DBValue };
type SqlValue = DBValue | Sql;
type SqlSerializer = (value: SqlValue) => string;
type KeyExist = { [key: string]: boolean };
type CteReturningOpts = { columns: string[]; literals: DBValue[]; literalColumns: string[] };
type ConditionTable = { [s: string]: DBValue };
type Condition = ConditionTable | string | (() => string | Sql);
type InnerSetProperty = "_union" | "_unionAll" | "_except" | "_exceptAll" | "_intersect" | "_intersectAll";
type SqlAssembleOpts = {
  tableName: string;
  with?: string;
  join?: string;
  distinct?: string;
  returning?: string;
  cteReturning?: CteReturningOpts;
  insert?: string;
  update?: string;
  delete?: string;
  using?: string;
  select?: string;
  from?: string;
  where?: string;
  group?: string;
  having?: string;
  order?: string;
  limit?: string;
  offset?: string;
};

const NULL = {};

function assert(bool: boolean, errMsg: string | undefined) {
  if (!bool) {
    throw new Error(errMsg);
  } else {
    return bool;
  }
}
const stringFormat = (s: string, ...varargs: string[]): string => {
  let status = 0;
  let res: string[] = [];
  let j = -1;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
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
function makeRawToken(s: string) {
  function rawToken() {
    return s;
  }
  return rawToken;
}
const DEFAULT = makeRawToken("DEFAULT");

function _prefixWithV(column: string) {
  return "V." + column;
}

function _escapeFactory(isLiteral: boolean, isBracket: boolean): SqlSerializer {
  function asSqlToken(value: SqlValue): string {
    if ("string" === typeof value) {
      if (isLiteral) {
        return "'" + value.replaceAll("'", "''") + "'";
      } else {
        return value;
      }
    } else if ("number" === typeof value || "bigint" === typeof value) {
      return String(value);
    } else if ("boolean" === typeof value) {
      return value === true ? "TRUE" : "FALSE";
    } else if ("function" === typeof value) {
      return value();
    } else if (NULL === value || null === value) {
      return "NULL";
    } else if (value instanceof Sql) {
      return "(" + value.statement() + ")";
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        throw new Error("empty array as Sql value is not allowed");
      }
      let token = value.map(asSqlToken).join(", ");
      if (isBracket) {
        return "(" + token + ")";
      } else {
        return token;
      }
    } else {
      throw new Error(`don't know how to escape value: ${value} (${typeof value})`);
    }
  }
  return asSqlToken;
}
const asLiteral = _escapeFactory(true, true);
const asToken = _escapeFactory(false, false);

function getCteReturningValues(opts: CteReturningOpts) {
  let values: string[] = [];
  for (let col of opts.columns) {
    values.push(asToken(col));
  }
  if (opts.literals) {
    for (let e of opts.literals) {
      values.push(asLiteral(e));
    }
  }
  return values;
}

function getReturningToken(opts: { cteReturning?: CteReturningOpts; returning?: string }) {
  if (opts.cteReturning) {
    return " RETURNING " + asToken(getCteReturningValues(opts.cteReturning));
  } else if (opts.returning) {
    return " RETURNING " + opts.returning;
  } else {
    return "";
  }
}

function assembleSql(opts: SqlAssembleOpts): string {
  let statement;
  if (opts.update) {
    let from = (opts.from && " FROM " + opts.from) || "";
    let where = (opts.where && " WHERE " + opts.where) || "";
    let returning = getReturningToken(opts);
    statement = `UPDATE ${opts.tableName} SET ${opts.update}${from}${where}${returning}`;
  } else if (opts.insert) {
    let returning = getReturningToken(opts);
    statement = `INSERT INTO ${opts.tableName} ${opts.insert}${returning}`;
  } else if (opts.delete) {
    let using = (opts.using && " USING " + opts.using) || "";
    let where = (opts.where && " WHERE " + opts.where) || "";
    let returning = getReturningToken(opts);
    statement = `DELETE FROM ${opts.tableName} ${using}${where}${returning}`;
  } else {
    let from = opts.from || opts.tableName;
    let where = (opts.where && " WHERE " + opts.where) || "";
    let group = (opts.group && " GROUP BY " + opts.group) || "";
    let having = (opts.having && " HAVING " + opts.having) || "";
    let order = (opts.order && " ORDER BY " + opts.order) || "";
    let limit = (opts.limit && " LIMIT " + opts.limit) || "";
    let offset = (opts.offset && " OFFSET " + opts.offset) || "";
    statement = `SELECT ${(opts.distinct && "DISTINCT ") || ""}${
      opts.select || "*"
    } FROM ${from}${where}${group}${having}${order}${limit}${offset}`;
  }
  return (opts.with && `WITH ${opts.with} ${statement}`) || statement;
}

class Sql {
  static r = makeRawToken;
  static DEFAULT = DEFAULT;
  static NULL = NULL;
  static asToken = asToken;
  static asLiteral = asLiteral;
  static new(tableName: string) {
    return new this(tableName);
  }
  tableName: string;
  _as?: string;
  _with?: string;
  _join?: string;
  _distinct?: string;
  _returning?: string;
  _cteReturning?: CteReturningOpts;
  _returningArgs?: DBValue[];
  _insert?: string;
  _update?: string;
  _delete?: string;
  _using?: string;
  _select?: string;
  _from?: string;
  _where?: string;
  _group?: string;
  _having?: string;
  _order?: string;
  _limit?: string;
  _offset?: string;
  _union?: Sql | string;
  _unionAll?: Sql | string;
  _except?: Sql | string;
  _exceptAll?: Sql | string;
  _intersect?: Sql | string;
  _intersectAll?: Sql | string;
  constructor(tableName: string) {
    this.tableName = tableName;
  }
  toString() {
    return this.statement();
  }
  error(errMsg: string | Error | object): never {
    if (typeof errMsg == "string") {
      throw new Error(errMsg);
    } else if (errMsg instanceof Error) {
      throw errMsg;
    } else {
      throw errMsg;
    }
  }
  _getKeys(rows: Row[] | Row) {
    let columns: string[] = [];
    if (rows instanceof Array) {
      let d: KeyExist = {};
      for (let row of rows) {
        for (let k of Object.keys(row)) {
          if (!d[k]) {
            d[k] = true;
            columns.push(k);
          }
        }
      }
    } else {
      for (let k of Object.keys(rows)) {
        columns.push(k);
      }
    }
    return columns;
  }
  _rowsToArray(rows: Row[], columns: string[], fallback: any): DBValue[][] {
    let c = columns.length;
    let n = rows.length;
    let res: DBValue[][] = new Array(n);
    for (let r = 0; r < n; r = r + 1) {
      res[r] = new Array(c);
    }
    for (let [i, col] of columns.entries()) {
      for (let j = 0; j < n; j = j + 1) {
        let v = rows[j][col];
        if (v !== undefined) {
          res[j][i] = v;
        } else {
          res[j][i] = fallback;
        }
      }
    }
    return res;
  }
  _getInsertValuesToken(row: Row, columns: string[]): [string, string[]] {
    let valueList: DBValue[] = [];
    if (!columns) {
      columns = [];
      for (let [k, v] of Object.entries(row)) {
        columns.push(k);
        valueList.push(v);
      }
    } else {
      for (let col of columns) {
        let e = row[col];
        if (e !== undefined) {
          valueList.push(e);
        } else {
          valueList.push(DEFAULT);
        }
      }
    }
    return [asLiteral(valueList), columns];
  }
  _getBulkInsertValuesToken(rows: Row[], columns: string[], fallback: any): [string[], string[]] {
    columns = columns || this._getKeys(rows);
    return [this._rowsToArray(rows, columns, fallback).map(asLiteral), columns];
  }
  _getUpdateSetToken(columns: string[], key: string | string[], tableName: string) {
    let tokens = [];
    if (typeof key === "string") {
      for (let col of columns) {
        if (col !== key) {
          tokens.push(`${col} = ${tableName}.${col}`);
        }
      }
    } else {
      let sets: KeyExist = {};
      for (let k of key) {
        sets[k] = true;
      }
      for (let col of columns) {
        if (!sets[col]) {
          tokens.push(`${col} = ${tableName}.${col}`);
        }
      }
    }
    return tokens.join(", ");
  }
  _getSelectToken(a: DBValue, b?: DBValue, ...varargs: DBValue[]): string {
    if (a === undefined) {
      return this.error("augument is required for _get_select_token");
    } else if (b === undefined) {
      return asToken(a);
    } else {
      let s = asToken(a) + ", " + asToken(b);
      for (let i = 0; i < varargs.length; i = i + 1) {
        s = s + ", " + asToken(varargs[i]);
      }
      return s;
    }
  }
  _getSelectTokenLiteral(first: DBValue, second: DBValue, ...varargs: DBValue[]): string {
    if (first === undefined) {
      return this.error("arguments must be provided for _get_select_token_literal");
    } else if (second === undefined) {
      if (typeof first === "string") {
        return asLiteral(first);
      } else if (first instanceof Array) {
        let tokens = [];
        for (let i = 0; i < first.length; i = i + 1) {
          tokens[i] = asLiteral(first[i]);
        }
        return asToken(tokens);
      } else {
        return asLiteral(first);
      }
    } else {
      let s = asLiteral(first) + ", " + asLiteral(second);
      for (let i = 0; i < varargs.length; i = i + 1) {
        let name = varargs[i];
        s = s + ", " + asLiteral(name);
      }
      return s;
    }
  }
  _getUpdateToken(row: Row, columns: string[]) {
    let kv: string[] = [];
    if (!columns) {
      for (let [k, v] of Object.entries(row)) {
        kv.push(`${k} = ${asLiteral(v)}`);
      }
    } else {
      for (let k of columns) {
        let v = row[k];
        kv.push(`${k} = ${(v !== undefined && asLiteral(v)) || "DEFAULT"}`);
      }
    }
    return kv.join(", ");
  }
  _getWithToken(name: string, token?: SqlValue) {
    if (token instanceof Sql) {
      return `${name} AS (${token.statement()})`;
    } else if (token !== undefined) {
      return `${name} AS ${token}`;
    } else {
      return asToken(name);
    }
  }
  _getInsertToken(row: Row, columns: string[]) {
    const [insertValues, insertColumns] = this._getInsertValuesToken(row, columns);
    return `(${asToken(insertColumns)}) VALUES ${insertValues}`;
  }
  _getBulkInsertToken(rows: Row[], columns: string[]) {
    const [insertValuesArray, insertColumns] = this._getBulkInsertValuesToken(rows, columns, DEFAULT);
    return `(${asToken(insertColumns)}) VALUES ${asToken(insertValuesArray)}`;
  }
  _setSelectSubqueryInsertToken(subQuery: Sql, columns: string[]) {
    const columnsToken = asToken(columns || subQuery._select || "");
    if (columnsToken !== "") {
      this._insert = `(${columnsToken}) ${subQuery.statement()}`;
    } else {
      this._insert = subQuery.statement();
    }
  }
  _setCUDSubqueryInsertToken(subQuery: Sql) {
    if (subQuery._cteReturning) {
      let cr = subQuery._cteReturning;
      let cteColumns = cr.columns;
      let insertColumns = [...cteColumns, ...cr.literalColumns];
      let CUDSelectQuery = Sql.new("d").select(cteColumns).selectLiteral(cr.literals);
      this.with(`d(${asToken(cteColumns)})`, subQuery);
      this._insert = `(${asToken(insertColumns)}) ${CUDSelectQuery}`;
    } else if (subQuery._returningArgs) {
      let insertColumns = subQuery._returningArgs.flat();
      let CUDSelectQuery = Sql.new("d").select(insertColumns);
      this.with(`d(${asToken(insertColumns)})`, subQuery);
      this._insert = `(${asToken(insertColumns)}) ${CUDSelectQuery}`;
    }
  }
  _getUpsertToken(row: Row, key: string | string[], columns: string[]) {
    const [valuesToken, upsertColumns] = this._getInsertValuesToken(row, columns);
    let insertToken = `(${asToken(upsertColumns)}) VALUES ${valuesToken} ON CONFLICT (${this._getSelectToken(key)})`;
    if ((Array.isArray(key) && key.length === columns.length) || columns.length === 1) {
      return `${insertToken} DO NOTHING`;
    } else {
      return `${insertToken} DO UPDATE SET ${this._getUpdateSetToken(columns, key, "EXCLUDED")}`;
    }
  }
  _getBulkUpsertToken(rows: Row[], key: string | string[], columns: string[]) {
    const [insertValuesArray, insertColumns] = this._getBulkInsertValuesToken(rows, columns, DEFAULT);
    let insertToken = `(${asToken(insertColumns)}) VALUES ${asToken(
      insertValuesArray
    )} ON CONFLICT (${this._getSelectToken(key)})`;
    if ((Array.isArray(key) && key.length === columns.length) || columns.length === 1) {
      return `${insertToken} DO NOTHING`;
    } else {
      return `${insertToken} DO UPDATE SET ${this._getUpdateSetToken(columns, key, "EXCLUDED")}`;
    }
  }
  _getUpsertQueryToken(rows: Sql, key: string | string[], columns: string[]) {
    let columnsToken = this._getSelectToken(columns);
    let insertToken = `(${columnsToken}) ${rows.statement()} ON CONFLICT (${this._getSelectToken(key)})`;
    if ((Array.isArray(key) && key.length === columns.length) || columns.length === 1) {
      return `${insertToken} DO NOTHING`;
    } else {
      return `${insertToken} DO UPDATE SET ${this._getUpdateSetToken(columns, key, "EXCLUDED")}`;
    }
  }
  _getJoinExpr(a: string, b?: DBValue, c?: DBValue) {
    if (a === undefined) {
      return this.error("auguments is required for _get_join_expr");
    } else if (b === undefined) {
      return a;
    } else if (c === undefined) {
      return `${a} = ${b}`;
    } else {
      return `${a} ${b} ${c}`;
    }
  }
  _getJoinToken(joinType: string, rightTable: string, conditions?: string, ...varargs: string[]) {
    if (conditions !== undefined) {
      return `${joinType} JOIN ${rightTable} ON (${this._getJoinExpr(conditions, ...varargs)})`;
    } else {
      return `${joinType} JOIN ${rightTable}`;
    }
  }
  _getInnerJoin(rightTable: string, conditions?: string, ...varargs: string[]) {
    return this._getJoinToken("INNER", rightTable, conditions, ...varargs);
  }
  _getLeftJoin(rightTable: string, conditions?: string, ...varargs: string[]) {
    return this._getJoinToken("LEFT", rightTable, conditions, ...varargs);
  }
  _getRightJoin(rightTable: string, conditions?: string, ...varargs: string[]) {
    return this._getJoinToken("RIGHT", rightTable, conditions, ...varargs);
  }
  _getFullJoin(rightTable: string, conditions?: string, ...varargs: string[]) {
    return this._getJoinToken("FULL", rightTable, conditions, ...varargs);
  }
  _getInToken(cols: string | string[], range: DBValue[] | Sql | string, operator: string = "IN") {
    cols = asToken(cols);
    if (typeof range === "object") {
      if (range instanceof Sql) {
        return `(${cols}) ${operator} (${range.statement()})`;
      } else {
        return `(${cols}) ${operator} ${asLiteral(range)}`;
      }
    } else {
      return `(${cols}) ${operator} ${range}`;
    }
  }
  _getUpdateQueryToken(subSelect: Sql, columns: DBValue[]) {
    return `(${(columns && this._getSelectToken(columns)) || subSelect._select}) = (${subSelect.statement()})`;
  }
  _getJoinConditions(key: string | string[], leftTable: string, rightTable: string) {
    if (typeof key === "string") {
      return `${leftTable}.${key} = ${rightTable}.${key}`;
    }
    let res: string[] = [];
    for (let k of key) {
      res.push(`${leftTable}.${k} = ${rightTable}.${k}`);
    }
    return res.join(" AND ");
  }
  _getCteValuesLiteral(rows: Row[], columns: string[]) {
    return this._getBulkInsertValuesToken(rows, columns, NULL);
  }
  _handleWhereToken(whereToken: string | undefined, tpl: string) {
    if (whereToken === undefined || whereToken === "") {
      return this;
    } else if (this._where === undefined) {
      this._where = whereToken;
    } else {
      this._where = stringFormat(tpl, this._where, whereToken);
    }
    return this;
  }
  _getConditionTokenFromTable(kwargs: ConditionTable, logic?: string): string {
    let tokens: string[] = [];
    for (let [k, value] of Object.entries(kwargs)) {
      tokens.push(`${k} = ${asLiteral(value)}`);
    }
    if (logic === undefined) {
      return tokens.join(" AND ");
    } else {
      return tokens.join(" " + (logic + " "));
    }
  }
  _getConditionToken(first: Condition, second?: DBValue, third?: DBValue) {
    if (first === undefined) {
      return this.error("arguments is required for _get_condition_token");
    } else if (second === undefined) {
      if (typeof first === "object") {
        return this._getConditionTokenFromTable(first);
      } else if (typeof first === "string") {
        return first;
      } else if (typeof first === "function") {
        let _where = this._where;
        delete this._where;
        let res;
        try {
          res = first.call(this);
          if (res === this) {
            let groupWhere = this._where;
            this._where = _where;
            return groupWhere;
          } else {
            this._where = _where;
            return res;
          }
        } catch (error: any) {
          return this.error("condition function raise error:" + error.message);
        }
      } else {
        return this.error("invalid condition type: " + typeof first);
      }
    } else if (third === undefined) {
      return `${first} = ${asLiteral(second)}`;
    } else {
      return `${first} ${second} ${asLiteral(third)}`;
    }
  }
  _getConditionTokenOr(first: Condition, second?: DBValue, third?: DBValue) {
    if (typeof first === "object") {
      return this._getConditionTokenFromTable(first, "OR");
    } else {
      return this._getConditionToken(first, second, third);
    }
  }
  _getConditionTokenNot(first: Condition, second?: DBValue, third?: DBValue) {
    let token;
    if (typeof first === "object") {
      token = this._getConditionTokenFromTable(first, "OR");
    } else {
      token = this._getConditionToken(first, second, third);
    }
    return token !== "" ? `NOT (${token})` : "";
  }
  _handleSetOption(otherSql: Sql, innerAttr: InnerSetProperty) {
    if (!this[innerAttr]) {
      this[innerAttr] = otherSql;
    } else {
      this[innerAttr] = `(${this[innerAttr]}) ${innerAttr.slice(1).toUpperCase()} (${otherSql.statement()})`;
    }
    this.statement = this._statementForSet;
    return this;
  }
  _statementForSet() {
    let statement = Sql.prototype.statement.call(this);
    if (this._intersect) {
      statement = `(${statement}) INTERSECT (${this._intersect})`;
    } else if (this._intersectAll) {
      statement = `(${statement}) INTERSECT ALL (${this._intersectAll})`;
    } else if (this._union) {
      statement = `(${statement}) UNION (${this._union})`;
    } else if (this._unionAll) {
      statement = `(${statement}) UNION ALL (${this._unionAll})`;
    } else if (this._except) {
      statement = `(${statement}) EXCEPT (${this._except})`;
    } else if (this._exceptAll) {
      statement = `(${statement}) EXCEPT ALL (${this._exceptAll})`;
    }
    return statement;
  }
  statement() {
    let tableName = this.getTable();
    let statement = assembleSql({
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
      offset: this._offset,
    });
    return statement;
  }
  with(name: string, token?: SqlValue) {
    let withToken = this._getWithToken(name, token);
    if (this._with) {
      this._with = `${this._with}, ${withToken}`;
    } else {
      this._with = withToken;
    }
    return this;
  }
  union(otherSql: Sql) {
    return this._handleSetOption(otherSql, "_union");
  }
  unionAll(otherSql: Sql) {
    return this._handleSetOption(otherSql, "_unionAll");
  }
  except(otherSql: Sql) {
    return this._handleSetOption(otherSql, "_except");
  }
  exceptAll(otherSql: Sql) {
    return this._handleSetOption(otherSql, "_exceptAll");
  }
  intersect(otherSql: Sql) {
    return this._handleSetOption(otherSql, "_intersect");
  }
  intersectAll(otherSql: Sql) {
    return this._handleSetOption(otherSql, "_intersectAll");
  }
  as(tableAlias: string) {
    this._as = tableAlias;
    return this;
  }
  withValues(name: string, rows: Row[]) {
    let columns = this._getKeys(rows[0]);
    [rows, columns] = this._getCteValuesLiteral(rows, columns);
    let cteName = `${name}(${columns.join(", ")})`;
    let cteValues = `(VALUES ${asToken(rows)})`;
    return this.with(cteName, cteValues);
  }
  insert(rows: { _select?: any } | undefined, columns: any) {
    if (typeof rows === "object") {
      if (rows instanceof Sql) {
        if (rows._select) {
          this._setSelectSubqueryInsertToken(rows, columns);
        } else {
          this._setCUDSubqueryInsertToken(rows);
        }
      } else if (rows instanceof Array) {
        this._insert = this._getBulkInsertToken(rows, columns);
      } else if (Object.keys(rows).length) {
        this._insert = this._getInsertToken(rows, columns);
      } else {
        return this.error("can't pass empty table to sql.insert");
      }
    } else if (rows !== undefined) {
      this._insert = rows;
    } else {
      return this.error("can't pass nil to sql.insert");
    }
    return this;
  }
  update(row: string, columns: undefined) {
    if (typeof row === "object") {
      if (!(row instanceof Sql)) {
        this._update = this._getUpdateToken(row, columns);
      } else {
        this._update = this._getUpdateQueryToken(row, columns);
      }
    } else {
      this._update = row;
    }
    return this;
  }
  upsert(rows: any, key: any, columns: any) {
    if (!key) {
      throw new Error("you must provide key for upsert(string or table)");
    }
    if (rows instanceof Sql) {
      this._insert = this._getUpsertQueryToken(rows, key, columns);
    } else if (rows instanceof Array) {
      this._insert = this._getBulkUpsertToken(rows, key, columns);
    } else {
      this._insert = this._getUpsertToken(rows, key, columns);
    }
    return this;
  }
  isInstance(row: any) {
    return row instanceof Sql;
  }
  merge(rows: string | any[], key: string | any[], columns: any[]) {
    if (rows.length === 0) {
      return this.error("empty rows passed to merge");
    }
    [rows, columns] = this._getCteValuesLiteral(rows, columns);
    let cteName = `V(${columns.join(", ")})`;
    let cteValues = `(VALUES ${asToken(rows)})`;
    let joinCond = this._getJoinConditions(key, "V", "T");
    let valsColumns = columns.map(_prefixWithV);
    let insertSubquery = Sql.new("V")
      .select(valsColumns)
      .leftJoin("U AS T", joinCond)
      .whereNull("T." + (Array.isArray(key) ? key[0] : key));
    let updatedSubquery;
    if ((Array.isArray(key) && key.length === columns.length) || columns.length === 1) {
      updatedSubquery = Sql.new("V")
        .select(valsColumns)
        .join(this.tableName + " AS T", joinCond);
    } else {
      updatedSubquery = Sql.new(this.tableName)
        .as("T")
        .update(this._getUpdateSetToken(columns, key, "V"))
        .from("V")
        .where(joinCond)
        .returning(valsColumns);
    }
    this.with(cteName, cteValues).with("U", updatedSubquery);
    return Sql.prototype.insert.call(this, insertSubquery, columns);
  }
  updates(rows: { _returningArgs: any[]; length: number }, key: any, columns: any[]) {
    if (this.isInstance(rows)) {
      columns = columns || rows._returningArgs.flat();
      let cteName = `V(${columns.join(", ")})`;
      let joinCond = this._getJoinConditions(key, "V", this._as || this.tableName);
      this.with(cteName, rows);
      return Sql.prototype.update.call(this, this._getUpdateSetToken(columns, key, "V")).from("V").where(joinCond);
    } else if (rows.length === 0) {
      return this.error("empty rows passed to updates");
    } else {
      [rows, columns] = this._getCteValuesLiteral(rows, columns);
      let cteName = `V(${columns.join(", ")})`;
      let cteValues = `(VALUES ${asToken(rows)})`;
      let joinCond = this._getJoinConditions(key, "V", this._as || this.tableName);
      this.with(cteName, cteValues);
      return Sql.prototype.update.call(this, this._getUpdateSetToken(columns, key, "V")).from("V").where(joinCond);
    }
  }
  gets(keys: string | any[]) {
    if (keys.length === 0) {
      return this.error("empty keys passed to gets");
    }
    let columns = this._getKeys(keys[0]);
    [keys, columns] = this._getCteValuesLiteral(keys, columns);
    let joinCond = this._getJoinConditions(columns, "V", this._as || this.tableName);
    let cteName = `V(${columns.join(", ")})`;
    let cteValues = `(VALUES ${asToken(keys)})`;
    return this.with(cteName, cteValues).rightJoin("V", joinCond);
  }
  mergeGets(rows: any[], keys: any) {
    let columns = this._getKeys(rows[0]);
    [rows, columns] = this._getCteValuesLiteral(rows, columns);
    let joinCond = this._getJoinConditions(keys, "V", this._as || this.tableName);
    let cteName = `V(${columns.join(", ")})`;
    let cteValues = `(VALUES ${asToken(rows)})`;
    return Sql.prototype.select.call(this, "V.*").with(cteName, cteValues).rightJoin("V", joinCond);
  }
  copy() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
  delete(...varargs: any[]) {
    this._delete = true;
    if (varargs.length) {
      this.where(...varargs);
    }
    return this;
  }
  distinct() {
    this._distinct = true;
    return this;
  }
  select(...varargs: any[]) {
    let s = this._getSelectToken(...varargs);
    if (!this._select) {
      this._select = s;
    } else if (s !== undefined && s !== "") {
      this._select = this._select + (", " + s);
    }
    return this;
  }
  selectLiteral(...varargs: any[]) {
    let s = this._getSelectTokenLiteral(...varargs);
    if (!this._select) {
      this._select = s;
    } else if (s !== undefined && s !== "") {
      this._select = this._select + (", " + s);
    }
    return this;
  }
  returning(...varargs: any[]) {
    let s = this._getSelectToken(...varargs);
    if (!this._returning) {
      this._returning = s;
    } else if (s !== undefined && s !== "") {
      this._returning = this._returning + (", " + s);
    } else {
      return this;
    }
    if (this._returningArgs) {
      this._returningArgs = [this._returningArgs, ...varargs];
    } else {
      this._returningArgs = [...varargs];
    }
    return this;
  }
  returningLiteral(...varargs: any[]) {
    let s = this._getSelectTokenLiteral(...varargs);
    if (!this._returning) {
      this._returning = s;
    } else if (s !== undefined && s !== "") {
      this._returning = this._returning + (", " + s);
    }
    if (this._returningArgs) {
      this._returningArgs = [this._returningArgs, ...varargs];
    } else {
      this._returningArgs = [...varargs];
    }
    return this;
  }
  cteReturning(opts: any) {
    this._cteReturning = opts;
    return this;
  }
  group(...varargs: any[]) {
    if (!this._group) {
      this._group = this._getSelectToken(...varargs);
    } else {
      this._group = this._group + (", " + this._getSelectToken(...varargs));
    }
    return this;
  }
  groupBy(...varargs: any[]) {
    return this.group(...varargs);
  }
  order(...varargs: any[]) {
    if (!this._order) {
      this._order = this._getSelectToken(...varargs);
    } else {
      this._order = this._order + (", " + this._getSelectToken(...varargs));
    }
    return this;
  }
  orderBy(...varargs: any[]) {
    return this.order(...varargs);
  }
  _getArgsToken(...varargs: any[]) {
    return this._getSelectToken(...varargs);
  }
  using(...varargs: any[]) {
    this._delete = true;
    this._using = this._getArgsToken(...varargs);
    return this;
  }
  from(...varargs: string[]) {
    if (!this._from) {
      this._from = this._getArgsToken(...varargs);
    } else {
      this._from = this._from + (", " + this._getArgsToken(...varargs));
    }
    return this;
  }
  getTable() {
    return (this._as === undefined && this.tableName) || this.tableName + (" AS " + this._as);
  }
  join(...varargs: string[]) {
    let joinToken = this._getInnerJoin(...varargs);
    this._from = `${this._from || this.getTable()} ${joinToken}`;
    return this;
  }
  innerJoin(...varargs: any[]) {
    return this.join(...varargs);
  }
  leftJoin(...varargs: string[]) {
    let joinToken = this._getLeftJoin(...varargs);
    this._from = `${this._from || this.getTable()} ${joinToken}`;
    return this;
  }
  rightJoin(...varargs: string[]) {
    let joinToken = this._getRightJoin(...varargs);
    this._from = `${this._from || this.getTable()} ${joinToken}`;
    return this;
  }
  fullJoin(...varargs: any[]) {
    let joinToken = this._getFullJoin(...varargs);
    this._from = `${this._from || this.getTable()} ${joinToken}`;
    return this;
  }
  limit(n: any) {
    this._limit = n;
    return this;
  }
  offset(n: any) {
    this._offset = n;
    return this;
  }
  where(first: string, ...varargs: undefined[]) {
    let whereToken = this._getConditionToken(first, ...varargs);
    return this._handleWhereToken(whereToken, "(%s) AND (%s)");
  }
  whereOr(first: any, ...varargs: any[]) {
    let whereToken = this._getConditionTokenOr(first, ...varargs);
    return this._handleWhereToken(whereToken, "(%s) AND (%s)");
  }
  orWhereOr(first: any, ...varargs: any[]) {
    let whereToken = this._getConditionTokenOr(first, ...varargs);
    return this._handleWhereToken(whereToken, "%s OR %s");
  }
  whereNot(first: any, ...varargs: any[]) {
    let whereToken = this._getConditionTokenNot(first, ...varargs);
    return this._handleWhereToken(whereToken, "(%s) AND (%s)");
  }
  orWhere(first: any, ...varargs: any[]) {
    let whereToken = this._getConditionToken(first, ...varargs);
    return this._handleWhereToken(whereToken, "%s OR %s");
  }
  orWhereNot(first: any, ...varargs: any[]) {
    let whereToken = this._getConditionTokenNot(first, ...varargs);
    return this._handleWhereToken(whereToken, "%s OR %s");
  }
  whereExists(builder: any) {
    if (this._where) {
      this._where = `(${this._where}) AND EXISTS (${builder})`;
    } else {
      this._where = `EXISTS (${builder})`;
    }
    return this;
  }
  whereNotExists(builder: any) {
    if (this._where) {
      this._where = `(${this._where}) AND NOT EXISTS (${builder})`;
    } else {
      this._where = `NOT EXISTS (${builder})`;
    }
    return this;
  }
  whereIn(cols: any, range: any) {
    let inToken = this._getInToken(cols, range);
    if (this._where) {
      this._where = `(${this._where}) AND ${inToken}`;
    } else {
      this._where = inToken;
    }
    return this;
  }
  whereNotIn(cols: any, range: any) {
    let notInToken = this._getInToken(cols, range, "NOT IN");
    if (this._where) {
      this._where = `(${this._where}) AND ${notInToken}`;
    } else {
      this._where = notInToken;
    }
    return this;
  }
  whereNull(col: string) {
    if (this._where) {
      this._where = `(${this._where}) AND ${col} IS NULL`;
    } else {
      this._where = col + " IS NULL";
    }
    return this;
  }
  whereNotNull(col: string) {
    if (this._where) {
      this._where = `(${this._where}) AND ${col} IS NOT NULL`;
    } else {
      this._where = col + " IS NOT NULL";
    }
    return this;
  }
  whereBetween(col: any, low: any, high: any) {
    if (this._where) {
      this._where = `(${this._where}) AND (${col} BETWEEN ${low} AND ${high})`;
    } else {
      this._where = `${col} BETWEEN ${low} AND ${high}`;
    }
    return this;
  }
  whereNotBetween(col: any, low: any, high: any) {
    if (this._where) {
      this._where = `(${this._where}) AND (${col} NOT BETWEEN ${low} AND ${high})`;
    } else {
      this._where = `${col} NOT BETWEEN ${low} AND ${high}`;
    }
    return this;
  }
  whereRaw(whereToken: string) {
    if (whereToken === "") {
      return this;
    } else if (this._where) {
      this._where = `(${this._where}) AND (${whereToken})`;
    } else {
      this._where = whereToken;
    }
    return this;
  }
  orWhereExists(builder: any) {
    if (this._where) {
      this._where = `${this._where} OR EXISTS (${builder})`;
    } else {
      this._where = `EXISTS (${builder})`;
    }
    return this;
  }
  orWhereNotExists(builder: any) {
    if (this._where) {
      this._where = `${this._where} OR NOT EXISTS (${builder})`;
    } else {
      this._where = `NOT EXISTS (${builder})`;
    }
    return this;
  }
  orWhereIn(cols: any, range: any) {
    let inToken = this._getInToken(cols, range);
    if (this._where) {
      this._where = `${this._where} OR ${inToken}`;
    } else {
      this._where = inToken;
    }
    return this;
  }
  orWhereNotIn(cols: any, range: any) {
    let notInToken = this._getInToken(cols, range, "NOT IN");
    if (this._where) {
      this._where = `${this._where} OR ${notInToken}`;
    } else {
      this._where = notInToken;
    }
    return this;
  }
  orWhereNull(col: string) {
    if (this._where) {
      this._where = `${this._where} OR ${col} IS NULL`;
    } else {
      this._where = col + " IS NULL";
    }
    return this;
  }
  orWhereNotNull(col: string) {
    if (this._where) {
      this._where = `${this._where} OR ${col} IS NOT NULL`;
    } else {
      this._where = col + " IS NOT NULL";
    }
    return this;
  }
  orWhereBetween(col: any, low: any, high: any) {
    if (this._where) {
      this._where = `${this._where} OR (${col} BETWEEN ${low} AND ${high})`;
    } else {
      this._where = `${col} BETWEEN ${low} AND ${high}`;
    }
    return this;
  }
  orWhereNotBetween(col: any, low: any, high: any) {
    if (this._where) {
      this._where = `${this._where} OR (${col} NOT BETWEEN ${low} AND ${high})`;
    } else {
      this._where = `${col} NOT BETWEEN ${low} AND ${high}`;
    }
    return this;
  }
  orWhereRaw(whereToken: string) {
    if (whereToken === "") {
      return this;
    } else if (this._where) {
      this._where = `${this._where} OR ${whereToken}`;
    } else {
      this._where = whereToken;
    }
    return this;
  }
  having(...varargs: any[]) {
    if (this._having) {
      this._having = `(${this._having}) AND (${this._getConditionToken(...varargs)})`;
    } else {
      this._having = this._getConditionToken(...varargs);
    }
    return this;
  }
  havingNot(...varargs: any[]) {
    if (this._having) {
      this._having = `(${this._having}) AND (${this._getConditionTokenNot(...varargs)})`;
    } else {
      this._having = this._getConditionTokenNot(...varargs);
    }
    return this;
  }
  havingExists(builder: any) {
    if (this._having) {
      this._having = `(${this._having}) AND EXISTS (${builder})`;
    } else {
      this._having = `EXISTS (${builder})`;
    }
    return this;
  }
  havingNotExists(builder: any) {
    if (this._having) {
      this._having = `(${this._having}) AND NOT EXISTS (${builder})`;
    } else {
      this._having = `NOT EXISTS (${builder})`;
    }
    return this;
  }
  havingIn(cols: any, range: any) {
    let inToken = this._getInToken(cols, range);
    if (this._having) {
      this._having = `(${this._having}) AND ${inToken}`;
    } else {
      this._having = inToken;
    }
    return this;
  }
  havingNotIn(cols: any, range: any) {
    let notInToken = this._getInToken(cols, range, "NOT IN");
    if (this._having) {
      this._having = `(${this._having}) AND ${notInToken}`;
    } else {
      this._having = notInToken;
    }
    return this;
  }
  havingNull(col: string) {
    if (this._having) {
      this._having = `(${this._having}) AND ${col} IS NULL`;
    } else {
      this._having = col + " IS NULL";
    }
    return this;
  }
  havingNotNull(col: string) {
    if (this._having) {
      this._having = `(${this._having}) AND ${col} IS NOT NULL`;
    } else {
      this._having = col + " IS NOT NULL";
    }
    return this;
  }
  havingBetween(col: any, low: any, high: any) {
    if (this._having) {
      this._having = `(${this._having}) AND (${col} BETWEEN ${low} AND ${high})`;
    } else {
      this._having = `${col} BETWEEN ${low} AND ${high}`;
    }
    return this;
  }
  havingNotBetween(col: any, low: any, high: any) {
    if (this._having) {
      this._having = `(${this._having}) AND (${col} NOT BETWEEN ${low} AND ${high})`;
    } else {
      this._having = `${col} NOT BETWEEN ${low} AND ${high}`;
    }
    return this;
  }
  havingRaw(token: any) {
    if (this._having) {
      this._having = `(${this._having}) AND (${token})`;
    } else {
      this._having = token;
    }
    return this;
  }
  orHaving(...varargs: any[]) {
    if (this._having) {
      this._having = `${this._having} OR ${this._getConditionToken(...varargs)}`;
    } else {
      this._having = this._getConditionToken(...varargs);
    }
    return this;
  }
  orHavingNot(...varargs: any[]) {
    if (this._having) {
      this._having = `${this._having} OR ${this._getConditionTokenNot(...varargs)}`;
    } else {
      this._having = this._getConditionTokenNot(...varargs);
    }
    return this;
  }
  orHavingExists(builder: any) {
    if (this._having) {
      this._having = `${this._having} OR EXISTS (${builder})`;
    } else {
      this._having = `EXISTS (${builder})`;
    }
    return this;
  }
  orHavingNotExists(builder: any) {
    if (this._having) {
      this._having = `${this._having} OR NOT EXISTS (${builder})`;
    } else {
      this._having = `NOT EXISTS (${builder})`;
    }
    return this;
  }
  orHavingIn(cols: any, range: any) {
    let inToken = this._getInToken(cols, range);
    if (this._having) {
      this._having = `${this._having} OR ${inToken}`;
    } else {
      this._having = inToken;
    }
    return this;
  }
  orHavingNotIn(cols: any, range: any) {
    let notInToken = this._getInToken(cols, range, "NOT IN");
    if (this._having) {
      this._having = `${this._having} OR ${notInToken}`;
    } else {
      this._having = notInToken;
    }
    return this;
  }
  orHavingNull(col: string) {
    if (this._having) {
      this._having = `${this._having} OR ${col} IS NULL`;
    } else {
      this._having = col + " IS NULL";
    }
    return this;
  }
  orHavingNotNull(col: string) {
    if (this._having) {
      this._having = `${this._having} OR ${col} IS NOT NULL`;
    } else {
      this._having = col + " IS NOT NULL";
    }
    return this;
  }
  orHavingBetween(col: any, low: any, high: any) {
    if (this._having) {
      this._having = `${this._having} OR (${col} BETWEEN ${low} AND ${high})`;
    } else {
      this._having = `${col} BETWEEN ${low} AND ${high}`;
    }
    return this;
  }
  orHavingNotBetween(col: any, low: any, high: any) {
    if (this._having) {
      this._having = `${this._having} OR (${col} NOT BETWEEN ${low} AND ${high})`;
    } else {
      this._having = `${col} NOT BETWEEN ${low} AND ${high}`;
    }
    return this;
  }
  orHavingRaw(token: any) {
    if (this._having) {
      this._having = `${this._having} OR ${token}`;
    } else {
      this._having = token;
    }
    return this;
  }
}

export default Sql;
