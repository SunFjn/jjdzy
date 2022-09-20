package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_239_玲珑阁表.xlsx
 */
public class Struct_llg_239 {
    /**配置id
	 * jingyu:
	 * 1X：开服7天id
	 * 2X：8天后id*/
    private int id;
    /**星期几
	 * jingyu:
	 * 0：不受星期影响
	 * 1-7：对应周一至周日*/
    private int week;
    /**普通奖励
	 * jingyu:
	 * [[A,B,C,D,E]]
	 * A=道具类型
	 * B=道具id
	 * C=道具数量
	 * D=概率
	 * E=是否公告   0不公告  1公告
	 * 
	 * */
    private String reward1;
    /**高级奖池*/
    private String reward2;
    /**必中奖品配置
	 * jingyu:
	 * 按顺序依次显示，大奖标识固定*/
    private int[][] bizhong;
    /**
     * 配置id
	 * jingyu:
	 * 1X：开服7天id
	 * 2X：8天后id
     */
    public int getId() {
        return id;
    }
    /**
     * 星期几
	 * jingyu:
	 * 0：不受星期影响
	 * 1-7：对应周一至周日
     */
    public int getWeek() {
        return week;
    }
    /**
     * 普通奖励
	 * jingyu:
	 * [[A,B,C,D,E]]
	 * A=道具类型
	 * B=道具id
	 * C=道具数量
	 * D=概率
	 * E=是否公告   0不公告  1公告
	 * 
	 * 
     */
    public String getReward1() {
        return reward1;
    }
    /**
     * 高级奖池
     */
    public String getReward2() {
        return reward2;
    }
    /**
     * 必中奖品配置
	 * jingyu:
	 * 按顺序依次显示，大奖标识固定
     */
    public int[][] getBizhong() {
        return bizhong;
    }
    public Struct_llg_239(int id,int week,String reward1,String reward2,String bizhong) {
        this.id = id;
        this.week = week;
        this.reward1 = reward1;
        this.reward2 = reward2;
        this.bizhong = ExcelJsonUtils.toObj(bizhong,int[][].class);
    }
}