package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sbsz_750;
public class Config_sbsz_750 extends ConfigBase<Struct_sbsz_750> {
    private static Config_sbsz_750 ins = null;
    public static Config_sbsz_750 getIns(){
        if(ins==null){
            ins = new Config_sbsz_750();
        }
        return ins;
    }
    private Config_sbsz_750(){
        put(1,new Struct_sbsz_750(1,410087,7001,"百炼玄铁","[[102,4800],[103,80],[104,50],[109,30]]",0));
        put(2,new Struct_sbsz_750(2,410088,7001,"天外陨铁","[[102,48000],[103,800],[104,500],[109,300]]",0));
        put(3,new Struct_sbsz_750(3,410089,7001,"太初神铁","0",100));
    }
    public void reset(){
        ins = null;
    }
}