package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_godequipsuit_208;
public class Config_godequipsuit_208 extends ConfigBase<Struct_godequipsuit_208> {
    private static Config_godequipsuit_208 ins = null;
    public static Config_godequipsuit_208 getIns(){
        if(ins==null){
            ins = new Config_godequipsuit_208();
        }
        return ins;
    }
    private Config_godequipsuit_208(){
        put(1,new Struct_godequipsuit_208(1,"[[102,20000],[103,1100],[104,500]]",13000));
        put(2,new Struct_godequipsuit_208(2,"[[102,40000],[103,2200],[104,1100]]",26500));
        put(3,new Struct_godequipsuit_208(3,"[[102,70000],[103,3500],[104,1800]]",44000));
        put(4,new Struct_godequipsuit_208(4,"[[102,110000],[103,5500],[104,2700]]",68500));
        put(5,new Struct_godequipsuit_208(5,"[[102,190000],[103,9300],[104,4600]]",117000));
        put(6,new Struct_godequipsuit_208(6,"[[102,320000],[103,16100],[104,8100]]",201000));
        put(7,new Struct_godequipsuit_208(7,"[[102,490000],[103,24300],[104,12200]]",305000));
        put(8,new Struct_godequipsuit_208(8,"[[102,760000],[103,38000],[104,19000]]",475000));
        put(9,new Struct_godequipsuit_208(9,"[[102,1030000],[103,51600],[104,25800]]",644500));
        put(10,new Struct_godequipsuit_208(10,"[[102,1470000],[103,73400],[104,36700]]",918000));
        put(11,new Struct_godequipsuit_208(11,"[[102,2020000],[103,100800],[104,50400]]",1261000));
        put(12,new Struct_godequipsuit_208(12,"[[102,2620000],[103,130800],[104,65400]]",1636000));
        put(13,new Struct_godequipsuit_208(13,"[[102,3270000],[103,163500],[104,81800]]",2044000));
        put(14,new Struct_godequipsuit_208(14,"[[102,3980000],[103,199000],[104,99500]]",2487500));
        put(15,new Struct_godequipsuit_208(15,"[[102,4800000],[103,240000],[104,120000]]",3000000));
        put(16,new Struct_godequipsuit_208(16,"[[102,5640000],[103,281900],[104,141000]]",3524500));
        put(17,new Struct_godequipsuit_208(17,"[[102,6500000],[103,325200],[104,162600]]",4064000));
        put(18,new Struct_godequipsuit_208(18,"[[102,7400000],[103,369800],[104,184900]]",4623500));
        put(19,new Struct_godequipsuit_208(19,"[[102,8320000],[103,415800],[104,207900]]",5198500));
        put(20,new Struct_godequipsuit_208(20,"[[102,9260000],[103,463100],[104,231500]]",5788000));
        put(21,new Struct_godequipsuit_208(21,"[[102,10240000],[103,511800],[104,255900]]",6398500));
        put(22,new Struct_godequipsuit_208(22,"[[102,11240000],[103,561800],[104,280900]]",7023500));
        put(23,new Struct_godequipsuit_208(23,"[[102,12260000],[103,613200],[104,306600]]",7664000));
        put(24,new Struct_godequipsuit_208(24,"[[102,13320000],[103,665900],[104,333000]]",8324500));
        put(25,new Struct_godequipsuit_208(25,"[[102,14400000],[103,720000],[104,360000]]",9000000));
    }
    public void reset(){
        ins = null;
    }
}