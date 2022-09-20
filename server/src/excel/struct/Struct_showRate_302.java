package excel.struct;
/**
 * G_302_概率公示表.xlsx
 */
public class Struct_showRate_302 {
    /**轮盘类型
	 * 1XXX:超值转盘
	 * 2XXX:神将阁(藏宝阁)
	 * 3XXX:寻宝(玲珑阁)7天前(含7天)
	 * 4XXX:寻宝(玲珑阁)7天后(不含7天)
	 * 5XXX：八阵图坚定符文
	 * 6XXX：充值转盘
	 * 7XXX：幸运扭蛋
	 * 8XXX：消费转盘
	 * 9XXX：三国宝藏
	 * 10XXX：消费砸蛋
	 * 11XXX：至尊秘宝
	 * 12XXX：超级弹珠
	 * 13XXX：刮刮乐*/
    private int type;
    /**展示类型
	 * 1:展示概率
	 * 2:展示必中次数*/
    private int showType;
    /**序号*/
    private int id;
    /**
     * 轮盘类型
	 * 1XXX:超值转盘
	 * 2XXX:神将阁(藏宝阁)
	 * 3XXX:寻宝(玲珑阁)7天前(含7天)
	 * 4XXX:寻宝(玲珑阁)7天后(不含7天)
	 * 5XXX：八阵图坚定符文
	 * 6XXX：充值转盘
	 * 7XXX：幸运扭蛋
	 * 8XXX：消费转盘
	 * 9XXX：三国宝藏
	 * 10XXX：消费砸蛋
	 * 11XXX：至尊秘宝
	 * 12XXX：超级弹珠
	 * 13XXX：刮刮乐
     */
    public int getType() {
        return type;
    }
    /**
     * 展示类型
	 * 1:展示概率
	 * 2:展示必中次数
     */
    public int getShowType() {
        return showType;
    }
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    public Struct_showRate_302(int type,int showType,int id) {
        this.type = type;
        this.showType = showType;
        this.id = id;
    }
}