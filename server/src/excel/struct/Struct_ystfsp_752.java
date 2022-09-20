package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_752_异兽录-天赋升品表.xlsx
 */
public class Struct_ystfsp_752 {
    /**品质
	 * 1xxx：白品+xxx
	 * 2xxx：绿品+xxx
	 * 3xxx：蓝品+xxx
	 * 4xxx：紫品+xxx
	 * 5xxx：橙品+xxx
	 * 6xxx：红品+xxx
	 * 
	 * 例如：6004表示红品+4*/
    private int pz;
    /**下一品*/
    private int xyp;
    /**属性*/
    private int[][] sx;
    /**战力*/
    private int zl;
    /**消耗*/
    private int[][] xh;
    /**
     * 品质
	 * 1xxx：白品+xxx
	 * 2xxx：绿品+xxx
	 * 3xxx：蓝品+xxx
	 * 4xxx：紫品+xxx
	 * 5xxx：橙品+xxx
	 * 6xxx：红品+xxx
	 * 
	 * 例如：6004表示红品+4
     */
    public int getPz() {
        return pz;
    }
    /**
     * 下一品
     */
    public int getXyp() {
        return xyp;
    }
    /**
     * 属性
     */
    public int[][] getSx() {
        return sx;
    }
    /**
     * 战力
     */
    public int getZl() {
        return zl;
    }
    /**
     * 消耗
     */
    public int[][] getXh() {
        return xh;
    }
    public Struct_ystfsp_752(int pz,int xyp,String sx,int zl,String xh) {
        this.pz = pz;
        this.xyp = xyp;
        this.sx = ExcelJsonUtils.toObj(sx,int[][].class);
        this.zl = zl;
        this.xh = ExcelJsonUtils.toObj(xh,int[][].class);
    }
}