package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_slbuff_767;
public class Config_slbuff_767 extends ConfigBase<Struct_slbuff_767> {
    private static Config_slbuff_767 ins = null;
    public static Config_slbuff_767 getIns(){
        if(ins==null){
            ins = new Config_slbuff_767();
        }
        return ins;
    }
    private Config_slbuff_767(){
        put(201,new Struct_slbuff_767(201,"[[202,2000,30000],[204,2000,30000],[117,2000,20000],[113,2000,20000]]",20,"[[202,3500,30000],[204,3500,30000],[117,3500,20000],[113,3500,20000]]",40,"[[202,5000,30000],[204,5000,30000],[117,5000,20000],[113,5000,20000]]",60));
        put(202,new Struct_slbuff_767(202,"[[203,1000,30000],[110,4000,20000],[114,8000,30000],[116,2000,20000]]",20,"[[203,2000,30000],[110,7000,20000],[114,14000,30000],[116,3500,20000]]",40,"[[203,3000,30000],[110,10000,20000],[114,20000,30000],[116,5000,20000]]",60));
        put(203,new Struct_slbuff_767(203,"[[202,2000,20000],[111,4000,30000],[112,2000,20000],[115,8000,30000]]",20,"[[202,3500,20000],[111,7000,30000],[112,3500,20000],[115,14000,30000]]",40,"[[202,5000,20000],[111,10000,30000],[112,5000,20000],[115,20000,30000]]",60));
    }
    public void reset(){
        ins = null;
    }
}