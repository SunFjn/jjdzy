package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_241_全民狂欢-单刀赴会表.xlsx
 */
public class Struct_allpartyddfh_241 {
    /**id*/
    private int id;
    /**要求（挑战次数）*/
    private int yq;
    /**奖励
	 * jingyu:
	 * [[A,B,C,D,E]]
	 * A=道具类型
	 * B=道具id
	 * C=道具数量
	 * D=概率
	 * E=是否公告   0不公告  1公告
	 * 
	 * */
    private int[][] reward;
    /**前往界面*/
    private int UI;
    /**监控ID*/
    private int jiankong;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 要求（挑战次数）
     */
    public int getYq() {
        return yq;
    }
    /**
     * 奖励
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
    public int[][] getReward() {
        return reward;
    }
    /**
     * 前往界面
     */
    public int getUI() {
        return UI;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_allpartyddfh_241(int id,int yq,String reward,int UI,int jiankong) {
        this.id = id;
        this.yq = yq;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.UI = UI;
        this.jiankong = jiankong;
    }
}