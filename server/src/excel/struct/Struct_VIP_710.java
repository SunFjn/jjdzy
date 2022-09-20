package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * V_710_VIP.xlsx
 */
public class Struct_VIP_710 {
    /**序号*/
    private int ID;
    /**等级*/
    private int LV;
    /**额度
	 * 该额度为RMB*/
    private int MONEY;
    /**奖励*/
    private int[][] AWARD;
    /**最高显示VIP等级*/
    private int MAXVIP;
    /**装备背包容量
	 * jingyu:
	 * 界面显示形式为：
	 * 
	 * 装备背包容量+xx*/
    private int BAG;
    /**开启一键扫荡材料副本
	 * jingyu:
	 * 0关闭，1开启*/
    private int SAODANGFUBEN;
    /**开启三国战神扫荡功能
	 * jingyu:
	 * 0关闭1开启*/
    private int SAODANGJJC;
    /**聊天发言无限制
	 * jingyu:
	 * 0有限制，1无限制*/
    private int LIAOTIAN;
    /**关卡扫荡购买次数上限
	 * jingyu:
	 * 界面显示形式为
	 * 
	 * 关卡扫荡购买次数上限+xx*/
    private int SAODANGGUAQIA;
    /**开启南征北战扫荡功能
	 * jingyu:
	 * 0关闭1开启*/
    private int SAODANGPK;
    /**升星成功率
	 * jingyu:
	 * 界面显示形式为
	 * 
	 * 升星成功率+X%*/
    private int STAR;
    /**三国战神挑战购买次数上限
	 * jingyu:
	 * 界面显示形式为
	 * 
	 * 竞技场挑战购买次数上限+xx*/
    private int JJCBUYNUM;
    /**乱世枭雄购买次数上限
	 * jingyu:
	 * 界面显示形式为
	 * 
	 * 乱世枭雄购买次数上限+xx*/
    private int LSXX;
    /**可享受VIP以下的所有特权
	 * jingyu:
	 * 最终显示形式
	 * 可享受VIPx以下的所有特权*/
    private int TQ;
    /**监控ID*/
    private int jiankong;
    /**vip礼包*/
    private int[][] viplb;
    /**vip礼包价格
	 * jingyu:
	 * 元宝*/
    private int lbjg;
    /**群雄逐鹿体力vip加成*/
    private int tl;
    /**群雄逐鹿体力购买次数vip加成*/
    private int cs;
    /**跨服王者购买次数上限
	 * jingyu:
	 * 界面显示形式为
	 * 
	 * 乱世枭雄购买次数上限+xx*/
    private int kfwz;
    /**
     * 序号
     */
    public int getID() {
        return ID;
    }
    /**
     * 等级
     */
    public int getLV() {
        return LV;
    }
    /**
     * 额度
	 * 该额度为RMB
     */
    public int getMONEY() {
        return MONEY;
    }
    /**
     * 奖励
     */
    public int[][] getAWARD() {
        return AWARD;
    }
    /**
     * 最高显示VIP等级
     */
    public int getMAXVIP() {
        return MAXVIP;
    }
    /**
     * 装备背包容量
	 * jingyu:
	 * 界面显示形式为：
	 * 
	 * 装备背包容量+xx
     */
    public int getBAG() {
        return BAG;
    }
    /**
     * 开启一键扫荡材料副本
	 * jingyu:
	 * 0关闭，1开启
     */
    public int getSAODANGFUBEN() {
        return SAODANGFUBEN;
    }
    /**
     * 开启三国战神扫荡功能
	 * jingyu:
	 * 0关闭1开启
     */
    public int getSAODANGJJC() {
        return SAODANGJJC;
    }
    /**
     * 聊天发言无限制
	 * jingyu:
	 * 0有限制，1无限制
     */
    public int getLIAOTIAN() {
        return LIAOTIAN;
    }
    /**
     * 关卡扫荡购买次数上限
	 * jingyu:
	 * 界面显示形式为
	 * 
	 * 关卡扫荡购买次数上限+xx
     */
    public int getSAODANGGUAQIA() {
        return SAODANGGUAQIA;
    }
    /**
     * 开启南征北战扫荡功能
	 * jingyu:
	 * 0关闭1开启
     */
    public int getSAODANGPK() {
        return SAODANGPK;
    }
    /**
     * 升星成功率
	 * jingyu:
	 * 界面显示形式为
	 * 
	 * 升星成功率+X%
     */
    public int getSTAR() {
        return STAR;
    }
    /**
     * 三国战神挑战购买次数上限
	 * jingyu:
	 * 界面显示形式为
	 * 
	 * 竞技场挑战购买次数上限+xx
     */
    public int getJJCBUYNUM() {
        return JJCBUYNUM;
    }
    /**
     * 乱世枭雄购买次数上限
	 * jingyu:
	 * 界面显示形式为
	 * 
	 * 乱世枭雄购买次数上限+xx
     */
    public int getLSXX() {
        return LSXX;
    }
    /**
     * 可享受VIP以下的所有特权
	 * jingyu:
	 * 最终显示形式
	 * 可享受VIPx以下的所有特权
     */
    public int getTQ() {
        return TQ;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    /**
     * vip礼包
     */
    public int[][] getViplb() {
        return viplb;
    }
    /**
     * vip礼包价格
	 * jingyu:
	 * 元宝
     */
    public int getLbjg() {
        return lbjg;
    }
    /**
     * 群雄逐鹿体力vip加成
     */
    public int getTl() {
        return tl;
    }
    /**
     * 群雄逐鹿体力购买次数vip加成
     */
    public int getCs() {
        return cs;
    }
    /**
     * 跨服王者购买次数上限
	 * jingyu:
	 * 界面显示形式为
	 * 
	 * 乱世枭雄购买次数上限+xx
     */
    public int getKfwz() {
        return kfwz;
    }
    public Struct_VIP_710(int ID,int LV,int MONEY,String AWARD,int MAXVIP,int BAG,int SAODANGFUBEN,int SAODANGJJC,int LIAOTIAN,int SAODANGGUAQIA,int SAODANGPK,int STAR,int JJCBUYNUM,int LSXX,int TQ,int jiankong,String viplb,int lbjg,int tl,int cs,int kfwz) {
        this.ID = ID;
        this.LV = LV;
        this.MONEY = MONEY;
        this.AWARD = ExcelJsonUtils.toObj(AWARD,int[][].class);
        this.MAXVIP = MAXVIP;
        this.BAG = BAG;
        this.SAODANGFUBEN = SAODANGFUBEN;
        this.SAODANGJJC = SAODANGJJC;
        this.LIAOTIAN = LIAOTIAN;
        this.SAODANGGUAQIA = SAODANGGUAQIA;
        this.SAODANGPK = SAODANGPK;
        this.STAR = STAR;
        this.JJCBUYNUM = JJCBUYNUM;
        this.LSXX = LSXX;
        this.TQ = TQ;
        this.jiankong = jiankong;
        this.viplb = ExcelJsonUtils.toObj(viplb,int[][].class);
        this.lbjg = lbjg;
        this.tl = tl;
        this.cs = cs;
        this.kfwz = kfwz;
    }
}