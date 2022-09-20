package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_299_新活动-年兽闹喜表.xlsx
 */
public class Struct_nian_299 {
    /**年兽id*/
    private int id;
    /**血量*/
    private int hp;
    /**奖励*/
    private int[][] reward;
    /**时间开启耗时（秒）*/
    private int time;
    /**开启元宝消耗*/
    private int[][] consume;
    /**开启时间*/
    private String open;
    /**结束时间*/
    private String end;
    /**积分*/
    private int point;
    /**原画
	 * 在pic处
	 * */
    private String pic;
    /**
     * 年兽id
     */
    public int getId() {
        return id;
    }
    /**
     * 血量
     */
    public int getHp() {
        return hp;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 时间开启耗时（秒）
     */
    public int getTime() {
        return time;
    }
    /**
     * 开启元宝消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 开启时间
     */
    public String getOpen() {
        return open;
    }
    /**
     * 结束时间
     */
    public String getEnd() {
        return end;
    }
    /**
     * 积分
     */
    public int getPoint() {
        return point;
    }
    /**
     * 原画
	 * 在pic处
	 * 
     */
    public String getPic() {
        return pic;
    }
    public Struct_nian_299(int id,int hp,String reward,int time,String consume,String open,String end,int point,String pic) {
        this.id = id;
        this.hp = hp;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.time = time;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.open = open;
        this.end = end;
        this.point = point;
        this.pic = pic;
    }
}