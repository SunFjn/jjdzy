package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_760_奇策-升级表.xlsx
 */
public class Struct_qcsj_760 {
    /**等级
	 * Windows 用户:
	 * 
	 * Axxxx
	 * A：品质
	 * xxxx：等级*/
    private int dj;
    /**属性*/
    private int[][] sx;
    /**战力*/
    private int zl;
    /**升级消耗*/
    private int[][] xh;
    /**升级条件
	 * Windows 用户:
	 * 
	 * 对应奇策所需星级*/
    private int tj;
    /**
     * 等级
	 * Windows 用户:
	 * 
	 * Axxxx
	 * A：品质
	 * xxxx：等级
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
    /**
     * 升级条件
	 * Windows 用户:
	 * 
	 * 对应奇策所需星级
     */
    public int getTj() {
        return tj;
    }
    public Struct_qcsj_760(int dj,String sx,int zl,String xh,int tj) {
        this.dj = dj;
        this.sx = ExcelJsonUtils.toObj(sx,int[][].class);
        this.zl = zl;
        this.xh = ExcelJsonUtils.toObj(xh,int[][].class);
        this.tj = tj;
    }
}