package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-261-三国庆典-消费排行表.xlsx
 */
public class Struct_sgxfph_261 {
    /**索引id*/
    private int id;
    /**活动期数*/
    private int qs;
    /**排行*/
    private int[][] rank;
    /**奖励*/
    private int[][] tips;
    /**上榜条件（元宝消耗）*/
    private int tj;
    /**元宝返还（百分之XX）*/
    private int fh;
    /**监控ID*/
    private int jiankong;
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
     * 上榜条件（元宝消耗）
     */
    public int getTj() {
        return tj;
    }
    /**
     * 元宝返还（百分之XX）
     */
    public int getFh() {
        return fh;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_sgxfph_261(int id,int qs,String rank,String tips,int tj,int fh,int jiankong) {
        this.id = id;
        this.qs = qs;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.tips = ExcelJsonUtils.toObj(tips,int[][].class);
        this.tj = tj;
        this.fh = fh;
        this.jiankong = jiankong;
    }
}