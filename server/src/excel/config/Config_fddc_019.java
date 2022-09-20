package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fddc_019;
public class Config_fddc_019 extends ConfigBase<Struct_fddc_019> {
    private static Config_fddc_019 ins = null;
    public static Config_fddc_019 getIns(){
        if(ins==null){
            ins = new Config_fddc_019();
        }
        return ins;
    }
    private Config_fddc_019(){
        put(1,new Struct_fddc_019(1,"[[4,0,250000]]",0,0,"[1,416090,128,11000,1;1,416073,128,12000,1;1,416074,1,12000,1;1,416088,128,7000,0;1,410450,128,6000,0;1,410206,5,2000,0;1,416090,50,12000,0;1,416073,50,14000,0;1,416088,50,14000,0;1,410450,50,10000,0]",10000,0,"[[22,0,50]]",500001,"[[1474,715],[1265,649],[997,621],[824,702],[799,952]]"));
        put(2,new Struct_fddc_019(2,"[[4,0,1500000]]",0,100000,"[1,416090,188,11500,1;1,416073,188,12000,1;1,416074,3,6000,1;1,416088,188,7000,0;1,410450,188,6000,0;1,416087,1,1000,0;1,416075,1,500,1;1,410206,5,1000,0;1,416090,50,10000,0;1,416073,50,12000,0;1,416074,1,12000,0;1,416088,50,12000,0;1,410450,50,9000,0]",20000,1000,"[[22,0,90]]",500003,"[[1860,812],[1560,838],[1253,873],[1024,1170],[1617,1083]]"));
        put(3,new Struct_fddc_019(3,"[[4,0,6000000]]",0,150000,"[1,416090,228,9500,1;1,416073,228,12000,1;1,416074,3,6000,1;1,416088,228,7000,0;1,410450,228,6000,0;1,416087,1,1000,0;1,416075,1,500,1;1,410207,5,1000,0;1,410206,5,2000,0;1,416090,88,10000,1;1,416073,88,12000,1;1,416074,1,12000,1;1,416088,88,12000,0;1,410450,88,9000,0]",30000,6000,"[[22,0,200]]",500005,"[[610,1841],[844,1900],[1212,1825],[1570,1688],[1658,2134]]"));
        put(4,new Struct_fddc_019(4,"0",0,200000,"[1,416090,288,9000,1;1,416073,288,14000,1;1,416074,3,6000,1;1,416088,288,7000,0;1,416076,1,500,1;1,416075,1,500,1;1,410450,288,6000,0;1,416087,1,1000,0;1,410206,5,2000,0;1,410207,5,1000,0;1,416090,128,8000,1;1,416073,88,12000,1;1,416074,1,12000,1;1,416088,88,12000,0;1,410450,88,9000,0]",40000,20000,"[[22,0,400]]",500007,"[[647,2420],[720,2670],[1340,2700],[852,3197],[1656,2910]]"));
    }
    public void reset(){
        ins = null;
    }
}