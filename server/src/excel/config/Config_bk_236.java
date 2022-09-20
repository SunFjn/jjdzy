package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_bk_236;
public class Config_bk_236 extends ConfigBase<Struct_bk_236> {
    private static Config_bk_236 ins = null;
    public static Config_bk_236 getIns(){
        if(ins==null){
            ins = new Config_bk_236();
        }
        return ins;
    }
    private Config_bk_236(){
        put(1,new Struct_bk_236(1,"隆中宝库",410016));
        put(2,new Struct_bk_236(2,"无双宝库",410017));
        put(3,new Struct_bk_236(3,"枭雄宝库",410018));
        put(4,new Struct_bk_236(4,"三国宝库",410019));
    }
    public void reset(){
        ins = null;
    }
}