package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_766_阵眼 - 阵心表.xlsx
 */
public class Struct_zx_766 {
    /**星级*/
    private int lv;
    /**下一级*/
    private int xj;
    /**升星条件
	 * 
	 * 所有阵眼达到同星级
	 * 
	 * 对应阵眼升级表里的等级id*/
    private int tj;
    /**属性*/
    private int[][] sx;
    /**符文升星提升
	 * 提升符文升星属性十万分比*/
    private int fwsx;
    /**符文升级提升
	 * 提升符文升级属性十万分比*/
    private int fwsj;
    /**复活
	 * 
	 * [[x,y]]
	 * x:复活几率，十万分比
	 * y:回复血量，十万分比*/
    private int[][] fh;
    /**升星消耗*/
    private int[][] sxxh;
    /**
     * 星级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 下一级
     */
    public int getXj() {
        return xj;
    }
    /**
     * 升星条件
	 * 
	 * 所有阵眼达到同星级
	 * 
	 * 对应阵眼升级表里的等级id
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
     * 符文升星提升
	 * 提升符文升星属性十万分比
     */
    public int getFwsx() {
        return fwsx;
    }
    /**
     * 符文升级提升
	 * 提升符文升级属性十万分比
     */
    public int getFwsj() {
        return fwsj;
    }
    /**
     * 复活
	 * 
	 * [[x,y]]
	 * x:复活几率，十万分比
	 * y:回复血量，十万分比
     */
    public int[][] getFh() {
        return fh;
    }
    /**
     * 升星消耗
     */
    public int[][] getSxxh() {
        return sxxh;
    }
    public Struct_zx_766(int lv,int xj,int tj,String sx,int fwsx,int fwsj,String fh,String sxxh) {
        this.lv = lv;
        this.xj = xj;
        this.tj = tj;
        this.sx = ExcelJsonUtils.toObj(sx,int[][].class);
        this.fwsx = fwsx;
        this.fwsj = fwsj;
        this.fh = ExcelJsonUtils.toObj(fh,int[][].class);
        this.sxxh = ExcelJsonUtils.toObj(sxxh,int[][].class);
    }
}