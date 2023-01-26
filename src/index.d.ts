import { IDriver } from "./drivers/IDriver";
export { IDriver } from "./drivers/IDriver";
export { MySQLDriver } from "./drivers/MySQLDriver";
export interface IAcarDBOptions {
    table?: string;
    filePath?: string;
    driver?: IDriver;
}
export declare class AcarDB {
    driver: IDriver;
    tableName: string;
    options: IAcarDBOptions;
    constructor(options?: IAcarDBOptions);
    private addSubtract;
    private getArray;
    all(): Promise<{
        id: string;
        value: any;
    }[]>;
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: any): Promise<T>;
    has(key: string): Promise<boolean>;
    delete(key: string): Promise<number>;
    deleteAll(): Promise<number>;
    add(key: string, value: number): Promise<number>;
    sub(key: string, value: number): Promise<number>;
    push<T>(key: string, value: any | any[]): Promise<T[]>;
    pull<T>(key: string, value: any | any[] | ((data: any) => boolean)): Promise<T[]>;
    table(table: string): AcarDB;
}
