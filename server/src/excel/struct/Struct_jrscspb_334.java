package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_334_新活动-节日商城商品表.xlsx
 */
public class Struct_jrscspb_334 {
    /**索引id
	 * 1000*期数+顺序
	 * */
    private int id;
    /**活动期数*/
    private int qs;
    /**道具
	 * 类型，道具id，数量
	 * */
    private int[][] dj;
    /**原价*/
    private int[][] yj;
    /**购买次数
	 * 0=无限
	 * */
    private int time;
    /**
     * 索引id
	 * 1000*期数+顺序
	 * 
     */
    public int getId() {
        return id;
    }
    /**
     * 活动期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 道具
	 * 类型，道具id，数量
	 * 
     */
    public int[][] getDj() {
        return dj;
    }
    /**
     * 原价
     */
    public int[][] getYj() {
        return yj;
    }
    /**
     * 购买次数
	 * 0=无限
	 * 
     */
    public int getTime() {
        return time;
    }
    public Struct_jrscspb_334(int id,int qs,String dj,String yj,int time) {
        this.id = id;
        this.qs = qs;
        this.dj = ExcelJsonUtils.toObj(dj,int[][].class);
        this.yj = ExcelJsonUtils.toObj(yj,int[][].class);
        this.time = time;
    }
}