package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_020_侍女升级表.xlsx
 */
public class Struct_snsj_020 {
    /**等级
	 * 品质*10000+LV*/
    private int dj;
    /**属性*/
    private int[][] sx;
    /**战力*/
    private int zl;
    /**升级消耗*/
    private int[][] xh;
    /**
     * 等级
	 * 品质*10000+LV
     */
    public int getDj() {
        return dj;
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
     * 升级消耗
     */
    public int[][] getXh() {
        return xh;
    }
    public Struct_snsj_020(int dj,String sx,int zl,String xh) {
        this.dj = dj;
        this.sx = ExcelJsonUtils.toObj(sx,int[][].class);
        this.zl = zl;
        this.xh = ExcelJsonUtils.toObj(xh,int[][].class);
    }
}