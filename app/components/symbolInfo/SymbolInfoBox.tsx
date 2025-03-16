import InfoBox from "@/app/ui/InfoBox";
import { Grid, Typography } from "@mui/material";
import { Symbols } from "@prisma/client";

interface Props {
  currentSymbol: Symbols;
}

const SymbolInfoBox = ({ currentSymbol }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-[1px]">
        <InfoBox title="نام نماد" des={currentSymbol?.symbolName} />
        <InfoBox title="حجم" des={currentSymbol?.volume.toString()} />
        <InfoBox
          title="قیمت پایانی"
          des={currentSymbol?.lastPrice.toString()}
          optionDes={
            currentSymbol?.lastPricePercentage
              ? currentSymbol?.lastPricePercentage.toString() + "%"
              : ""
          }
        />
        <InfoBox
          title="آخرین معامله"
          des={currentSymbol?.lastDeal.toString()}
          optionDes={
            currentSymbol?.lastDealPercentage
              ? currentSymbol?.lastDealPercentage.toString() + "%"
              : ""
          }
        />
        <InfoBox title="اولین قیمت" des={currentSymbol?.theFirst.toString()} />
        <InfoBox title="کمترین قیمت" des={currentSymbol?.theLeast.toString()} />
        <InfoBox title="بیشترین قیمت" des={currentSymbol?.theMost.toString()} />
        <InfoBox
          title="حجم تقاظا"
          des={currentSymbol?.demandVolume.toString()}
        />
        <InfoBox
          title="قیمت تقاظا"
          des={currentSymbol?.demandPrice.toString()}
        />
        <InfoBox title="قیمت عرضه" des={currentSymbol?.offerPrice.toString()} />
        <InfoBox title="حجم عرضه" des={currentSymbol?.offerVolume.toString()} />
        <InfoBox
          title="وضعیت"
          des={currentSymbol?.state === "ALLOWED" ? "مجاز" : "ممنوع"}
        />
      </div>
    </div>
  );
};

export default SymbolInfoBox;
