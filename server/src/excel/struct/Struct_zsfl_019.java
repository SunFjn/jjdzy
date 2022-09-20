package excel.struct;
/**
 * F_019_装饰分类表.xlsx
 */
public class Struct_zsfl_019 {
    /**装饰类型*/
    private int zslx;
    /**重复类型分类
	 * 1：摇钱树
	 * 2：天工炉
	 * 3金库
	 * 4桌子
	 * 5床
	 * 6屏风
	 * 7梳妆台*/
    private int cf;
    /**
     * 装饰类型
     */
    public int getZslx() {
        return zslx;
    }
    /**
     * 重复类型分类
	 * 1：摇钱树
	 * 2：天工炉
	 * 3金库
	 * 4桌子
	 * 5床
	 * 6屏风
	 * 7梳妆台
     */
    public int getCf() {
        return cf;
    }
    public Struct_zsfl_019(int zslx,int cf) {
        this.zslx = zslx;
        this.cf = cf;
    }
}