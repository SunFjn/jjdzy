package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sbdzmb_750;
public class Config_sbdzmb_750 extends ConfigBase<Struct_sbdzmb_750> {
    private static Config_sbdzmb_750 ins = null;
    public static Config_sbdzmb_750 getIns(){
        if(ins==null){
            ins = new Config_sbdzmb_750();
        }
        return ins;
    }
    private Config_sbdzmb_750(){
        put(1001,new Struct_sbdzmb_750(1001,50,"[[1,410087,5]]",1,1));
        put(1002,new Struct_sbdzmb_750(1002,100,"[[1,400981,1]]",1,1));
        put(1003,new Struct_sbdzmb_750(1003,150,"[[1,410089,1]]",1,1));
        put(1004,new Struct_sbdzmb_750(1004,200,"[[1,400982,1]]",1,1));
    }
    public void reset(){
        ins = null;
    }
}