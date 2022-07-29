[@xiangnanscu/sql](../README.md) / [Exports](../modules.md) / Sql

# Class: Sql

## Table of contents

### Constructors

- [constructor](Sql.md#constructor)

### Properties

- [\_as](Sql.md#_as)
- [\_cteReturning](Sql.md#_ctereturning)
- [\_delete](Sql.md#_delete)
- [\_distinct](Sql.md#_distinct)
- [\_except](Sql.md#_except)
- [\_exceptAll](Sql.md#_exceptall)
- [\_from](Sql.md#_from)
- [\_group](Sql.md#_group)
- [\_having](Sql.md#_having)
- [\_insert](Sql.md#_insert)
- [\_intersect](Sql.md#_intersect)
- [\_intersectAll](Sql.md#_intersectall)
- [\_join](Sql.md#_join)
- [\_limit](Sql.md#_limit)
- [\_offset](Sql.md#_offset)
- [\_order](Sql.md#_order)
- [\_returning](Sql.md#_returning)
- [\_returningArgs](Sql.md#_returningargs)
- [\_select](Sql.md#_select)
- [\_union](Sql.md#_union)
- [\_unionAll](Sql.md#_unionall)
- [\_update](Sql.md#_update)
- [\_using](Sql.md#_using)
- [\_where](Sql.md#_where)
- [\_with](Sql.md#_with)
- [tableName](Sql.md#tablename)
- [DEFAULT](Sql.md#default)
- [NULL](Sql.md#null)
- [asLiteral](Sql.md#asliteral)
- [asToken](Sql.md#astoken)
- [r](Sql.md#r)

### Methods

- [\_getArgsToken](Sql.md#_getargstoken)
- [\_getBulkInsertToken](Sql.md#_getbulkinserttoken)
- [\_getBulkInsertValuesToken](Sql.md#_getbulkinsertvaluestoken)
- [\_getBulkUpsertToken](Sql.md#_getbulkupserttoken)
- [\_getConditionToken](Sql.md#_getconditiontoken)
- [\_getConditionTokenFromTable](Sql.md#_getconditiontokenfromtable)
- [\_getConditionTokenNot](Sql.md#_getconditiontokennot)
- [\_getConditionTokenOr](Sql.md#_getconditiontokenor)
- [\_getCteValuesLiteral](Sql.md#_getctevaluesliteral)
- [\_getFullJoin](Sql.md#_getfulljoin)
- [\_getInToken](Sql.md#_getintoken)
- [\_getInnerJoin](Sql.md#_getinnerjoin)
- [\_getInsertToken](Sql.md#_getinserttoken)
- [\_getInsertValuesToken](Sql.md#_getinsertvaluestoken)
- [\_getJoinConditions](Sql.md#_getjoinconditions)
- [\_getJoinExpr](Sql.md#_getjoinexpr)
- [\_getJoinToken](Sql.md#_getjointoken)
- [\_getKeys](Sql.md#_getkeys)
- [\_getLeftJoin](Sql.md#_getleftjoin)
- [\_getRightJoin](Sql.md#_getrightjoin)
- [\_getSelectToken](Sql.md#_getselecttoken)
- [\_getSelectTokenLiteral](Sql.md#_getselecttokenliteral)
- [\_getUpdateQueryToken](Sql.md#_getupdatequerytoken)
- [\_getUpdateSetToken](Sql.md#_getupdatesettoken)
- [\_getUpdateToken](Sql.md#_getupdatetoken)
- [\_getUpsertQueryToken](Sql.md#_getupsertquerytoken)
- [\_getUpsertToken](Sql.md#_getupserttoken)
- [\_getWithToken](Sql.md#_getwithtoken)
- [\_handleSetOption](Sql.md#_handlesetoption)
- [\_handleWhereToken](Sql.md#_handlewheretoken)
- [\_rowsToArray](Sql.md#_rowstoarray)
- [\_setCUDSubqueryInsertToken](Sql.md#_setcudsubqueryinserttoken)
- [\_setSelectSubqueryInsertToken](Sql.md#_setselectsubqueryinserttoken)
- [\_statementForSet](Sql.md#_statementforset)
- [as](Sql.md#as)
- [copy](Sql.md#copy)
- [cteReturning](Sql.md#ctereturning)
- [delete](Sql.md#delete)
- [distinct](Sql.md#distinct)
- [error](Sql.md#error)
- [except](Sql.md#except)
- [exceptAll](Sql.md#exceptall)
- [from](Sql.md#from)
- [fullJoin](Sql.md#fulljoin)
- [getTable](Sql.md#gettable)
- [gets](Sql.md#gets)
- [group](Sql.md#group)
- [groupBy](Sql.md#groupby)
- [having](Sql.md#having)
- [havingBetween](Sql.md#havingbetween)
- [havingExists](Sql.md#havingexists)
- [havingIn](Sql.md#havingin)
- [havingNot](Sql.md#havingnot)
- [havingNotBetween](Sql.md#havingnotbetween)
- [havingNotExists](Sql.md#havingnotexists)
- [havingNotIn](Sql.md#havingnotin)
- [havingNotNull](Sql.md#havingnotnull)
- [havingNull](Sql.md#havingnull)
- [havingRaw](Sql.md#havingraw)
- [innerJoin](Sql.md#innerjoin)
- [insert](Sql.md#insert)
- [intersect](Sql.md#intersect)
- [intersectAll](Sql.md#intersectall)
- [isInstance](Sql.md#isinstance)
- [join](Sql.md#join)
- [leftJoin](Sql.md#leftjoin)
- [limit](Sql.md#limit)
- [merge](Sql.md#merge)
- [mergeGets](Sql.md#mergegets)
- [offset](Sql.md#offset)
- [orHaving](Sql.md#orhaving)
- [orHavingBetween](Sql.md#orhavingbetween)
- [orHavingExists](Sql.md#orhavingexists)
- [orHavingIn](Sql.md#orhavingin)
- [orHavingNot](Sql.md#orhavingnot)
- [orHavingNotBetween](Sql.md#orhavingnotbetween)
- [orHavingNotExists](Sql.md#orhavingnotexists)
- [orHavingNotIn](Sql.md#orhavingnotin)
- [orHavingNotNull](Sql.md#orhavingnotnull)
- [orHavingNull](Sql.md#orhavingnull)
- [orHavingRaw](Sql.md#orhavingraw)
- [orWhere](Sql.md#orwhere)
- [orWhereBetween](Sql.md#orwherebetween)
- [orWhereExists](Sql.md#orwhereexists)
- [orWhereIn](Sql.md#orwherein)
- [orWhereNot](Sql.md#orwherenot)
- [orWhereNotBetween](Sql.md#orwherenotbetween)
- [orWhereNotExists](Sql.md#orwherenotexists)
- [orWhereNotIn](Sql.md#orwherenotin)
- [orWhereNotNull](Sql.md#orwherenotnull)
- [orWhereNull](Sql.md#orwherenull)
- [orWhereOr](Sql.md#orwhereor)
- [orWhereRaw](Sql.md#orwhereraw)
- [order](Sql.md#order)
- [orderBy](Sql.md#orderby)
- [returning](Sql.md#returning)
- [returningLiteral](Sql.md#returningliteral)
- [rightJoin](Sql.md#rightjoin)
- [select](Sql.md#select)
- [selectLiteral](Sql.md#selectliteral)
- [statement](Sql.md#statement)
- [toString](Sql.md#tostring)
- [union](Sql.md#union)
- [unionAll](Sql.md#unionall)
- [update](Sql.md#update)
- [updates](Sql.md#updates)
- [upsert](Sql.md#upsert)
- [using](Sql.md#using)
- [where](Sql.md#where)
- [whereBetween](Sql.md#wherebetween)
- [whereExists](Sql.md#whereexists)
- [whereIn](Sql.md#wherein)
- [whereNot](Sql.md#wherenot)
- [whereNotBetween](Sql.md#wherenotbetween)
- [whereNotExists](Sql.md#wherenotexists)
- [whereNotIn](Sql.md#wherenotin)
- [whereNotNull](Sql.md#wherenotnull)
- [whereNull](Sql.md#wherenull)
- [whereOr](Sql.md#whereor)
- [whereRaw](Sql.md#whereraw)
- [with](Sql.md#with)
- [withValues](Sql.md#withvalues)
- [new](Sql.md#new)

## Constructors

### constructor

• **new Sql**(`tableName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableName` | `string` |

#### Defined in

[sql.ts:193](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L193)

## Properties

### \_as

• `Optional` **\_as**: `string`

#### Defined in

[sql.ts:168](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L168)

___

### \_cteReturning

• `Optional` **\_cteReturning**: `CteReturningOpts`

#### Defined in

[sql.ts:173](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L173)

___

### \_delete

• `Optional` **\_delete**: `boolean`

#### Defined in

[sql.ts:177](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L177)

___

### \_distinct

• `Optional` **\_distinct**: `boolean`

#### Defined in

[sql.ts:171](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L171)

___

### \_except

• `Optional` **\_except**: `string` \| [`Sql`](Sql.md)

#### Defined in

[sql.ts:189](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L189)

___

### \_exceptAll

• `Optional` **\_exceptAll**: `string` \| [`Sql`](Sql.md)

#### Defined in

[sql.ts:190](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L190)

___

### \_from

• `Optional` **\_from**: `string`

#### Defined in

[sql.ts:180](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L180)

___

### \_group

• `Optional` **\_group**: `string`

#### Defined in

[sql.ts:182](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L182)

___

### \_having

• `Optional` **\_having**: `string`

#### Defined in

[sql.ts:183](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L183)

___

### \_insert

• `Optional` **\_insert**: `string`

#### Defined in

[sql.ts:175](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L175)

___

### \_intersect

• `Optional` **\_intersect**: `string` \| [`Sql`](Sql.md)

#### Defined in

[sql.ts:191](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L191)

___

### \_intersectAll

• `Optional` **\_intersectAll**: `string` \| [`Sql`](Sql.md)

#### Defined in

[sql.ts:192](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L192)

___

### \_join

• `Optional` **\_join**: `string`

#### Defined in

[sql.ts:170](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L170)

___

### \_limit

• `Optional` **\_limit**: `number`

#### Defined in

[sql.ts:185](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L185)

___

### \_offset

• `Optional` **\_offset**: `number`

#### Defined in

[sql.ts:186](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L186)

___

### \_order

• `Optional` **\_order**: `string`

#### Defined in

[sql.ts:184](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L184)

___

### \_returning

• `Optional` **\_returning**: `string`

#### Defined in

[sql.ts:172](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L172)

___

### \_returningArgs

• `Optional` **\_returningArgs**: `DBValue`[]

#### Defined in

[sql.ts:174](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L174)

___

### \_select

• `Optional` **\_select**: `string`

#### Defined in

[sql.ts:179](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L179)

___

### \_union

• `Optional` **\_union**: `string` \| [`Sql`](Sql.md)

#### Defined in

[sql.ts:187](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L187)

___

### \_unionAll

• `Optional` **\_unionAll**: `string` \| [`Sql`](Sql.md)

#### Defined in

[sql.ts:188](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L188)

___

### \_update

• `Optional` **\_update**: `string`

#### Defined in

[sql.ts:176](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L176)

___

### \_using

• `Optional` **\_using**: `string`

#### Defined in

[sql.ts:178](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L178)

___

### \_where

• `Optional` **\_where**: `string`

#### Defined in

[sql.ts:181](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L181)

___

### \_with

• `Optional` **\_with**: `string`

#### Defined in

[sql.ts:169](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L169)

___

### tableName

• **tableName**: `string`

#### Defined in

[sql.ts:167](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L167)

___

### DEFAULT

▪ `Static` **DEFAULT**: () => `string` = `DEFAULT`

#### Type declaration

▸ (): `string`

##### Returns

`string`

#### Defined in

[sql.ts:160](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L160)

___

### NULL

▪ `Static` **NULL**: () => `string` = `NULL`

#### Type declaration

▸ (): `string`

##### Returns

`string`

#### Defined in

[sql.ts:161](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L161)

___

### asLiteral

▪ `Static` **asLiteral**: `SqlSerializer` = `asLiteral`

#### Defined in

[sql.ts:163](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L163)

___

### asToken

▪ `Static` **asToken**: `SqlSerializer` = `asToken`

#### Defined in

[sql.ts:162](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L162)

___

### r

▪ `Static` **r**: (`s`: `string`) => () => `string` = `makeRawToken`

#### Type declaration

▸ (`s`): () => `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

##### Returns

`fn`

▸ (): `string`

##### Returns

`string`

#### Defined in

[sql.ts:159](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L159)

## Methods

### \_getArgsToken

▸ **_getArgsToken**(`first`, `second?`, ...`varargs`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `string` |
| `second?` | `string` |
| `...varargs` | `string`[] |

#### Returns

`string`

#### Defined in

[sql.ts:837](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L837)

___

### \_getBulkInsertToken

▸ **_getBulkInsertToken**(`rows`, `columns?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | `Row`[] |
| `columns?` | `string`[] |

#### Returns

`string`

#### Defined in

[sql.ts:355](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L355)

___

### \_getBulkInsertValuesToken

▸ **_getBulkInsertValuesToken**(`rows`, `columns?`, `fallback?`): [`string`[], `string`[]]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `rows` | `Row`[] | `undefined` |
| `columns?` | `string`[] | `undefined` |
| `fallback` | () => `string` | `DEFAULT` |

#### Returns

[`string`[], `string`[]]

#### Defined in

[sql.ts:266](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L266)

___

### \_getBulkUpsertToken

▸ **_getBulkUpsertToken**(`rows`, `key`, `columns`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | `Row`[] |
| `key` | `string` \| `string`[] |
| `columns` | `string`[] |

#### Returns

`string`

#### Defined in

[sql.ts:391](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L391)

___

### \_getConditionToken

▸ **_getConditionToken**(`first`, `second?`, `third?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `Condition` |
| `second?` | `DBValue` |
| `third?` | `DBValue` |

#### Returns

`string`

#### Defined in

[sql.ts:490](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L490)

___

### \_getConditionTokenFromTable

▸ **_getConditionTokenFromTable**(`kwargs`, `logic?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `kwargs` | `ConditionTable` |
| `logic?` | `string` |

#### Returns

`string`

#### Defined in

[sql.ts:479](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L479)

___

### \_getConditionTokenNot

▸ **_getConditionTokenNot**(`first`, `second?`, `third?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `Condition` |
| `second?` | `DBValue` |
| `third?` | `DBValue` |

#### Returns

`string`

#### Defined in

[sql.ts:534](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L534)

___

### \_getConditionTokenOr

▸ **_getConditionTokenOr**(`first`, `second?`, `third?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `Condition` |
| `second?` | `DBValue` |
| `third?` | `DBValue` |

#### Returns

`string`

#### Defined in

[sql.ts:527](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L527)

___

### \_getCteValuesLiteral

▸ **_getCteValuesLiteral**(`rows`, `columns?`): [`string`[], `string`[]]

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | `Row`[] |
| `columns?` | `string`[] |

#### Returns

[`string`[], `string`[]]

#### Defined in

[sql.ts:466](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L466)

___

### \_getFullJoin

▸ **_getFullJoin**(`rightTable`, `conditions?`, ...`varargs`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rightTable` | `string` |
| `conditions?` | `string` |
| `...varargs` | `string`[] |

#### Returns

`string`

#### Defined in

[sql.ts:438](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L438)

___

### \_getInToken

▸ **_getInToken**(`cols`, `range`, `operator?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `cols` | `string` \| `string`[] | `undefined` |
| `range` | `string` \| [`Sql`](Sql.md) \| `DBValue`[] | `undefined` |
| `operator` | `string` | `"IN"` |

#### Returns

`string`

#### Defined in

[sql.ts:441](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L441)

___

### \_getInnerJoin

▸ **_getInnerJoin**(`rightTable`, `conditions?`, ...`varargs`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rightTable` | `string` |
| `conditions?` | `string` |
| `...varargs` | `string`[] |

#### Returns

`string`

#### Defined in

[sql.ts:429](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L429)

___

### \_getInsertToken

▸ **_getInsertToken**(`row`, `columns?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `Row` |
| `columns?` | `string`[] |

#### Returns

`string`

#### Defined in

[sql.ts:351](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L351)

___

### \_getInsertValuesToken

▸ **_getInsertValuesToken**(`row`, `columns?`): [`string`, `string`[]]

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `Row` |
| `columns?` | `string`[] |

#### Returns

[`string`, `string`[]]

#### Defined in

[sql.ts:246](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L246)

___

### \_getJoinConditions

▸ **_getJoinConditions**(`key`, `leftTable`, `rightTable`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `string`[] |
| `leftTable` | `string` |
| `rightTable` | `string` |

#### Returns

`string`

#### Defined in

[sql.ts:456](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L456)

___

### \_getJoinExpr

▸ **_getJoinExpr**(`a`, `b?`, `c?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `string` |
| `b?` | `DBValue` |
| `c?` | `DBValue` |

#### Returns

`string`

#### Defined in

[sql.ts:411](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L411)

___

### \_getJoinToken

▸ **_getJoinToken**(`joinType`, `rightTable`, `conditions?`, ...`varargs`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `joinType` | `string` |
| `rightTable` | `string` |
| `conditions?` | `string` |
| `...varargs` | `string`[] |

#### Returns

`string`

#### Defined in

[sql.ts:422](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L422)

___

### \_getKeys

▸ **_getKeys**(`rows`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | `Row` \| `Row`[] |

#### Returns

`string`[]

#### Defined in

[sql.ts:208](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L208)

___

### \_getLeftJoin

▸ **_getLeftJoin**(`rightTable`, `conditions?`, ...`varargs`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rightTable` | `string` |
| `conditions?` | `string` |
| `...varargs` | `string`[] |

#### Returns

`string`

#### Defined in

[sql.ts:432](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L432)

___

### \_getRightJoin

▸ **_getRightJoin**(`rightTable`, `conditions?`, ...`varargs`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rightTable` | `string` |
| `conditions?` | `string` |
| `...varargs` | `string`[] |

#### Returns

`string`

#### Defined in

[sql.ts:435](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L435)

___

### \_getSelectToken

▸ **_getSelectToken**(`a`, `b?`, ...`varargs`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `DBValue` |
| `b?` | `DBValue` |
| `...varargs` | `DBValue`[] |

#### Returns

`string`

#### Defined in

[sql.ts:291](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L291)

___

### \_getSelectTokenLiteral

▸ **_getSelectTokenLiteral**(`first`, `second`, ...`varargs`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `DBValue` |
| `second` | `DBValue` |
| `...varargs` | `DBValue`[] |

#### Returns

`string`

#### Defined in

[sql.ts:304](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L304)

___

### \_getUpdateQueryToken

▸ **_getUpdateQueryToken**(`subSelect`, `columns?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subSelect` | [`Sql`](Sql.md) |
| `columns?` | `DBValue`[] |

#### Returns

`string`

#### Defined in

[sql.ts:453](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L453)

___

### \_getUpdateSetToken

▸ **_getUpdateSetToken**(`columns`, `key`, `tableName`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `columns` | `string`[] |
| `key` | `string` \| `string`[] |
| `tableName` | `string` |

#### Returns

`string`

#### Defined in

[sql.ts:270](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L270)

___

### \_getUpdateToken

▸ **_getUpdateToken**(`row`, `columns?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `Row` |
| `columns?` | `string`[] |

#### Returns

`string`

#### Defined in

[sql.ts:328](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L328)

___

### \_getUpsertQueryToken

▸ **_getUpsertQueryToken**(`rows`, `key`, `columns`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | [`Sql`](Sql.md) |
| `key` | `string` \| `string`[] |
| `columns` | `string`[] |

#### Returns

`string`

#### Defined in

[sql.ts:402](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L402)

___

### \_getUpsertToken

▸ **_getUpsertToken**(`row`, `key`, `columns`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `Row` |
| `key` | `string` \| `string`[] |
| `columns` | `string`[] |

#### Returns

`string`

#### Defined in

[sql.ts:382](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L382)

___

### \_getWithToken

▸ **_getWithToken**(`name`, `token?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `token?` | `SqlValue` |

#### Returns

`string`

#### Defined in

[sql.ts:342](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L342)

___

### \_handleSetOption

▸ **_handleSetOption**(`otherSql`, `innerAttr`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `otherSql` | [`Sql`](Sql.md) |
| `innerAttr` | `InnerSetProperty` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:543](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L543)

___

### \_handleWhereToken

▸ **_handleWhereToken**(`whereToken`, `tpl`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `whereToken` | `undefined` \| `string` |
| `tpl` | `string` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:469](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L469)

___

### \_rowsToArray

▸ **_rowsToArray**(`rows`, `columns`, `fallback?`): `DBValue`[][]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `rows` | `Row`[] | `undefined` |
| `columns` | `string`[] | `undefined` |
| `fallback` | () => `string` | `DEFAULT` |

#### Returns

`DBValue`[][]

#### Defined in

[sql.ts:227](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L227)

___

### \_setCUDSubqueryInsertToken

▸ **_setCUDSubqueryInsertToken**(`subQuery`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subQuery` | [`Sql`](Sql.md) |

#### Returns

`void`

#### Defined in

[sql.ts:367](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L367)

___

### \_setSelectSubqueryInsertToken

▸ **_setSelectSubqueryInsertToken**(`subQuery`, `columns?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subQuery` | [`Sql`](Sql.md) |
| `columns?` | `string`[] |

#### Returns

`void`

#### Defined in

[sql.ts:359](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L359)

___

### \_statementForSet

▸ **_statementForSet**(): `string`

#### Returns

`string`

#### Defined in

[sql.ts:552](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L552)

___

### as

▸ **as**(`tableAlias`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableAlias` | `string` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:620](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L620)

___

### copy

▸ **copy**(): [`Sql`](Sql.md)

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:749](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L749)

___

### cteReturning

▸ **cteReturning**(`opts`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `CteReturningOpts` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:811](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L811)

___

### delete

▸ **delete**(`first`, `second?`, `third?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `Condition` |
| `second?` | `DBValue` |
| `third?` | `DBValue` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:752](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L752)

___

### distinct

▸ **distinct**(): [`Sql`](Sql.md)

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:759](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L759)

___

### error

▸ **error**(`errMsg`): `never`

#### Parameters

| Name | Type |
| :------ | :------ |
| `errMsg` | `string` \| `object` \| `Error` |

#### Returns

`never`

#### Defined in

[sql.ts:199](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L199)

___

### except

▸ **except**(`otherSql`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `otherSql` | [`Sql`](Sql.md) |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:608](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L608)

___

### exceptAll

▸ **exceptAll**(`otherSql`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `otherSql` | [`Sql`](Sql.md) |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:611](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L611)

___

### from

▸ **from**(`first`, `second?`, ...`varargs`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `string` |
| `second?` | `string` |
| `...varargs` | `string`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:845](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L845)

___

### fullJoin

▸ **fullJoin**(`rightTable`, `conditions?`, ...`varargs`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rightTable` | `string` |
| `conditions?` | `string` |
| `...varargs` | `string`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:874](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L874)

___

### getTable

▸ **getTable**(): `string`

#### Returns

`string`

#### Defined in

[sql.ts:853](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L853)

___

### gets

▸ **gets**(`keys`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `Row`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:730](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L730)

___

### group

▸ **group**(`first`, `second?`, ...`varargs`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `string` |
| `second?` | `string` |
| `...varargs` | `string`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:815](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L815)

___

### groupBy

▸ **groupBy**(`first`, `second?`, ...`varargs`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `string` |
| `second?` | `string` |
| `...varargs` | `string`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:823](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L823)

___

### having

▸ **having**(`first`, `second?`, `third?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `Condition` |
| `second?` | `DBValue` |
| `third?` | `DBValue` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1063](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1063)

___

### havingBetween

▸ **havingBetween**(`col`, `low`, `high`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `string` |
| `low` | `number` |
| `high` | `number` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1129](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1129)

___

### havingExists

▸ **havingExists**(`builder`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `builder` | [`Sql`](Sql.md) |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1079](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1079)

___

### havingIn

▸ **havingIn**(`cols`, `range`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cols` | `string` \| `string`[] |
| `range` | `string` \| [`Sql`](Sql.md) \| `DBValue`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1095](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1095)

___

### havingNot

▸ **havingNot**(`first`, `second?`, `third?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `Condition` |
| `second?` | `DBValue` |
| `third?` | `DBValue` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1071](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1071)

___

### havingNotBetween

▸ **havingNotBetween**(`col`, `low`, `high`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `string` |
| `low` | `number` |
| `high` | `number` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1137](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1137)

___

### havingNotExists

▸ **havingNotExists**(`builder`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `builder` | [`Sql`](Sql.md) |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1087](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1087)

___

### havingNotIn

▸ **havingNotIn**(`cols`, `range`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cols` | `string` \| `string`[] |
| `range` | `string` \| [`Sql`](Sql.md) \| `DBValue`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1104](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1104)

___

### havingNotNull

▸ **havingNotNull**(`col`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `string` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1121](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1121)

___

### havingNull

▸ **havingNull**(`col`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `string` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1113](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1113)

___

### havingRaw

▸ **havingRaw**(`token`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1145](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1145)

___

### innerJoin

▸ **innerJoin**(`rightTable`, `conditions?`, ...`varargs`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rightTable` | `string` |
| `conditions?` | `string` |
| `...varargs` | `string`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:861](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L861)

___

### insert

▸ **insert**(`rows`, `columns?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | `Row` \| [`Sql`](Sql.md) \| `Row`[] |
| `columns?` | `string`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:631](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L631)

___

### intersect

▸ **intersect**(`otherSql`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `otherSql` | [`Sql`](Sql.md) |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:614](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L614)

___

### intersectAll

▸ **intersectAll**(`otherSql`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `otherSql` | [`Sql`](Sql.md) |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:617](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L617)

___

### isInstance

▸ **isInstance**(`row`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `any` |

#### Returns

`boolean`

#### Defined in

[sql.ts:670](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L670)

___

### join

▸ **join**(`rightTable`, `conditions?`, ...`varargs`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rightTable` | `string` |
| `conditions?` | `string` |
| `...varargs` | `string`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:856](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L856)

___

### leftJoin

▸ **leftJoin**(`rightTable`, `conditions?`, ...`varargs`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rightTable` | `string` |
| `conditions?` | `string` |
| `...varargs` | `string`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:864](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L864)

___

### limit

▸ **limit**(`n`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:879](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L879)

___

### merge

▸ **merge**(`rows`, `key`, `columns?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | `Row`[] |
| `key` | `string` \| `string`[] |
| `columns?` | `string`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:673](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L673)

___

### mergeGets

▸ **mergeGets**(`rows`, `keys`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | `Row`[] |
| `keys` | `string` \| `string`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:741](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L741)

___

### offset

▸ **offset**(`n`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:883](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L883)

___

### orHaving

▸ **orHaving**(`first`, `second?`, `third?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `Condition` |
| `second?` | `DBValue` |
| `third?` | `DBValue` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1153](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1153)

___

### orHavingBetween

▸ **orHavingBetween**(`col`, `low`, `high`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `string` |
| `low` | `number` |
| `high` | `number` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1219](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1219)

___

### orHavingExists

▸ **orHavingExists**(`builder`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `builder` | [`Sql`](Sql.md) |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1169](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1169)

___

### orHavingIn

▸ **orHavingIn**(`cols`, `range`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cols` | `string` \| `string`[] |
| `range` | `string` \| [`Sql`](Sql.md) \| `DBValue`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1185](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1185)

___

### orHavingNot

▸ **orHavingNot**(`first`, `second?`, `third?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `Condition` |
| `second?` | `DBValue` |
| `third?` | `DBValue` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1161](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1161)

___

### orHavingNotBetween

▸ **orHavingNotBetween**(`col`, `low`, `high`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `string` |
| `low` | `number` |
| `high` | `number` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1227](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1227)

___

### orHavingNotExists

▸ **orHavingNotExists**(`builder`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `builder` | [`Sql`](Sql.md) |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1177](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1177)

___

### orHavingNotIn

▸ **orHavingNotIn**(`cols`, `range`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cols` | `string` \| `string`[] |
| `range` | `string` \| [`Sql`](Sql.md) \| `DBValue`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1194](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1194)

___

### orHavingNotNull

▸ **orHavingNotNull**(`col`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `string` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1211](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1211)

___

### orHavingNull

▸ **orHavingNull**(`col`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `string` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1203](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1203)

___

### orHavingRaw

▸ **orHavingRaw**(`token`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1235](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1235)

___

### orWhere

▸ **orWhere**(`first`, `second?`, `third?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `Condition` |
| `second?` | `DBValue` |
| `third?` | `DBValue` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:903](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L903)

___

### orWhereBetween

▸ **orWhereBetween**(`col`, `low`, `high`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `string` |
| `low` | `number` |
| `high` | `number` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1037](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1037)

___

### orWhereExists

▸ **orWhereExists**(`builder`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `builder` | [`Sql`](Sql.md) |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:987](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L987)

___

### orWhereIn

▸ **orWhereIn**(`cols`, `range`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cols` | `string` \| `string`[] |
| `range` | `string` \| [`Sql`](Sql.md) \| `DBValue`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1003](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1003)

___

### orWhereNot

▸ **orWhereNot**(`first`, `second?`, `third?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `Condition` |
| `second?` | `DBValue` |
| `third?` | `DBValue` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:907](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L907)

___

### orWhereNotBetween

▸ **orWhereNotBetween**(`col`, `low`, `high`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `string` |
| `low` | `number` |
| `high` | `number` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1045](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1045)

___

### orWhereNotExists

▸ **orWhereNotExists**(`builder`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `builder` | [`Sql`](Sql.md) |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:995](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L995)

___

### orWhereNotIn

▸ **orWhereNotIn**(`cols`, `range`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cols` | `string` \| `string`[] |
| `range` | `string` \| [`Sql`](Sql.md) \| `DBValue`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1012](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1012)

___

### orWhereNotNull

▸ **orWhereNotNull**(`col`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `string` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1029](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1029)

___

### orWhereNull

▸ **orWhereNull**(`col`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `string` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1021](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1021)

___

### orWhereOr

▸ **orWhereOr**(`first`, `second?`, `third?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `Condition` |
| `second?` | `DBValue` |
| `third?` | `DBValue` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:895](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L895)

___

### orWhereRaw

▸ **orWhereRaw**(`whereToken`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `whereToken` | `string` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:1053](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L1053)

___

### order

▸ **order**(`first`, `second?`, ...`varargs`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `string` |
| `second?` | `string` |
| `...varargs` | `string`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:826](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L826)

___

### orderBy

▸ **orderBy**(`first`, `second?`, ...`varargs`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `string` |
| `second?` | `string` |
| `...varargs` | `string`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:834](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L834)

___

### returning

▸ **returning**(`first`, `second?`, ...`varargs`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `DBValue` |
| `second?` | `DBValue` |
| `...varargs` | `DBValue`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:781](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L781)

___

### returningLiteral

▸ **returningLiteral**(`first`, `second`, ...`varargs`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `DBValue` |
| `second` | `DBValue` |
| `...varargs` | `DBValue`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:797](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L797)

___

### rightJoin

▸ **rightJoin**(`rightTable`, `conditions?`, ...`varargs`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rightTable` | `string` |
| `conditions?` | `string` |
| `...varargs` | `string`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:869](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L869)

___

### select

▸ **select**(`first`, `second?`, ...`varargs`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `DBValue` |
| `second?` | `DBValue` |
| `...varargs` | `DBValue`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:763](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L763)

___

### selectLiteral

▸ **selectLiteral**(`first`, `second?`, ...`varargs`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `DBValue` |
| `second?` | `DBValue` |
| `...varargs` | `DBValue`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:772](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L772)

___

### statement

▸ **statement**(): `string`

#### Returns

`string`

#### Defined in

[sql.ts:569](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L569)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[sql.ts:196](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L196)

___

### union

▸ **union**(`otherSql`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `otherSql` | [`Sql`](Sql.md) |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:602](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L602)

___

### unionAll

▸ **unionAll**(`otherSql`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `otherSql` | [`Sql`](Sql.md) |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:605](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L605)

___

### update

▸ **update**(`row`, `columns?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `string` \| `Row` \| [`Sql`](Sql.md) |
| `columns?` | `string`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:647](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L647)

___

### updates

▸ **updates**(`rows`, `key`, `columns?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | [`Sql`](Sql.md) \| `Row`[] |
| `key` | `string` \| `string`[] |
| `columns?` | `string`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:702](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L702)

___

### upsert

▸ **upsert**(`rows`, `key`, `columns?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | `Row` \| [`Sql`](Sql.md) \| `Row`[] |
| `key` | `string` \| `string`[] |
| `columns?` | `any` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:657](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L657)

___

### using

▸ **using**(`first`, `second?`, ...`varargs`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `string` |
| `second?` | `string` |
| `...varargs` | `string`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:840](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L840)

___

### where

▸ **where**(`first`, `second?`, `third?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `Condition` |
| `second?` | `DBValue` |
| `third?` | `DBValue` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:887](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L887)

___

### whereBetween

▸ **whereBetween**(`col`, `low`, `high`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `string` |
| `low` | `number` |
| `high` | `number` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:961](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L961)

___

### whereExists

▸ **whereExists**(`builder`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `builder` | [`Sql`](Sql.md) |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:911](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L911)

___

### whereIn

▸ **whereIn**(`cols`, `range`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cols` | `string` \| `string`[] |
| `range` | `string` \| [`Sql`](Sql.md) \| `DBValue`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:927](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L927)

___

### whereNot

▸ **whereNot**(`first`, `second?`, `third?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `Condition` |
| `second?` | `DBValue` |
| `third?` | `DBValue` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:899](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L899)

___

### whereNotBetween

▸ **whereNotBetween**(`col`, `low`, `high`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `string` |
| `low` | `number` |
| `high` | `number` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:969](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L969)

___

### whereNotExists

▸ **whereNotExists**(`builder`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `builder` | [`Sql`](Sql.md) |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:919](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L919)

___

### whereNotIn

▸ **whereNotIn**(`cols`, `range`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cols` | `string` \| `string`[] |
| `range` | `string` \| [`Sql`](Sql.md) \| `DBValue`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:936](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L936)

___

### whereNotNull

▸ **whereNotNull**(`col`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `string` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:953](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L953)

___

### whereNull

▸ **whereNull**(`col`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `string` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:945](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L945)

___

### whereOr

▸ **whereOr**(`first`, `second?`, `third?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `first` | `Condition` |
| `second?` | `DBValue` |
| `third?` | `DBValue` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:891](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L891)

___

### whereRaw

▸ **whereRaw**(`whereToken`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `whereToken` | `string` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:977](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L977)

___

### with

▸ **with**(`name`, `token?`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `token?` | `SqlValue` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:593](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L593)

___

### withValues

▸ **withValues**(`name`, `rows`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `rows` | `Row`[] |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:624](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L624)

___

### new

▸ `Static` **new**(`tableName`): [`Sql`](Sql.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableName` | `string` |

#### Returns

[`Sql`](Sql.md)

#### Defined in

[sql.ts:164](https://github.com/xiangnanscu/sql/blob/15f4027/src/sql.ts#L164)
