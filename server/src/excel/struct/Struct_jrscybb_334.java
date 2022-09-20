package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_334_新活动-节日商城元宝表.xlsx
 */
public class Struct_jrscybb_334 {
    /**序号*/
    private int xh;
    /**活动期数*/
    private int qs;
    /**刷新折扣次数*/
    private int zk;
    /**刷新商品价格*/
    private int[][] jg;
    /**
     * 序号
     */
    public int getXh() {
        return xh;
    }
    /**
     * 活动期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 刷新折扣次数
     */
    public int getZk() {
        return zk;
    }
    /**
     * 刷新商品价格
     */
    public int[][] getJg() {
        return jg;
    }
    public Struct_jrscybb_334(int xh,int qs,int zk,String jg) {
        this.xh = xh;
        this.qs = qs;
        this.zk = zk;
        this.jg = ExcelJsonUtils.toObj(jg,int[][].class);
    }
}