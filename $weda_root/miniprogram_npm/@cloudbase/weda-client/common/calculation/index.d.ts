/**
 * 绝对值
 *
 * @remarks
 * 计算传入数字的绝对值
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "绝对值", "insertText": "ABS(1)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "计算传入数字的绝对值" , "definition": "ABS(数字):数字"}
 */
export declare function ABS(num: number): number;
/**
 * 最小值
 *
 * @remarks
 * 返回一组数字中的最小值
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "最小值", "insertText": "Min(1, 2)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回一组数字中的最小值" , "definition": "Min(数字1, [数字2, ...]):数字"}
 */
export declare function Min(...args: number[]): number;
/**
 * 最大值
 *
 * @remarks
 * 返回一组数字中的最大值
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "最大值", "insertText": "Max(1, 2)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回一组数字中的最大值" , "definition": "Max(数字1, [数字2, ...]):数字"}
 */
export declare function Max(...args: number[]): number;
/**
 * 平均值
 *
 * @remarks
 * 返回一组数字中的平均值
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "平均值", "insertText": "Average(1, 2)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回一组数字中的平均值" , "definition": "Average(数字1, [数字2, ...]):数字"}
 */
export declare function Average(...args: number[]): number;
/**
 * 向下取整
 *
 * @remarks
 * 返回传入数字向下取整的结果
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "向下取整", "insertText": "Floor(1)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回传入数字向下取整的结果" , "definition": "Floor(数字):数字"}
 */
export declare function Floor(num: number): number;
/**
 * 向上取整
 *
 * @remarks
 * 返回传入数字向上取整的结果
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "向上取整", "insertText": "Ceiling(1)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回传入数字向上取整的结果" , "definition": "Ceiling(数字):数字"}
 */
export declare function Ceiling(num: number): number;
/**
 * 四舍五入
 *
 * @remarks
 * 返回传入数字四舍五入后的结果
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "四舍五入", "insertText": "Round(1)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回传入数字四舍五入后的结果" , "definition": "Round(数字):数字"}
 */
export declare function Round(num: number): number;
/**
 * 求和
 *
 * @remarks
 * 返回一组数字中的和
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "求和", "insertText": "Sum(1, 2)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回一组数字中的和" , "definition": "Sum(数字1, [数字2, ...]):数字"}
 */
export declare function Sum(...args: number[]): number;
/**
 * 随机数
 *
 * @remarks
 * 返回一个指定范围的伪随机数，例如 Rand(10)，返回一个范围在 10 以内的随机数
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "随机数", "insertText": "Rand(1)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回一个指定范围的伪随机数，例如 Rand(10)，返回一个范围在 10 以内的随机数" , "definition": "Rand(数字):数字"}
 */
export declare function Rand(num: number): number;
