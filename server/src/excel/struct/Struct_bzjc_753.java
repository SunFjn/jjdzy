package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_753_新活动_三国宝藏-奖池.xlsx
 */
public class Struct_bzjc_753 {
    /**编号
	 * 奖池规格编号
	 * 1xy：1表示第1期，x表示第x轮抽奖（1-2），y表示奖池档次（1-4）
	 * 2xy：2表示第2期，x表示第x轮抽奖（1-2），y表示奖池档次（1-4）
	 * 3xy：3表示第3期，x表示第x轮抽奖（1-2），y表示奖池档次（1-4）*/
    private int id;
    /**期数
	 * 活动期数*/
    private int qs;
    /**轮数
	 * 第x轮寻宝*/
    private int ls;
    /**宝藏档次
	 * 1.系统奖池
	 * 2.高级奖池
	 * 3.豪华奖池
	 * 4.至尊奖池*/
    private int dc;
    /**宝藏奖池*/
    private int[][] bzjc;
    /**
     * 编号
	 * 奖池规格编号
	 * 1xy：1表示第1期，x表示第x轮抽奖（1-2），y表示奖池档次（1-4）
	 * 2xy：2表示第2期，x表示第x轮抽奖（1-2），y表示奖池档次（1-4）
	 * 3xy：3表示第3期，x表示第x轮抽奖（1-2），y表示奖池档次（1-4）
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
	 * 活动期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 轮数
	 * 第x轮寻宝
     */
    public int getLs() {
        return ls;
    }
    /**
     * 宝藏档次
	 * 1.系统奖池
	 * 2.高级奖池
	 * 3.豪华奖池
	 * 4.至尊奖池
     */
    public int getDc() {
        return dc;
    }
    /**
     * 宝藏奖池
     */
    public int[][] getBzjc() {
        return bzjc;
    }
    public Struct_bzjc_753(int id,int qs,int ls,int dc,String bzjc) {
        this.id = id;
        this.qs = qs;
        this.ls = ls;
        this.dc = dc;
        this.bzjc = ExcelJsonUtils.toObj(bzjc,int[][].class);
    }
}