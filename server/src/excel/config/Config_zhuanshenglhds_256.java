package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zhuanshenglhds_256;
public class Config_zhuanshenglhds_256 extends ConfigBase<Struct_zhuanshenglhds_256> {
    private static Config_zhuanshenglhds_256 ins = null;
    public static Config_zhuanshenglhds_256 getIns(){
        if(ins==null){
            ins = new Config_zhuanshenglhds_256();
        }
        return ins;
    }
    private Config_zhuanshenglhds_256(){
        put(0,new Struct_zhuanshenglhds_256(0,0,"[[102,0],[103,0],[104,0]]",0));
        put(1,new Struct_zhuanshenglhds_256(1,10,"[[102,30000],[103,910],[104,300]]",13550));
        put(2,new Struct_zhuanshenglhds_256(2,20,"[[102,100000],[103,2700],[104,900]]",43000));
        put(3,new Struct_zhuanshenglhds_256(3,30,"[[102,300000],[103,8200],[104,2700]]",129500));
        put(4,new Struct_zhuanshenglhds_256(4,40,"[[102,600000],[103,17300],[104,5800]]",265500));
        put(5,new Struct_zhuanshenglhds_256(5,50,"[[102,1100000],[103,30900],[104,10300]]",481000));
        put(6,new Struct_zhuanshenglhds_256(6,60,"[[102,1700000],[103,49100],[104,16400]]",752500));
        put(7,new Struct_zhuanshenglhds_256(7,70,"[[102,2700000],[103,76400],[104,25500]]",1184500));
        put(8,new Struct_zhuanshenglhds_256(8,80,"[[102,4000000],[103,112700],[104,37600]]",1751500));
        put(9,new Struct_zhuanshenglhds_256(9,90,"[[102,5900000],[103,167300],[104,55800]]",2590500));
        put(10,new Struct_zhuanshenglhds_256(10,100,"[[102,8500000],[103,240000],[104,80000]]",3725000));
    }
    public void reset(){
        ins = null;
    }
}