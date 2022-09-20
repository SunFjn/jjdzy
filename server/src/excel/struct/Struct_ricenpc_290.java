package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_290_粮草争夺怪物表.xlsx
 */
public class Struct_ricenpc_290 {
    /**怪物id*/
    private int npc;
    /**刷新数量*/
    private int num;
    /**击杀奖励*/
    private int[][] reward;
    /**击杀积分*/
    private int point;
    /**参与奖励*/
    private int[][] reward1;
    /**参与积分*/
    private int point1;
    /**复活时间（秒）*/
    private int time;
    /**是否是BOSS*/
    private int boss;
    /**刷出坐标
	 * 0：全地图可行走区域刷新（除了出生点和其他怪物固定刷新点）
	 * 其他：定点刷新
	 * */
    private int[][] zb;
    /**
     * 怪物id
     */
    public int getNpc() {
        return npc;
    }
    /**
     * 刷新数量
     */
    public int getNum() {
        return num;
    }
    /**
     * 击杀奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 击杀积分
     */
    public int getPoint() {
        return point;
    }
    /**
     * 参与奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 参与积分
     */
    public int getPoint1() {
        return point1;
    }
    /**
     * 复活时间（秒）
     */
    public int getTime() {
        return time;
    }
    /**
     * 是否是BOSS
     */
    public int getBoss() {
        return boss;
    }
    /**
     * 刷出坐标
	 * 0：全地图可行走区域刷新（除了出生点和其他怪物固定刷新点）
	 * 其他：定点刷新
	 * 
     */
    public int[][] getZb() {
        return zb;
    }
    public Struct_ricenpc_290(int npc,int num,String reward,int point,String reward1,int point1,int time,int boss,String zb) {
        this.npc = npc;
        this.num = num;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.point = point;
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.point1 = point1;
        this.time = time;
        this.boss = boss;
        this.zb = ExcelJsonUtils.toObj(zb,int[][].class);
    }
}