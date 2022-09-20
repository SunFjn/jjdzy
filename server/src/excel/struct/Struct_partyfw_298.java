package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_298_宴会氛围表.xlsx
 */
public class Struct_partyfw_298 {
    /**氛围奖励id*/
    private int id;
    /**下一级奖励*/
    private int next;
    /**奖励*/
    private int[][] reward;
    /**需要氛围值*/
    private int fw;
    /**所属宴会*/
    private int party;
    /**
     * 氛围奖励id
     */
    public int getId() {
        return id;
    }
    /**
     * 下一级奖励
     */
    public int getNext() {
        return next;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 需要氛围值
     */
    public int getFw() {
        return fw;
    }
    /**
     * 所属宴会
     */
    public int getParty() {
        return party;
    }
    public Struct_partyfw_298(int id,int next,String reward,int fw,int party) {
        this.id = id;
        this.next = next;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.fw = fw;
        this.party = party;
    }
}