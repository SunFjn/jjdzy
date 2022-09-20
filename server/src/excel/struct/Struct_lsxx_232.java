package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_232_乱世枭雄表.xlsx
 */
public class Struct_lsxx_232 {
    /**段位*/
    private int dan;
    /**排名数量*/
    private int rank;
    /**前XX名可晋级挑战*/
    private int up;
    /**晋级奖励（晋级时邮件发放）*/
    private int[][] reward1;
    /**段位奖励（赛季结束发放）*/
    private int[][] reward2;
    /**机器人*/
    private int npc;
    /**机器人名字*/
    private String npcname;
    /**机器人模型*/
    private int mod;
    /**机器人武器*/
    private int weapon;
    /**晋级对手区间*/
    private int[][] enemy;
    /**
     * 段位
     */
    public int getDan() {
        return dan;
    }
    /**
     * 排名数量
     */
    public int getRank() {
        return rank;
    }
    /**
     * 前XX名可晋级挑战
     */
    public int getUp() {
        return up;
    }
    /**
     * 晋级奖励（晋级时邮件发放）
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 段位奖励（赛季结束发放）
     */
    public int[][] getReward2() {
        return reward2;
    }
    /**
     * 机器人
     */
    public int getNpc() {
        return npc;
    }
    /**
     * 机器人名字
     */
    public String getNpcname() {
        return npcname;
    }
    /**
     * 机器人模型
     */
    public int getMod() {
        return mod;
    }
    /**
     * 机器人武器
     */
    public int getWeapon() {
        return weapon;
    }
    /**
     * 晋级对手区间
     */
    public int[][] getEnemy() {
        return enemy;
    }
    public Struct_lsxx_232(int dan,int rank,int up,String reward1,String reward2,int npc,String npcname,int mod,int weapon,String enemy) {
        this.dan = dan;
        this.rank = rank;
        this.up = up;
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
        this.npc = npc;
        this.npcname = npcname;
        this.mod = mod;
        this.weapon = weapon;
        this.enemy = ExcelJsonUtils.toObj(enemy,int[][].class);
    }
}