package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_mrbx_715;
public class Config_mrbx_715 extends ConfigBase<Struct_mrbx_715> {
    private static Config_mrbx_715 ins = null;
    public static Config_mrbx_715 getIns(){
        if(ins==null){
            ins = new Config_mrbx_715();
        }
        return ins;
    }
    private Config_mrbx_715(){
        put(1,new Struct_mrbx_715(1,2,"[[1,410031,5]]",44001));
        put(2,new Struct_mrbx_715(2,4,"[[1,410031,5]]",44002));
        put(3,new Struct_mrbx_715(3,6,"[[1,410031,10]]",44003));
    }
    public void reset(){
        ins = null;
    }
}