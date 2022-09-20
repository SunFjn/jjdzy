package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_328_新活动许愿树奖励表.xlsx
 */
public class Struct_xysjlb_328 {
    /**期数*/
    private int qs;
    /**普通奖励
	 * 道具类型，道具id，道具数量，概率，是否广播*/
    private String pt;
    /**高级奖励
	 * 道具类型，道具id，道具数量，概率，是否广播*/
    private String gj;
    /**展示奖励*/
    private int[][] zs;
    /**抽奖一次*/
    private int[][] cj1;
    /**抽奖十次*/
    private int[][] cj2;
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 普通奖励
	 * 道具类型，道具id，道具数量，概率，是否广播
     */
    public String getPt() {
        return pt;
    }
    /**
     * 高级奖励
	 * 道具类型，道具id，道具数量，概率，是否广播
     */
    public String getGj() {
        return gj;
    }
    /**
     * 展示奖励
     */
    public int[][] getZs() {
        return zs;
    }
    /**
     * 抽奖一次
     */
    public int[][] getCj1() {
        return cj1;
    }
    /**
     * 抽奖十次
     */
    public int[][] getCj2() {
        return cj2;
    }
    public Struct_xysjlb_328(int qs,String pt,String gj,String zs,String cj1,String cj2) {
        this.qs = qs;
        this.pt = pt;
        this.gj = gj;
        this.zs = ExcelJsonUtils.toObj(zs,int[][].class);
        this.cj1 = ExcelJsonUtils.toObj(cj1,int[][].class);
        this.cj2 = ExcelJsonUtils.toObj(cj2,int[][].class);
    }
}