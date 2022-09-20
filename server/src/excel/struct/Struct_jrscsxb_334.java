package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_334_新活动-节日商城刷新表.xlsx
 */
public class Struct_jrscsxb_334 {
    /**活动期数*/
    private int qs;
    /**刷新折扣价格*/
    private int[][] zk;
    /**刷新商品价格*/
    private int[][] sp;
    /**刷新折扣上限*/
    private int sx;
    /**显示/刷新商品数*/
    private int xs;
    /**
     * 活动期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 刷新折扣价格
     */
    public int[][] getZk() {
        return zk;
    }
    /**
     * 刷新商品价格
     */
    public int[][] getSp() {
        return sp;
    }
    /**
     * 刷新折扣上限
     */
    public int getSx() {
        return sx;
    }
    /**
     * 显示/刷新商品数
     */
    public int getXs() {
        return xs;
    }
    public Struct_jrscsxb_334(int qs,String zk,String sp,int sx,int xs) {
        this.qs = qs;
        this.zk = ExcelJsonUtils.toObj(zk,int[][].class);
        this.sp = ExcelJsonUtils.toObj(sp,int[][].class);
        this.sx = sx;
        this.xs = xs;
    }
}