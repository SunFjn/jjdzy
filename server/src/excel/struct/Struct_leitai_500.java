package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_500_新活动-擂台比武表.xlsx
 */
public class Struct_leitai_500 {
    /**擂台id*/
    private int id;
    /**期数*/
    private int qs;
    /**NPC*/
    private int npc;
    /**NPC奖励*/
    private int[][] reward1;
    /**擂主奖励*/
    private int[][] reward2;
    /**协助奖励*/
    private int[][] reward3;
    /**
     * 擂台id
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * NPC
     */
    public int getNpc() {
        return npc;
    }
    /**
     * NPC奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 擂主奖励
     */
    public int[][] getReward2() {
        return reward2;
    }
    /**
     * 协助奖励
     */
    public int[][] getReward3() {
        return reward3;
    }
    public Struct_leitai_500(int id,int qs,int npc,String reward1,String reward2,String reward3) {
        this.id = id;
        this.qs = qs;
        this.npc = npc;
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
        this.reward3 = ExcelJsonUtils.toObj(reward3,int[][].class);
    }
}