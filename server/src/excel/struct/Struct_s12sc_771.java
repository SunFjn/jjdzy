package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_771_新活动-双12商城表.xlsx
 */
public class Struct_s12sc_771 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**位置*/
    private int wz;
    /**道具名*/
    private String mz;
    /**道具
	 * Administrator:
	 * 类型，道具id，数量
	 * */
    private int[][] dj;
    /**原价
	 * Administrator:
	 * 类型，ID,数量
	 * */
    private int[][] yj;
    /**现价
	 * Administrator:
	 * 0=无限
	 * */
    private int[][] xj;
    /**限购次数*/
    private int cs;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 位置
     */
    public int getWz() {
        return wz;
    }
    /**
     * 道具名
     */
    public String getMz() {
        return mz;
    }
    /**
     * 道具
	 * Administrator:
	 * 类型，道具id，数量
	 * 
     */
    public int[][] getDj() {
        return dj;
    }
    /**
     * 原价
	 * Administrator:
	 * 类型，ID,数量
	 * 
     */
    public int[][] getYj() {
        return yj;
    }
    /**
     * 现价
	 * Administrator:
	 * 0=无限
	 * 
     */
    public int[][] getXj() {
        return xj;
    }
    /**
     * 限购次数
     */
    public int getCs() {
        return cs;
    }
    public Struct_s12sc_771(int id,int qs,int wz,String mz,String dj,String yj,String xj,int cs) {
        this.id = id;
        this.qs = qs;
        this.wz = wz;
        this.mz = mz;
        this.dj = ExcelJsonUtils.toObj(dj,int[][].class);
        this.yj = ExcelJsonUtils.toObj(yj,int[][].class);
        this.xj = ExcelJsonUtils.toObj(xj,int[][].class);
        this.cs = cs;
    }
}