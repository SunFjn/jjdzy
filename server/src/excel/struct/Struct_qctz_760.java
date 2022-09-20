package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_760_奇策-套装表.xlsx
 */
public class Struct_qctz_760 {
    /**等级*/
    private int dj;
    /**升级条件
	 * 
	 * 所有奇策均达到xx星*/
    private int tj;
    /**属性*/
    private int[][] sx;
    /**战力*/
    private int zl;
    /**护盾时间
	 * 
	 * 单位为毫秒*/
    private int hdsj;
    /**
     * 等级
     */
    public int getDj() {
        return dj;
    }
    /**
     * 升级条件
	 * 
	 * 所有奇策均达到xx星
     */
    public int getTj() {
        return tj;
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
     * 护盾时间
	 * 
	 * 单位为毫秒
     */
    public int getHdsj() {
        return hdsj;
    }
    public Struct_qctz_760(int dj,int tj,String sx,int zl,int hdsj) {
        this.dj = dj;
        this.tj = tj;
        this.sx = ExcelJsonUtils.toObj(sx,int[][].class);
        this.zl = zl;
        this.hdsj = hdsj;
    }
}