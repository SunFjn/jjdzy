package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_chongzhi_716;
public class Config_chongzhi_716 extends ConfigBase<Struct_chongzhi_716> {
    private static Config_chongzhi_716 ins = null;
    public static Config_chongzhi_716 getIns(){
        if(ins==null){
            ins = new Config_chongzhi_716();
        }
        return ins;
    }
    private Config_chongzhi_716(){
        put(1,new Struct_chongzhi_716(1,10,5000,1,1));
        put(2,new Struct_chongzhi_716(2,30,15000,2,1));
        put(3,new Struct_chongzhi_716(3,98,49000,3,1));
        put(4,new Struct_chongzhi_716(4,198,99000,4,1));
        put(5,new Struct_chongzhi_716(5,328,164000,5,1));
        put(6,new Struct_chongzhi_716(6,648,324000,6,1));
        put(7,new Struct_chongzhi_716(7,1000,500000,7,1));
        put(8,new Struct_chongzhi_716(8,2000,1000000,8,1));
        put(109,new Struct_chongzhi_716(109,3000,1500000,109,0));
        put(110,new Struct_chongzhi_716(110,5000,2500000,110,0));
    }
    public void reset(){
        ins = null;
    }
}