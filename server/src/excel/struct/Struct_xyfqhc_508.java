package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_508_新活动-幸运福签合成表.xlsx
 */
public class Struct_xyfqhc_508 {
    /**目标福签id*/
    private int id;
    /**消耗签
	 * 道具类型，签id，数量*/
    private int[][] q;
    /**合成消耗*/
    private int[][] consume;
    /**
     * 目标福签id
     */
    public int getId() {
        return id;
    }
    /**
     * 消耗签
	 * 道具类型，签id，数量
     */
    public int[][] getQ() {
        return q;
    }
    /**
     * 合成消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    public Struct_xyfqhc_508(int id,String q,String consume) {
        this.id = id;
        this.q = ExcelJsonUtils.toObj(q,int[][].class);
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
    }
}