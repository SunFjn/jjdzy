package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-261-三国庆典-豪礼转盘表.xlsx
 */
public class Struct_sghlzp_261 {
    /**索引id*/
    private int id;
    /**活动期数*/
    private int qs;
    /**普通奖励
	 * [[A,B,C,D,E]]
	 * A=道具类型
	 * B=道具id
	 * C=道具数量
	 * D=概率
	 * E=是否公告   0不公告  1公告
	 * 
	 * */
    private String reward;
    /**必中奖品配置*/
    private int[][] reward1;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 活动期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 普通奖励
	 * [[A,B,C,D,E]]
	 * A=道具类型
	 * B=道具id
	 * C=道具数量
	 * D=概率
	 * E=是否公告   0不公告  1公告
	 * 
	 * 
     */
    public String getReward() {
        return reward;
    }
    /**
     * 必中奖品配置
     */
    public int[][] getReward1() {
        return reward1;
    }
    public Struct_sghlzp_261(int id,int qs,String reward,String reward1) {
        this.id = id;
        this.qs = qs;
        this.reward = reward;
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
    }
}