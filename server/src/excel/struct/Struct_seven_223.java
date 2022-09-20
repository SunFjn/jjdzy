package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_223_七擒孟获表.xlsx
 */
public class Struct_seven_223 {
    /**boss
	 * jingyu:
	 * 索引id用这个*/
    private int boss;
    /**目标奖励对应id*/
    private int id;
    /**开启条件
	 * jingyu:
	 * [A,B]
	 * A=起始转数id
	 * B=结束转数id*/
    private int[][] con;
    /**地图*/
    private int map;
    /**参与奖励*/
    private int[][] joinreward;
    /**最后一击奖励*/
    private int[][] killreward;
    /**势力第1奖励*/
    private int[][] reward1;
    /**势力第2奖励*/
    private int[][] reward2;
    /**势力第3奖励*/
    private int[][] reward3;
    /**个人第1奖励*/
    private int[][] reward4;
    /**个人第2奖励*/
    private int[][] reward5;
    /**个人第3奖励*/
    private int[][] reward6;
    /**个人第4-10奖励*/
    private int[][] reward7;
    /**BOSS秒伤百分比
	 * jingyu:
	 * 百分之X*/
    private int ap;
    /**BOSS秒伤固定值*/
    private int p;
    /**验证时间
	 * jingyu:
	 * 单位为秒*/
    private int time;
    /**
     * boss
	 * jingyu:
	 * 索引id用这个
     */
    public int getBoss() {
        return boss;
    }
    /**
     * 目标奖励对应id
     */
    public int getId() {
        return id;
    }
    /**
     * 开启条件
	 * jingyu:
	 * [A,B]
	 * A=起始转数id
	 * B=结束转数id
     */
    public int[][] getCon() {
        return con;
    }
    /**
     * 地图
     */
    public int getMap() {
        return map;
    }
    /**
     * 参与奖励
     */
    public int[][] getJoinreward() {
        return joinreward;
    }
    /**
     * 最后一击奖励
     */
    public int[][] getKillreward() {
        return killreward;
    }
    /**
     * 势力第1奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 势力第2奖励
     */
    public int[][] getReward2() {
        return reward2;
    }
    /**
     * 势力第3奖励
     */
    public int[][] getReward3() {
        return reward3;
    }
    /**
     * 个人第1奖励
     */
    public int[][] getReward4() {
        return reward4;
    }
    /**
     * 个人第2奖励
     */
    public int[][] getReward5() {
        return reward5;
    }
    /**
     * 个人第3奖励
     */
    public int[][] getReward6() {
        return reward6;
    }
    /**
     * 个人第4-10奖励
     */
    public int[][] getReward7() {
        return reward7;
    }
    /**
     * BOSS秒伤百分比
	 * jingyu:
	 * 百分之X
     */
    public int getAp() {
        return ap;
    }
    /**
     * BOSS秒伤固定值
     */
    public int getP() {
        return p;
    }
    /**
     * 验证时间
	 * jingyu:
	 * 单位为秒
     */
    public int getTime() {
        return time;
    }
    public Struct_seven_223(int boss,int id,String con,int map,String joinreward,String killreward,String reward1,String reward2,String reward3,String reward4,String reward5,String reward6,String reward7,int ap,int p,int time) {
        this.boss = boss;
        this.id = id;
        this.con = ExcelJsonUtils.toObj(con,int[][].class);
        this.map = map;
        this.joinreward = ExcelJsonUtils.toObj(joinreward,int[][].class);
        this.killreward = ExcelJsonUtils.toObj(killreward,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
        this.reward3 = ExcelJsonUtils.toObj(reward3,int[][].class);
        this.reward4 = ExcelJsonUtils.toObj(reward4,int[][].class);
        this.reward5 = ExcelJsonUtils.toObj(reward5,int[][].class);
        this.reward6 = ExcelJsonUtils.toObj(reward6,int[][].class);
        this.reward7 = ExcelJsonUtils.toObj(reward7,int[][].class);
        this.ap = ap;
        this.p = p;
        this.time = time;
    }
}