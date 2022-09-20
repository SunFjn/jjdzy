package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_295_幸运扭蛋抽奖表.xlsx
 */
public class Struct_luckeggcj_295 {
    /**抽奖次数*/
    private int id;
    /**价格*/
    private int[][] consume;
    /**
     * 抽奖次数
     */
    public int getId() {
        return id;
    }
    /**
     * 价格
     */
    public int[][] getConsume() {
        return consume;
    }
    public Struct_luckeggcj_295(int id,String consume) {
        this.id = id;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
    }
}