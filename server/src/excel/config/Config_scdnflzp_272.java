package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_scdnflzp_272;
public class Config_scdnflzp_272 extends ConfigBase<Struct_scdnflzp_272> {
    private static Config_scdnflzp_272 ins = null;
    public static Config_scdnflzp_272 getIns(){
        if(ins==null){
            ins = new Config_scdnflzp_272();
        }
        return ins;
    }
    private Config_scdnflzp_272(){
        put(1,new Struct_scdnflzp_272(1,50));
        put(2,new Struct_scdnflzp_272(2,80));
        put(3,new Struct_scdnflzp_272(3,100));
        put(4,new Struct_scdnflzp_272(4,150));
        put(5,new Struct_scdnflzp_272(5,200));
        put(6,new Struct_scdnflzp_272(6,250));
        put(7,new Struct_scdnflzp_272(7,300));
        put(8,new Struct_scdnflzp_272(8,400));
    }
    public void reset(){
        ins = null;
    }
}