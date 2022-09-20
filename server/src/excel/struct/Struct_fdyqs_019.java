package excel.struct;
/**
 * F_019_府邸摇钱树.xlsx
 */
public class Struct_fdyqs_019 {
    /**摇钱树ID*/
    private int yqs;
    /**摇钱基数下限
	 * 摇钱必定获得元宝*/
    private int xiaxian;
    /**摇钱基数上限*/
    private int shangxian;
    /**
     * 摇钱树ID
     */
    public int getYqs() {
        return yqs;
    }
    /**
     * 摇钱基数下限
	 * 摇钱必定获得元宝
     */
    public int getXiaxian() {
        return xiaxian;
    }
    /**
     * 摇钱基数上限
     */
    public int getShangxian() {
        return shangxian;
    }
    public Struct_fdyqs_019(int yqs,int xiaxian,int shangxian) {
        this.yqs = yqs;
        this.xiaxian = xiaxian;
        this.shangxian = shangxian;
    }
}