package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_296_新活动-天降红包表.xlsx
 */
public class Struct_tjhb_296 {
    /**id
	 * 1X：充值人民币
	 * 2X：消费元宝
	 * 3X：寻宝次数
	 * 4X：神将阁次数*/
    private int id;
    /**任务参数*/
    private int cs;
    /**红包*/
    private int[][] hb;
    /**可抢数量*/
    private int sl;
    /**
     * id
	 * 1X：充值人民币
	 * 2X：消费元宝
	 * 3X：寻宝次数
	 * 4X：神将阁次数
     */
    public int getId() {
        return id;
    }
    /**
     * 任务参数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 红包
     */
    public int[][] getHb() {
        return hb;
    }
    /**
     * 可抢数量
     */
    public int getSl() {
        return sl;
    }
    public Struct_tjhb_296(int id,int cs,String hb,int sl) {
        this.id = id;
        this.cs = cs;
        this.hb = ExcelJsonUtils.toObj(hb,int[][].class);
        this.sl = sl;
    }
}