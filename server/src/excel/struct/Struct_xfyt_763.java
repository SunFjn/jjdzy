package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_763_新活动-消费摇骰.xlsx
 */
public class Struct_xfyt_763 {
    /**格子id
	 * AXXX
	 * 
	 * A:期数
	 * xxx：具体的格子数*/
    private int id;
    /**下个格子*/
    private int next;
    /**跑圈*/
    private int pq;
    /**奖励
	 * [[道具类型,道具id,道具数量,是否广播]]*/
    private int[][] reward;
    /**是否大奖标志
	 * 0：没有标志
	 * 1：有大奖标志*/
    private int dj;
    /**期数*/
    private int qs;
    /**
     * 格子id
	 * AXXX
	 * 
	 * A:期数
	 * xxx：具体的格子数
     */
    public int getId() {
        return id;
    }
    /**
     * 下个格子
     */
    public int getNext() {
        return next;
    }
    /**
     * 跑圈
     */
    public int getPq() {
        return pq;
    }
    /**
     * 奖励
	 * [[道具类型,道具id,道具数量,是否广播]]
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 是否大奖标志
	 * 0：没有标志
	 * 1：有大奖标志
     */
    public int getDj() {
        return dj;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_xfyt_763(int id,int next,int pq,String reward,int dj,int qs) {
        this.id = id;
        this.next = next;
        this.pq = pq;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.dj = dj;
        this.qs = qs;
    }
}