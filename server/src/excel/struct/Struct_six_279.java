package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_279_六出祁山表.xlsx
 */
public class Struct_six_279 {
    /**id
	 * id=大关卡*1000+小关卡*/
    private int id;
    /**下个id*/
    private int next;
    /**难度*/
    private int hard;
    /**NPC*/
    private int npc;
    /**首通奖励*/
    private int[][] reward;
    /**通关奖励*/
    private String reward1;
    /**协助奖励*/
    private String reward3;
    /**
     * id
	 * id=大关卡*1000+小关卡
     */
    public int getId() {
        return id;
    }
    /**
     * 下个id
     */
    public int getNext() {
        return next;
    }
    /**
     * 难度
     */
    public int getHard() {
        return hard;
    }
    /**
     * NPC
     */
    public int getNpc() {
        return npc;
    }
    /**
     * 首通奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 通关奖励
     */
    public String getReward1() {
        return reward1;
    }
    /**
     * 协助奖励
     */
    public String getReward3() {
        return reward3;
    }
    public Struct_six_279(int id,int next,int hard,int npc,String reward,String reward1,String reward3) {
        this.id = id;
        this.next = next;
        this.hard = hard;
        this.npc = npc;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.reward1 = reward1;
        this.reward3 = reward3;
    }
}