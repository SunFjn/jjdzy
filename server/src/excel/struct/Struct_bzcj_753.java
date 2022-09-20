package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_753_新活动_三国宝藏_抽奖.xlsx
 */
public class Struct_bzcj_753 {
    /**编号
	 * 1xxx：第1期编号
	 * 2xxx：第2期编号
	 * 3xxx：第3期编号*/
    private int id;
    /**抽取次数*/
    private int[][] cs;
    /**期数*/
    private int qs;
    /**轮数*/
    private int ls;
    /**奖池范围
	 * [[奖池1,奖池2]]
	 * 对应奖池表的编号*/
    private int[][] bzjc;
    /**
     * 编号
	 * 1xxx：第1期编号
	 * 2xxx：第2期编号
	 * 3xxx：第3期编号
     */
    public int getId() {
        return id;
    }
    /**
     * 抽取次数
     */
    public int[][] getCs() {
        return cs;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 轮数
     */
    public int getLs() {
        return ls;
    }
    /**
     * 奖池范围
	 * [[奖池1,奖池2]]
	 * 对应奖池表的编号
     */
    public int[][] getBzjc() {
        return bzjc;
    }
    public Struct_bzcj_753(int id,String cs,int qs,int ls,String bzjc) {
        this.id = id;
        this.cs = ExcelJsonUtils.toObj(cs,int[][].class);
        this.qs = qs;
        this.ls = ls;
        this.bzjc = ExcelJsonUtils.toObj(bzjc,int[][].class);
    }
}