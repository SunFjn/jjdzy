package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * H_286_合服狂欢_大神送礼表.xlsx
 */
public class Struct_hfkhgod_286 {
    /**id
	 * jingyu:
	 * 1XX
	 * 参数1：达标VIP等级
	 * 参数2：达标人数
	 * 十位数为档次
	 * 
	 * 2XX
	 * 参数1：达标VIP等级
	 * 参数2：无
	 * 十位数为档次*/
    private int id;
    /**是否是档次*/
    private int dc;
    /**领取参数1*/
    private int cs1;
    /**领取参数2*/
    private int cs2;
    /**奖励*/
    private int[][] reward;
    /**VIP额外领取条件*/
    private int tj1;
    /**充值额外领取条件*/
    private int tj2;
    /**
     * id
	 * jingyu:
	 * 1XX
	 * 参数1：达标VIP等级
	 * 参数2：达标人数
	 * 十位数为档次
	 * 
	 * 2XX
	 * 参数1：达标VIP等级
	 * 参数2：无
	 * 十位数为档次
     */
    public int getId() {
        return id;
    }
    /**
     * 是否是档次
     */
    public int getDc() {
        return dc;
    }
    /**
     * 领取参数1
     */
    public int getCs1() {
        return cs1;
    }
    /**
     * 领取参数2
     */
    public int getCs2() {
        return cs2;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * VIP额外领取条件
     */
    public int getTj1() {
        return tj1;
    }
    /**
     * 充值额外领取条件
     */
    public int getTj2() {
        return tj2;
    }
    public Struct_hfkhgod_286(int id,int dc,int cs1,int cs2,String reward,int tj1,int tj2) {
        this.id = id;
        this.dc = dc;
        this.cs1 = cs1;
        this.cs2 = cs2;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.tj1 = tj1;
        this.tj2 = tj2;
    }
}