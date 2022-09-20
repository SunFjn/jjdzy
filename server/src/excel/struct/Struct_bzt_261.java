package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * B_261_八阵图表.xlsx
 */
public class Struct_bzt_261 {
    /**阵眼id*/
    private int id;
    /**开启等级*/
    private int lv;
    /**vip等级*/
    private int vip;
    /**需要符文总等级*/
    private int fw;
    /**解锁消耗*/
    private int[][] xh;
    /**
     * 阵眼id
     */
    public int getId() {
        return id;
    }
    /**
     * 开启等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * vip等级
     */
    public int getVip() {
        return vip;
    }
    /**
     * 需要符文总等级
     */
    public int getFw() {
        return fw;
    }
    /**
     * 解锁消耗
     */
    public int[][] getXh() {
        return xh;
    }
    public Struct_bzt_261(int id,int lv,int vip,int fw,String xh) {
        this.id = id;
        this.lv = lv;
        this.vip = vip;
        this.fw = fw;
        this.xh = ExcelJsonUtils.toObj(xh,int[][].class);
    }
}