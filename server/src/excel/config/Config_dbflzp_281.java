package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_dbflzp_281;
public class Config_dbflzp_281 extends ConfigBase<Struct_dbflzp_281> {
    private static Config_dbflzp_281 ins = null;
    public static Config_dbflzp_281 getIns(){
        if(ins==null){
            ins = new Config_dbflzp_281();
        }
        return ins;
    }
    private Config_dbflzp_281(){
        put(1,new Struct_dbflzp_281(1,50));
        put(2,new Struct_dbflzp_281(2,80));
        put(3,new Struct_dbflzp_281(3,100));
        put(4,new Struct_dbflzp_281(4,150));
        put(5,new Struct_dbflzp_281(5,200));
        put(6,new Struct_dbflzp_281(6,250));
        put(7,new Struct_dbflzp_281(7,300));
        put(8,new Struct_dbflzp_281(8,400));
    }
    public void reset(){
        ins = null;
    }
}