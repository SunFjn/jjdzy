package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_760_奇策-增威表.xlsx
 */
public class Struct_qczw_760 {
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
    private int xh;
    /**增威条件
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
    public int getXh() {
        return xh;
    }
    /**
     * 增威条件
	 * Windows 用户:
	 * 
	 * 对应奇策所需星级
     */
    public int getTj() {
        return tj;
    }
    public Struct_qczw_760(int dj,String sx,int zl,int xh,int tj) {
        this.dj = dj;
        this.sx = ExcelJsonUtils.toObj(sx,int[][].class);
        this.zl = zl;
        this.xh = xh;
        this.tj = tj;
    }
}