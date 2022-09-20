package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_drug_200;
public class Config_drug_200 extends ConfigBase<Struct_drug_200> {
    private static Config_drug_200 ins = null;
    public static Config_drug_200 getIns(){
        if(ins==null){
            ins = new Config_drug_200();
        }
        return ins;
    }
    private Config_drug_200(){
        put(1,new Struct_drug_200(1,412001,3101,"武将属性丹","[[102,1600],[103,40],[104,80]]"));
        put(2,new Struct_drug_200(2,412002,3101,"武将资质丹","[[110,10],[111,10],[112,10]]"));
        put(3,new Struct_drug_200(3,412003,3102,"战甲属性丹","[[102,1600],[103,40],[104,80]]"));
        put(4,new Struct_drug_200(4,412004,3102,"战甲资质丹","[[110,10],[111,10],[113,10]]"));
        put(5,new Struct_drug_200(5,412005,2501,"宝物属性丹","[[102,1600],[103,40],[104,80]]"));
        put(6,new Struct_drug_200(6,412007,2801,"兵法属性丹","[[102,1600],[103,40],[104,80]]"));
        put(7,new Struct_drug_200(7,412009,2701,"神剑属性丹","[[102,1600],[103,40],[104,80]]"));
        put(8,new Struct_drug_200(8,412013,2601,"天书属性丹","[[102,1600],[103,40],[104,80]]"));
        put(9,new Struct_drug_200(9,412011,3301,"异宝属性丹","[[102,1600],[103,40],[104,80]]"));
        put(10,new Struct_drug_200(10,412015,6307,"玉露丸","[[102,3200],[103,80],[104,160]]"));
        put(11,new Struct_drug_200(11,412016,6307,"大还丹","[[102,32000],[103,800],[104,1600]]"));
    }
    public void reset(){
        ins = null;
    }
}