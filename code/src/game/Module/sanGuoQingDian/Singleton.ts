class Singleton {
    private static dic: any = {};
    public static getInst<T>(cla: any) {
        const key = cla.prototype.__class__;
        return (this.dic[key] || (this.dic[key] = new cla())) as T;
    }
}