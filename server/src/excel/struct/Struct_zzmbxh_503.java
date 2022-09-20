package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_503_新活动-至尊秘宝消耗表.xlsx
 */
public class Struct_zzmbxh_503 {
    /**抽奖次数*/
    private int id;
    /**消耗*/
    private int[][] consume;
    /**
     * 抽奖次数
     */
    public int getId() {
        return id;
    }
    /**
     * 消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    public Struct_zzmbxh_503(int id,String consume) {
        this.id = id;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
    }
}