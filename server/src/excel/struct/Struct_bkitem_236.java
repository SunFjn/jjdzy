package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * B_236_宝库商品表.xlsx
 */
public class Struct_bkitem_236 {
    /**id
	 * jingyu:
	 * 不允许插入，只可以按顺序往后新增*/
    private int id;
    /**宝库id*/
    private int bk;
    /**奖励道具*/
    private int[][] reward;
    /**消耗道具*/
    private int[][] consume;
    /**限购次数*/
    private int time;
    /**是否为新品
	 * jingyu:
	 * 0 不显示新品标识
	 * 1 显示新品标识*/
    private int xinpin;
    /**在周几打9折
	 * jingyu:
	 * 0：永不打折
	 * 1-7对应周一至周日当天打9折*/
    private int dazhe;
    /**在周几限时
	 * jingyu:
	 * 0：一直可兑换
	 * 1-7对应周一至周日当天可兑换*/
    private int xianshi;
    /**vip等级购买条件*/
    private int vip;
    /**位置*/
    private int px;
    /**
     * id
	 * jingyu:
	 * 不允许插入，只可以按顺序往后新增
     */
    public int getId() {
        return id;
    }
    /**
     * 宝库id
     */
    public int getBk() {
        return bk;
    }
    /**
     * 奖励道具
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 消耗道具
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 限购次数
     */
    public int getTime() {
        return time;
    }
    /**
     * 是否为新品
	 * jingyu:
	 * 0 不显示新品标识
	 * 1 显示新品标识
     */
    public int getXinpin() {
        return xinpin;
    }
    /**
     * 在周几打9折
	 * jingyu:
	 * 0：永不打折
	 * 1-7对应周一至周日当天打9折
     */
    public int getDazhe() {
        return dazhe;
    }
    /**
     * 在周几限时
	 * jingyu:
	 * 0：一直可兑换
	 * 1-7对应周一至周日当天可兑换
     */
    public int getXianshi() {
        return xianshi;
    }
    /**
     * vip等级购买条件
     */
    public int getVip() {
        return vip;
    }
    /**
     * 位置
     */
    public int getPx() {
        return px;
    }
    public Struct_bkitem_236(int id,int bk,String reward,String consume,int time,int xinpin,int dazhe,int xianshi,int vip,int px) {
        this.id = id;
        this.bk = bk;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.time = time;
        this.xinpin = xinpin;
        this.dazhe = dazhe;
        this.xianshi = xianshi;
        this.vip = vip;
        this.px = px;
    }
}