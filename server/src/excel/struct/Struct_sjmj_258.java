package excel.struct;
/**
 * S_258_升阶秘境表.xlsx
 */
public class Struct_sjmj_258 {
    /**id
	 * 1XXX：武将秘境
	 * 2XXX：战甲秘境
	 * 3XXX：宝物秘境
	 * 4XXX：天书秘境
	 * 5XXX：神剑秘境
	 * 6XXX：异宝秘境
	 * 7XXX：兵法秘境*/
    private int id;
    /**开启等级
	 * [[A,B]]
	 * A=通关关卡
	 * B=对应系统升阶等级*/
    private int lv;
    /**排序*/
    private int px;
    /**
     * id
	 * 1XXX：武将秘境
	 * 2XXX：战甲秘境
	 * 3XXX：宝物秘境
	 * 4XXX：天书秘境
	 * 5XXX：神剑秘境
	 * 6XXX：异宝秘境
	 * 7XXX：兵法秘境
     */
    public int getId() {
        return id;
    }
    /**
     * 开启等级
	 * [[A,B]]
	 * A=通关关卡
	 * B=对应系统升阶等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 排序
     */
    public int getPx() {
        return px;
    }
    public Struct_sjmj_258(int id,int lv,int px) {
        this.id = id;
        this.lv = lv;
        this.px = px;
    }
}