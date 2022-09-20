package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * N_200_NPC.xlsx
 */
public class Struct_NPC_200 {
    /**NPCID
	 * 20XXXX：关卡
	 * 21XXXX：铜雀台
	 * 221XXX：个人BOSS
	 * 222XXX：全民BOSS
	 * 223XXX：三国战神机器人
	 * 224XXX：乱世枭雄机器人
	 * 225XXX：南征北战机器人
	 * 226XXX：组队副本机器人
	 * 227XXX：全民boss机器人
	 * 231XXX：一骑普通
	 * 232XXX：一骑困难
	 * 233XXX：一骑噩梦
	 * 234XXX：一骑传说
	 * 240XXX：七擒孟获
	 * 241XXX：魔神吕布
	 * 242XXX：火烧赤壁
	 * 243XXX：曹操来袭
	 * 251XXX：过关普通
	 * 252XXX：过关困难
	 * 253XXX：过关噩梦
	 * 254XXX：过关传说
	 * 261XXX：血战到底
	 * 271XXX：组队BOSS
	 * 272XXX：升阶秘境BOSS
	 * 273XXX：问鼎天下怪物
	 * 274XXX：本服战场BOSS
	 * 275XXX：跨服战场BOSS
	 * 332XXX：异兽boss
	 * 333XXX：三英战吕布
	 * 37XXXX：攻城拔寨
	 * 
	 * 
	 * 
	 * 
	 * */
    private int ID;
    /**模型*/
    private int mod;
    /**头像*/
    private int head;
    /**类型
	 * 1.关卡小兵
	 * 2.关卡BOSS
	 * 3.一骑小兵
	 * 4.一骑BOSS
	 * 5.问鼎天下怪物
	 * 6.本服战场BOSS
	 * 7.跨服战场BOSS
	 * 8.王位争夺怪物
	 * 9.三国一统怪物
	 * 10.采集NPC
	 * 12.府邸建筑
	 * 13.府邸管家和家丁*/
    private int type;
    /**等级*/
    private int lv;
    /**技能
	 * [技能ID,初始技能等级]*/
    private int[][] skill;
    /**战力*/
    private long power;
    /**生命上限*/
    private long hp;
    /**攻击力*/
    private long att;
    /**防御*/
    private int def;
    /**武器
	 * 0.没有
	 * 1.有*/
    private int weapon;
    /**是否霸体
	 * 0.没霸体
	 * 1.有霸体*/
    private int bati;
    /**将衔等级（0,不显示）*/
    private int jx;
    /**是否攻击
	 * 
	 * 2.场景中不会攻击
	 * 3.场景中会攻击*/
    private int Gongji;
    /**
     * NPCID
	 * 20XXXX：关卡
	 * 21XXXX：铜雀台
	 * 221XXX：个人BOSS
	 * 222XXX：全民BOSS
	 * 223XXX：三国战神机器人
	 * 224XXX：乱世枭雄机器人
	 * 225XXX：南征北战机器人
	 * 226XXX：组队副本机器人
	 * 227XXX：全民boss机器人
	 * 231XXX：一骑普通
	 * 232XXX：一骑困难
	 * 233XXX：一骑噩梦
	 * 234XXX：一骑传说
	 * 240XXX：七擒孟获
	 * 241XXX：魔神吕布
	 * 242XXX：火烧赤壁
	 * 243XXX：曹操来袭
	 * 251XXX：过关普通
	 * 252XXX：过关困难
	 * 253XXX：过关噩梦
	 * 254XXX：过关传说
	 * 261XXX：血战到底
	 * 271XXX：组队BOSS
	 * 272XXX：升阶秘境BOSS
	 * 273XXX：问鼎天下怪物
	 * 274XXX：本服战场BOSS
	 * 275XXX：跨服战场BOSS
	 * 332XXX：异兽boss
	 * 333XXX：三英战吕布
	 * 37XXXX：攻城拔寨
	 * 
	 * 
	 * 
	 * 
	 * 
     */
    public int getID() {
        return ID;
    }
    /**
     * 模型
     */
    public int getMod() {
        return mod;
    }
    /**
     * 头像
     */
    public int getHead() {
        return head;
    }
    /**
     * 类型
	 * 1.关卡小兵
	 * 2.关卡BOSS
	 * 3.一骑小兵
	 * 4.一骑BOSS
	 * 5.问鼎天下怪物
	 * 6.本服战场BOSS
	 * 7.跨服战场BOSS
	 * 8.王位争夺怪物
	 * 9.三国一统怪物
	 * 10.采集NPC
	 * 12.府邸建筑
	 * 13.府邸管家和家丁
     */
    public int getType() {
        return type;
    }
    /**
     * 等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 技能
	 * [技能ID,初始技能等级]
     */
    public int[][] getSkill() {
        return skill;
    }
    /**
     * 战力
     */
    public long getPower() {
        return power;
    }
    /**
     * 生命上限
     */
    public long getHp() {
        return hp;
    }
    /**
     * 攻击力
     */
    public long getAtt() {
        return att;
    }
    /**
     * 防御
     */
    public int getDef() {
        return def;
    }
    /**
     * 武器
	 * 0.没有
	 * 1.有
     */
    public int getWeapon() {
        return weapon;
    }
    /**
     * 是否霸体
	 * 0.没霸体
	 * 1.有霸体
     */
    public int getBati() {
        return bati;
    }
    /**
     * 将衔等级（0,不显示）
     */
    public int getJx() {
        return jx;
    }
    /**
     * 是否攻击
	 * 
	 * 2.场景中不会攻击
	 * 3.场景中会攻击
     */
    public int getGongji() {
        return Gongji;
    }
    public Struct_NPC_200(int ID,int mod,int head,int type,int lv,String skill,long power,long hp,long att,int def,int weapon,int bati,int jx,int Gongji) {
        this.ID = ID;
        this.mod = mod;
        this.head = head;
        this.type = type;
        this.lv = lv;
        this.skill = ExcelJsonUtils.toObj(skill,int[][].class);
        this.power = power;
        this.hp = hp;
        this.att = att;
        this.def = def;
        this.weapon = weapon;
        this.bati = bati;
        this.jx = jx;
        this.Gongji = Gongji;
    }
}