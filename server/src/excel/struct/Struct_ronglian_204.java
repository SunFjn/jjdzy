package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * R_204_熔炼表.xlsx
 */
public class Struct_ronglian_204 {
    /**熔炼等级*/
    private int level;
    /**熔炼属性*/
    private int[][] shuxing;
    /**升级熔炼值*/
    private int ronglian;
    /**
     * 熔炼等级
     */
    public int getLevel() {
        return level;
    }
    /**
     * 熔炼属性
     */
    public int[][] getShuxing() {
        return shuxing;
    }
    /**
     * 升级熔炼值
     */
    public int getRonglian() {
        return ronglian;
    }
    public Struct_ronglian_204(int level,String shuxing,int ronglian) {
        this.level = level;
        this.shuxing = ExcelJsonUtils.toObj(shuxing,int[][].class);
        this.ronglian = ronglian;
    }
}