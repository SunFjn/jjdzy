package excel.struct;
/**
 * K_767跨服试炼.xlsx
 */
public class Struct_kfsl_767 {
    /**通关数*/
    private int tgs;
    /**类型
	 * AXX
	 * 
	 * 1XX.战斗层
	 * 2XX.buff层
	 * 3XX.宝箱层
	 * 
	 * 哪个层就读对应的数据表*/
    private int lx;
    /**
     * 通关数
     */
    public int getTgs() {
        return tgs;
    }
    /**
     * 类型
	 * AXX
	 * 
	 * 1XX.战斗层
	 * 2XX.buff层
	 * 3XX.宝箱层
	 * 
	 * 哪个层就读对应的数据表
     */
    public int getLx() {
        return lx;
    }
    public Struct_kfsl_767(int tgs,int lx) {
        this.tgs = tgs;
        this.lx = lx;
    }
}