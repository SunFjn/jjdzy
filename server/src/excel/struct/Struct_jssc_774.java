package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_774_新活动-金鼠送财.xlsx
 */
public class Struct_jssc_774 {
    /**购买次数*/
    private int cs;
    /**累计充值*/
    private int cz;
    /**购买消耗*/
    private int[][] xh;
    /**最少元宝*/
    private int min;
    /**最多元宝*/
    private int max;
    /**
     * 购买次数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 累计充值
     */
    public int getCz() {
        return cz;
    }
    /**
     * 购买消耗
     */
    public int[][] getXh() {
        return xh;
    }
    /**
     * 最少元宝
     */
    public int getMin() {
        return min;
    }
    /**
     * 最多元宝
     */
    public int getMax() {
        return max;
    }
    public Struct_jssc_774(int cs,int cz,String xh,int min,int max) {
        this.cs = cs;
        this.cz = cz;
        this.xh = ExcelJsonUtils.toObj(xh,int[][].class);
        this.min = min;
        this.max = max;
    }
}