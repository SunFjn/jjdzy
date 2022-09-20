package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W_260_问鼎天下表.xlsx
 */
public class Struct_wdtx_260 {
    /**楼层*/
    private int id;
    /**楼层收益，30秒结算一次*/
    private int[][] reward;
    /**楼层奖励，首次达到能领（本服）*/
    private int[][] reward1;
    /**楼层奖励，首次达到能领（跨服）*/
    private int[][] reward2;
    /**进入下一层所需杀敌数*/
    private int next;
    /**掉层概率（十万）
	 * 0 不掉层*/
    private int tj;
    /**怪物
	 * 第10层的BOSS为玉玺BOSS，死了掉玉玺*/
    private int[][] npc;
    /**怪物积分*/
    private int point;
    /**战斗失败掉分*/
    private int lose;
    /**地图*/
    private int map;
    /**首次进入概率（百分比）*/
    private int join;
    /**楼层积分收益*/
    private int point1;
    /**
     * 楼层
     */
    public int getId() {
        return id;
    }
    /**
     * 楼层收益，30秒结算一次
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 楼层奖励，首次达到能领（本服）
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 楼层奖励，首次达到能领（跨服）
     */
    public int[][] getReward2() {
        return reward2;
    }
    /**
     * 进入下一层所需杀敌数
     */
    public int getNext() {
        return next;
    }
    /**
     * 掉层概率（十万）
	 * 0 不掉层
     */
    public int getTj() {
        return tj;
    }
    /**
     * 怪物
	 * 第10层的BOSS为玉玺BOSS，死了掉玉玺
     */
    public int[][] getNpc() {
        return npc;
    }
    /**
     * 怪物积分
     */
    public int getPoint() {
        return point;
    }
    /**
     * 战斗失败掉分
     */
    public int getLose() {
        return lose;
    }
    /**
     * 地图
     */
    public int getMap() {
        return map;
    }
    /**
     * 首次进入概率（百分比）
     */
    public int getJoin() {
        return join;
    }
    /**
     * 楼层积分收益
     */
    public int getPoint1() {
        return point1;
    }
    public Struct_wdtx_260(int id,String reward,String reward1,String reward2,int next,int tj,String npc,int point,int lose,int map,int join,int point1) {
        this.id = id;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
        this.next = next;
        this.tj = tj;
        this.npc = ExcelJsonUtils.toObj(npc,int[][].class);
        this.point = point;
        this.lose = lose;
        this.map = map;
        this.join = join;
        this.point1 = point1;
    }
}