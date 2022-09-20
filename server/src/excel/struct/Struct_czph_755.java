package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_755_新活动_充值排行.xlsx
 */
public class Struct_czph_755 {
    /**索引id*/
    private int id;
    /**活动期数*/
    private int qs;
    /**排行*/
    private int[][] rank;
    /**奖励*/
    private int[][] tips;
    /**上榜条件（充值元宝）*/
    private int tj;
    /**
     * 索引id
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
     * 排行
     */
    public int[][] getRank() {
        return rank;
    }
    /**
     * 奖励
     */
    public int[][] getTips() {
        return tips;
    }
    /**
     * 上榜条件（充值元宝）
     */
    public int getTj() {
        return tj;
    }
    public Struct_czph_755(int id,int qs,String rank,String tips,int tj) {
        this.id = id;
        this.qs = qs;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.tips = ExcelJsonUtils.toObj(tips,int[][].class);
        this.tj = tj;
    }
}