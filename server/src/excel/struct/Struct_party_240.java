package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K_240_开服狂欢表.xlsx
 */
public class Struct_party_240 {
    /**配置id
	 * jingyu:
	 * 11XX：等级狂欢
	 * 
	 * 21XX：晋升狂欢
	 * 
	 * 31XX：宝物狂欢
	 * 32XX：装备狂欢
	 * 33XX：武将狂欢
	 * 34XX：战甲狂欢
	 * 35XX：图鉴狂欢
	 * 36XX：铜雀狂欢
	 * 37XX：战力狂欢
	 * 38XX：天书狂欢
	 * 39XX：将魂狂欢
	 * 
	 * 41XX：元宝狂欢
	 * 
	 * 51XX：神将狂欢-武将激活
	 * 52XX：神将狂欢-武将星级*/
    private int id;
    /**持续时间(第X天,第X天）*/
    private int[][] time;
    /**目标类型
	 * jingyu:
	 * 1.玩家等级
	 * 2.晋升积分
	 * 3.宝物总战力
	 * 4.装备总战力
	 * 5.武将总战力
	 * 6.战甲总战力
	 * 7.图鉴总战力
	 * 8.铜雀台通关层数
	 * 9.玩家总战力
	 * 10.元宝消耗
	 * 11.天书总战力
	 * 12.将魂总战力
	 * 13.神剑总战力
	 * 14.异宝总战力
	 * 15：神将收集*/
    private int type;
    /**目标要求
	 * Windows 用户:
	 * 
	 * [[参数1,参数2]]
	 * 
	 * 神将狂欢的参数：
	 * 参数1：品质
	 * 参数2：具体值（武将个数/星级）*/
    private int[][] yq;
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
    /**限量奖励
	 * Windows 用户:
	 * 0：没有限量奖励
	 * */
    private int[][] xl;
    /**限量奖励数量*/
    private int sl;
    /**活动开启*/
    private int[][] open;
    /**监控ID*/
    private int jiankong;
    /**
     * 配置id
	 * jingyu:
	 * 11XX：等级狂欢
	 * 
	 * 21XX：晋升狂欢
	 * 
	 * 31XX：宝物狂欢
	 * 32XX：装备狂欢
	 * 33XX：武将狂欢
	 * 34XX：战甲狂欢
	 * 35XX：图鉴狂欢
	 * 36XX：铜雀狂欢
	 * 37XX：战力狂欢
	 * 38XX：天书狂欢
	 * 39XX：将魂狂欢
	 * 
	 * 41XX：元宝狂欢
	 * 
	 * 51XX：神将狂欢-武将激活
	 * 52XX：神将狂欢-武将星级
     */
    public int getId() {
        return id;
    }
    /**
     * 持续时间(第X天,第X天）
     */
    public int[][] getTime() {
        return time;
    }
    /**
     * 目标类型
	 * jingyu:
	 * 1.玩家等级
	 * 2.晋升积分
	 * 3.宝物总战力
	 * 4.装备总战力
	 * 5.武将总战力
	 * 6.战甲总战力
	 * 7.图鉴总战力
	 * 8.铜雀台通关层数
	 * 9.玩家总战力
	 * 10.元宝消耗
	 * 11.天书总战力
	 * 12.将魂总战力
	 * 13.神剑总战力
	 * 14.异宝总战力
	 * 15：神将收集
     */
    public int getType() {
        return type;
    }
    /**
     * 目标要求
	 * Windows 用户:
	 * 
	 * [[参数1,参数2]]
	 * 
	 * 神将狂欢的参数：
	 * 参数1：品质
	 * 参数2：具体值（武将个数/星级）
     */
    public int[][] getYq() {
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
     * 限量奖励
	 * Windows 用户:
	 * 0：没有限量奖励
	 * 
     */
    public int[][] getXl() {
        return xl;
    }
    /**
     * 限量奖励数量
     */
    public int getSl() {
        return sl;
    }
    /**
     * 活动开启
     */
    public int[][] getOpen() {
        return open;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_party_240(int id,String time,int type,String yq,String reward,String xl,int sl,String open,int jiankong) {
        this.id = id;
        this.time = ExcelJsonUtils.toObj(time,int[][].class);
        this.type = type;
        this.yq = ExcelJsonUtils.toObj(yq,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.xl = ExcelJsonUtils.toObj(xl,int[][].class);
        this.sl = sl;
        this.open = ExcelJsonUtils.toObj(open,int[][].class);
        this.jiankong = jiankong;
    }
}