package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_204_道具系统.xlsx
 */
public class Struct_daoju_204 {
    /**道具id
	 * 备注:
	 * 新增道具，ID按顺序从后面顺延递增
	 * 40XXXX：礼包类道具
	 * 
	 * 410XXX：普通道具
	 *  411XXX：培养丹
	 *  412XXX：属性丹，资质丹 
	 *  413XXX：图鉴
	 *  414XXX：技能书
	 * 
	 * 42XXXX：宝石道具（宝石表）
	 *  421XXX：青木
	 *  422XXX：碧水
	 *  423XXX：朱焰
	 *  424XXX：紫雷
	 * 
	 * 430XXX：神兵
	 *   431XXX：宝物
	 *     4312XX：绿品  4313XX：紫品  4314XX：橙品  4315XX：红品  
	 *   432XXX：天书
	 *   433XXX：兵法
	 *   434XXX：异宝
	 * 
	 * 440XXX：武将
	 *  441XXX：战甲
	 *  
	 * 450XXX：头像
	 * 451XXX：头像框
	 * 
	 * 460XXX：称号*/
    private int id;
    /**icon*/
    private int icon;
    /**等级
	 * 达到对应等级才能使用*/
    private int level;
    /**名字
	 * 微端3*/
    private String name;
    /**品质
	 * 1：白
	 * 2、绿
	 * 3、蓝
	 * 4、紫
	 * 5、橙
	 * 6、红*/
    private int quality;
    /**道具类型
	 * 不同道具类型不同
	 * 1：材料
	 * 2：随机获得物品礼包
	 * 3：多选一礼包
	 * 4：青木宝石
	 * 5：碧水宝石
	 * 6：朱焰宝石
	 * 7：紫雷宝石
	 * 8：装备
	 * 9：神装
	 * 10：将印
	 * 11：图鉴卡
	 * 12：头像
	 * 13：头像框
	 * 14：称号
	 * 15：兽灵
	 * 16：全民BOSS挑战令
	 * 17：测试用充值道具
	 * 18：碎片
	 * 19：升级丹
	 * 20：一骑当千挑战令
	 * 21：时装
	 * 22：随机符文礼包
	 * 23：演武令
	 * 24：虎牢关挑战令
	 * 25：异兽boss挑战令
	 * 26：三英战吕布挑战令
	 * 27：乱世枭雄挑战令
	 * 28：三国战神挑战令
	 * 29：返利点，获得后立即使用掉
	 * 30：国家boss挑战令
	 * 31：组队副本挑战令
	 * 32：七擒孟获挑战令
	 * 33：单刀赴会挑战令
	 * 34：跨服王者挑战券
	 * 35：年兽闹春鞭炮数量
	 * 36：许田围猎挑战令
	 * 37：攻城拔寨重置令
	 * 38：随机印记宝箱
	 * 39：轮回副本挑战令
	 * 40：轮回副本协助令
	 * 41：侍女卡
	 * 42：登峰挑战令
	 * 43：天工造物令
	 * 
	 * 94：开出技能宝物
	 * 95：开出宝物点
	 * 96: 获得称号
	 * 97：改名道具
	 * 99：军团改名卡
	 * 100:VIP经验
	 * */
    private int leixing;
    /**操作方式
	 * 0：不可直接在背包使用
	 * 1：直接在背包内使用
	 * 2: 直接在背包内使用,使用后可以跳转对应界面,具体界面ID读-[D_204_道具系统.xlsx]-跳转界面*/
    private int fangshi;
    /**跳转界面
	 * 0:不跳转
	 * xxxx:如3103,则根据[X_001_系统开启表.xlsx]-界面ID跳转到武将-升星界面*/
    private int[][] tiaozhuan;
    /**使用效果
	 * 对应特定系统的索引字段*/
    private String use;
    /**道具奖励
	 * 随机礼包：
	 * [[A,B,C,D,E]]
	 * A：分组
	 * B：道具类型
	 * C：道具id
	 * D：奖励数量
	 * E：概率
	 * 
	 * 多选一礼包：
	 * [[A,B,C,D]]
	 * A：分组
	 * B：道具类型
	 * C：道具id
	 * D：奖励数量*/
    private int[][] reward;
    /**道具排序*/
    private int paixu;
    /**系统id*/
    private int sys;
    /**报警数量*/
    private int bj;
    /**广播奖励
	 * 针对道具类型为2才生效
	 * 0：不广播
	 * 1：广播
	 * 
	 * 暂不生效。使用广播奖励2字段*/
    private int gb;
    /**广播奖励2
	 * 0不广播
	 * [[A],[B]]
	 * 如果物品开出A或者B，则同跨服组广播
	 * */
    private int[][] gb2;
    /**天工积分*/
    private int tgjf;
    /**
     * 道具id
	 * 备注:
	 * 新增道具，ID按顺序从后面顺延递增
	 * 40XXXX：礼包类道具
	 * 
	 * 410XXX：普通道具
	 *  411XXX：培养丹
	 *  412XXX：属性丹，资质丹 
	 *  413XXX：图鉴
	 *  414XXX：技能书
	 * 
	 * 42XXXX：宝石道具（宝石表）
	 *  421XXX：青木
	 *  422XXX：碧水
	 *  423XXX：朱焰
	 *  424XXX：紫雷
	 * 
	 * 430XXX：神兵
	 *   431XXX：宝物
	 *     4312XX：绿品  4313XX：紫品  4314XX：橙品  4315XX：红品  
	 *   432XXX：天书
	 *   433XXX：兵法
	 *   434XXX：异宝
	 * 
	 * 440XXX：武将
	 *  441XXX：战甲
	 *  
	 * 450XXX：头像
	 * 451XXX：头像框
	 * 
	 * 460XXX：称号
     */
    public int getId() {
        return id;
    }
    /**
     * icon
     */
    public int getIcon() {
        return icon;
    }
    /**
     * 等级
	 * 达到对应等级才能使用
     */
    public int getLevel() {
        return level;
    }
    /**
     * 名字
	 * 微端3
     */
    public String getName() {
        return name;
    }
    /**
     * 品质
	 * 1：白
	 * 2、绿
	 * 3、蓝
	 * 4、紫
	 * 5、橙
	 * 6、红
     */
    public int getQuality() {
        return quality;
    }
    /**
     * 道具类型
	 * 不同道具类型不同
	 * 1：材料
	 * 2：随机获得物品礼包
	 * 3：多选一礼包
	 * 4：青木宝石
	 * 5：碧水宝石
	 * 6：朱焰宝石
	 * 7：紫雷宝石
	 * 8：装备
	 * 9：神装
	 * 10：将印
	 * 11：图鉴卡
	 * 12：头像
	 * 13：头像框
	 * 14：称号
	 * 15：兽灵
	 * 16：全民BOSS挑战令
	 * 17：测试用充值道具
	 * 18：碎片
	 * 19：升级丹
	 * 20：一骑当千挑战令
	 * 21：时装
	 * 22：随机符文礼包
	 * 23：演武令
	 * 24：虎牢关挑战令
	 * 25：异兽boss挑战令
	 * 26：三英战吕布挑战令
	 * 27：乱世枭雄挑战令
	 * 28：三国战神挑战令
	 * 29：返利点，获得后立即使用掉
	 * 30：国家boss挑战令
	 * 31：组队副本挑战令
	 * 32：七擒孟获挑战令
	 * 33：单刀赴会挑战令
	 * 34：跨服王者挑战券
	 * 35：年兽闹春鞭炮数量
	 * 36：许田围猎挑战令
	 * 37：攻城拔寨重置令
	 * 38：随机印记宝箱
	 * 39：轮回副本挑战令
	 * 40：轮回副本协助令
	 * 41：侍女卡
	 * 42：登峰挑战令
	 * 43：天工造物令
	 * 
	 * 94：开出技能宝物
	 * 95：开出宝物点
	 * 96: 获得称号
	 * 97：改名道具
	 * 99：军团改名卡
	 * 100:VIP经验
	 * 
     */
    public int getLeixing() {
        return leixing;
    }
    /**
     * 操作方式
	 * 0：不可直接在背包使用
	 * 1：直接在背包内使用
	 * 2: 直接在背包内使用,使用后可以跳转对应界面,具体界面ID读-[D_204_道具系统.xlsx]-跳转界面
     */
    public int getFangshi() {
        return fangshi;
    }
    /**
     * 跳转界面
	 * 0:不跳转
	 * xxxx:如3103,则根据[X_001_系统开启表.xlsx]-界面ID跳转到武将-升星界面
     */
    public int[][] getTiaozhuan() {
        return tiaozhuan;
    }
    /**
     * 使用效果
	 * 对应特定系统的索引字段
     */
    public String getUse() {
        return use;
    }
    /**
     * 道具奖励
	 * 随机礼包：
	 * [[A,B,C,D,E]]
	 * A：分组
	 * B：道具类型
	 * C：道具id
	 * D：奖励数量
	 * E：概率
	 * 
	 * 多选一礼包：
	 * [[A,B,C,D]]
	 * A：分组
	 * B：道具类型
	 * C：道具id
	 * D：奖励数量
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 道具排序
     */
    public int getPaixu() {
        return paixu;
    }
    /**
     * 系统id
     */
    public int getSys() {
        return sys;
    }
    /**
     * 报警数量
     */
    public int getBj() {
        return bj;
    }
    /**
     * 广播奖励
	 * 针对道具类型为2才生效
	 * 0：不广播
	 * 1：广播
	 * 
	 * 暂不生效。使用广播奖励2字段
     */
    public int getGb() {
        return gb;
    }
    /**
     * 广播奖励2
	 * 0不广播
	 * [[A],[B]]
	 * 如果物品开出A或者B，则同跨服组广播
	 * 
     */
    public int[][] getGb2() {
        return gb2;
    }
    /**
     * 天工积分
     */
    public int getTgjf() {
        return tgjf;
    }
    public Struct_daoju_204(int id,int icon,int level,String name,int quality,int leixing,int fangshi,String tiaozhuan,String use,String reward,int paixu,int sys,int bj,int gb,String gb2,int tgjf) {
        this.id = id;
        this.icon = icon;
        this.level = level;
        this.name = name;
        this.quality = quality;
        this.leixing = leixing;
        this.fangshi = fangshi;
        this.tiaozhuan = ExcelJsonUtils.toObj(tiaozhuan,int[][].class);
        this.use = use;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.paixu = paixu;
        this.sys = sys;
        this.bj = bj;
        this.gb = gb;
        this.gb2 = ExcelJsonUtils.toObj(gb2,int[][].class);
        this.tgjf = tgjf;
    }
}