"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLDriver = void 0;
class MySQLDriver {
    mysql;
    conn;
    config;
    constructor(config) {
        this.config = config;
        this.mysql = require("promise-mysql");
    }
    checkConnection() {
        if (this.conn == null)
            throw new Error("MySQL not connected to the database");
    }
    async connect() {
        this.conn = (await this.mysql.createPool(this.config));
    }
    async prepare(table) {
        this.checkConnection();
        await this.conn?.query(`CREATE TABLE IF NOT EXISTS ${table} (ID TEXT, json TEXT)`);
    }
    async getAllRows(table) {
        this.checkConnection();
        const results = await this.conn?.query(`SELECT * FROM ${table}`);
        return results.map((row) => ({
            id: row.ID,
            value: JSON.parse(row.json),
        }));
    }
    async getRowByKey(table, key) {
        this.checkConnection();
        const results = await this.conn?.query(`SELECT json FROM ${table} WHERE ID = ?`, [key]);
        if(!results) return []
        if (results.length == 0)
            return [null, false];
        return [JSON.parse(results[0].json), true];
    }
    async setRowByKey(table, key, value, update) {
        const stringifiedJson = JSON.stringify(value);
        if (update) {
            await this.conn?.query(`UPDATE ${table} SET json = (?) WHERE ID = (?)`, [stringifiedJson, key]);
        }
        else {
            await this.conn?.query(`INSERT INTO ${table} (ID,json) VALUES (?,?)`, [key, stringifiedJson]);
        }
        return value;
    }
    async deleteAllRows(table) {
        this.checkConnection();
        const result = await this.conn?.query(`DELETE FROM ${table}`);
        return result.affectedRows;
    }
    async deleteRowByKey(table, key) {
        this.checkConnection();
        const result = await this.conn?.query(`DELETE FROM ${table} WHERE ID=?`, [key]);
        return result.affectedRows;
    }
}
exports.MySQLDriver = MySQLDriver;
//# sourceMappingURL=MySQLDriver.js.map