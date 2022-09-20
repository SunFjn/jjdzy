package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_290_粮草争夺表2.xlsx
 */
public class Struct_rice2_290 {
    /**id*/
    private int id;
    /**npcid*/
    private int npc;
    /**所属阵营*/
    private int zy;
    /**奖励*/
    private int[][] reward;
    /**积分*/
    private int point;
    /**刷新数量*/
    private int num;
    /**坐标*/
    private int[][] zb;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * npcid
     */
    public int getNpc() {
        return npc;
    }
    /**
     * 所属阵营
     */
    public int getZy() {
        return zy;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 积分
     */
    public int getPoint() {
        return point;
    }
    /**
     * 刷新数量
     */
    public int getNum() {
        return num;
    }
    /**
     * 坐标
     */
    public int[][] getZb() {
        return zb;
    }
    public Struct_rice2_290(int id,int npc,int zy,String reward,int point,int num,String zb) {
        this.id = id;
        this.npc = npc;
        this.zy = zy;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.point = point;
        this.num = num;
        this.zb = ExcelJsonUtils.toObj(zb,int[][].class);
    }
}