package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
import java.util.Map;
/**
 * J_210_技能.xlsx
 */
public class Struct_skill_210 {
    /**id
	 * jingyu:
	 * 武将（包括能变身的）的技能ID尾数必须从5开始，
	 * 固定3个技能
	 * 神技能尾数固定为8*/
    private int id;
    /**技能名称*/
    private String n;
    /**技能描述(skillDes)
	 * jingyu:
	 * 
	 * 
	 * 
	 * ap=基础伤害百分比+等级*伤害百分比成长
	 * 
	 * p=基础威力+等级*威力成长*/
    private String des;
    /**职业
	 * jingyu:
	 * 职业id=武将id
	 * 0=通用*/
    private int job;
    /**技能类型
	 * jingyu:
	 * 1.普攻
	 * 2.技能
	 * 3.怒气技能
	 * 4.宝物技能
	 * 5.天书技能
	 * 6.冲刺
	 * 7.羁绊技能
	 * 8.少主技能
	 * 9.神将天赋技能
	 * 10.奇策爆气*/
    private int type;
    /**多段普攻
	 * jingyu:
	 * 非普攻，非多段则填0
	 * X段则填X
	 * */
    private int duoduan;
    /**被动属性*/
    private int[][] attr;
    /**被动属性成长*/
    private int[][] attrg;
    /**基础伤害百分比*/
    private int attp;
    /**伤害百分比成长*/
    private int attpg;
    /**基础威力(basePower)*/
    private int bp;
    /**威力成长(powerGrowup)*/
    private int pg;
    /**技能效果类型（后端用）
	 * jingyu:
	 * 0.伤害类效果
	 * 1.回复自身气血上限XX%的气血
	 * 2.无敌XX秒*/
    private int hdxg;
    /**对应宝物（后端用）*/
    private int dybw;
    /**基础战力*/
    private int zlp;
    /**成长战力*/
    private int zlg;
    /**技能样式(style)
	 * jingyu:
	 * */
    private int s;
    /**buff触发
	 * jingyu:
	 * [概率，BUFF的ID]]
	 * 
	 * 概率=X/100000*/
    private int[][] buff;
    /**技能动作参数(arguments)
	 * Windows 用户:
	 * 怪物因动作原因打断、位移处于劣势，原则上需加50%伤害，目前撇除概率问题，现加上30%纯伤害，估算防御即：
	 * 系数0.768=0.868*(1+0.3)*/
    private Map<Object,Object> a;
    /**AI参数*/
    private Map<Object,Object> ai;
    /**冷却时间(秒)*/
    private int cd;
    /**进场冷却时间(秒)*/
    private int cd0;
    /**释放优先级(priority)*/
    private int p;
    /**技能图标*/
    private int icon;
    /**受击特效
	 * 备注:
	 * 特效ID*/
    private int heff;
    /**受击状态
	 * jingyu:
	 * 1.火
	 * 2.冰
	 * 3.雷电
	 * 4.爆炸
	 * 5.毒
	 * 
	 * 0表示无技能特殊受击*/
    private int hit;
    /**
     * id
	 * jingyu:
	 * 武将（包括能变身的）的技能ID尾数必须从5开始，
	 * 固定3个技能
	 * 神技能尾数固定为8
     */
    public int getId() {
        return id;
    }
    /**
     * 技能名称
     */
    public String getN() {
        return n;
    }
    /**
     * 技能描述(skillDes)
	 * jingyu:
	 * 
	 * 
	 * 
	 * ap=基础伤害百分比+等级*伤害百分比成长
	 * 
	 * p=基础威力+等级*威力成长
     */
    public String getDes() {
        return des;
    }
    /**
     * 职业
	 * jingyu:
	 * 职业id=武将id
	 * 0=通用
     */
    public int getJob() {
        return job;
    }
    /**
     * 技能类型
	 * jingyu:
	 * 1.普攻
	 * 2.技能
	 * 3.怒气技能
	 * 4.宝物技能
	 * 5.天书技能
	 * 6.冲刺
	 * 7.羁绊技能
	 * 8.少主技能
	 * 9.神将天赋技能
	 * 10.奇策爆气
     */
    public int getType() {
        return type;
    }
    /**
     * 多段普攻
	 * jingyu:
	 * 非普攻，非多段则填0
	 * X段则填X
	 * 
     */
    public int getDuoduan() {
        return duoduan;
    }
    /**
     * 被动属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 被动属性成长
     */
    public int[][] getAttrg() {
        return attrg;
    }
    /**
     * 基础伤害百分比
     */
    public int getAttp() {
        return attp;
    }
    /**
     * 伤害百分比成长
     */
    public int getAttpg() {
        return attpg;
    }
    /**
     * 基础威力(basePower)
     */
    public int getBp() {
        return bp;
    }
    /**
     * 威力成长(powerGrowup)
     */
    public int getPg() {
        return pg;
    }
    /**
     * 技能效果类型（后端用）
	 * jingyu:
	 * 0.伤害类效果
	 * 1.回复自身气血上限XX%的气血
	 * 2.无敌XX秒
     */
    public int getHdxg() {
        return hdxg;
    }
    /**
     * 对应宝物（后端用）
     */
    public int getDybw() {
        return dybw;
    }
    /**
     * 基础战力
     */
    public int getZlp() {
        return zlp;
    }
    /**
     * 成长战力
     */
    public int getZlg() {
        return zlg;
    }
    /**
     * 技能样式(style)
	 * jingyu:
	 * 
     */
    public int getS() {
        return s;
    }
    /**
     * buff触发
	 * jingyu:
	 * [概率，BUFF的ID]]
	 * 
	 * 概率=X/100000
     */
    public int[][] getBuff() {
        return buff;
    }
    /**
     * 技能动作参数(arguments)
	 * Windows 用户:
	 * 怪物因动作原因打断、位移处于劣势，原则上需加50%伤害，目前撇除概率问题，现加上30%纯伤害，估算防御即：
	 * 系数0.768=0.868*(1+0.3)
     */
    public Map<Object,Object> getA() {
        return a;
    }
    /**
     * AI参数
     */
    public Map<Object,Object> getAi() {
        return ai;
    }
    /**
     * 冷却时间(秒)
     */
    public int getCd() {
        return cd;
    }
    /**
     * 进场冷却时间(秒)
     */
    public int getCd0() {
        return cd0;
    }
    /**
     * 释放优先级(priority)
     */
    public int getP() {
        return p;
    }
    /**
     * 技能图标
     */
    public int getIcon() {
        return icon;
    }
    /**
     * 受击特效
	 * 备注:
	 * 特效ID
     */
    public int getHeff() {
        return heff;
    }
    /**
     * 受击状态
	 * jingyu:
	 * 1.火
	 * 2.冰
	 * 3.雷电
	 * 4.爆炸
	 * 5.毒
	 * 
	 * 0表示无技能特殊受击
     */
    public int getHit() {
        return hit;
    }
    @SuppressWarnings("unchecked")
    public Struct_skill_210(int id,String n,String des,int job,int type,int duoduan,String attr,String attrg,int attp,int attpg,int bp,int pg,int hdxg,int dybw,int zlp,int zlg,int s,String buff,String a,String ai,int cd,int cd0,int p,int icon,int heff,int hit) {
        this.id = id;
        this.n = n;
        this.des = des;
        this.job = job;
        this.type = type;
        this.duoduan = duoduan;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.attrg = ExcelJsonUtils.toObj(attrg,int[][].class);
        this.attp = attp;
        this.attpg = attpg;
        this.bp = bp;
        this.pg = pg;
        this.hdxg = hdxg;
        this.dybw = dybw;
        this.zlp = zlp;
        this.zlg = zlg;
        this.s = s;
        this.buff = ExcelJsonUtils.toObj(buff,int[][].class);
        this.a = ExcelJsonUtils.toObj(a,Map.class);
        this.ai = ExcelJsonUtils.toObj(ai,Map.class);
        this.cd = cd;
        this.cd0 = cd0;
        this.p = p;
        this.icon = icon;
        this.heff = heff;
        this.hit = hit;
    }
}